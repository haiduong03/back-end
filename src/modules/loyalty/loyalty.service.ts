import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from "@nestjs/schedule";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import axios, { AxiosError, AxiosInstance } from "axios";
import dayjs from "dayjs";
import { writeLog } from "src/common/utils/function.utils";
import { RedisCacheService } from "../redis-cache/redis-cache.service";
import { LoyaltyCouponDto, LoyaltyCouponResponse } from "./dto/coupon.dto";
import { GetDetailLoyaltyResponse } from './dto/getInfo.dto';
import { ReturnBalanceDto, ReturnBalanceResponse } from "./dto/return.dto";
import { OAuthTokenLoyaltyRequest, OAuthTokenLoyaltyResponse, } from "./dto/token.dto";

@Injectable()
export class LoyaltyService {
    private _axiosInstance: AxiosInstance;

    constructor(
        private readonly HdrRepository: HdrRepository,
        private readonly logger: Logger,
        private readonly configService: ConfigService,
        private readonly cache: RedisCacheService
    ) {
        this._axiosInstance = axios.create({
            baseURL: this.configService.get<string>('TLS_v2_UAT')!,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            headers: {
                '__tenant': this.configService.get<string>('TENANT')!,
                '__merchant': this.configService.get<string>('MERCHANT')!,
            }
        })
    }

    @Cron(CronExpression.EVERY_HOUR)
    // @Cron('*/20 * * * * *')
    async handleRetryLoyalty() {
        this.logger.verbose('Start retry payment loyalty...');

        try {
            const startDate = dayjs().subtract(1, 'hour').toDate();
            const endDate = dayjs().toDate();

            // const startDate = dayjs().set('dates', 9).set('hour', 8).set('minute', 0).set('second', 0).toDate();
            // const endDate = dayjs().set('dates', 9).set('hour', 9).set('minute', 0).set('second', 0).toDate();

            const [listPaymentFailed, access_token] = await Promise.all([
                await this.HdrRepository.getAllPaymentFailedByTime({ startDate, endDate }),
                await this.getAccessToken(),
            ])
            if (!listPaymentFailed.length || !access_token) return;

            const retryFunc = async (list: typeof listPaymentFailed) =>
                await Promise.all(list.map(hdr => this.CouponAPI(
                    JSON.parse(hdr.payment.Request_Data),
                    access_token
                )));

            if (listPaymentFailed.length > 500) {
                while (listPaymentFailed.length) {
                    const chunk = listPaymentFailed.splice(0, 500);
                    await retryFunc(chunk)
                }
            } else {
                await retryFunc(listPaymentFailed)
            }
        } catch (error) {
            let data: any = error;

            if (error instanceof AxiosError) {
                const dataLog = error.response?.data;
                const request = JSON.parse((error.toJSON() as any)?.['config']?.['data'])

                data = { dataLog, request };
            }
            
            writeLog(data, 'handleRetryLoyalty');

        }

        this.logger.verbose('End retry payment loyalty !!!');
    }

    async RequestAccessTokenAPI(data: OAuthTokenLoyaltyRequest): Promise<OAuthTokenLoyaltyResponse> {
        return await this._axiosInstance.post(
            "/connect/token",
            data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(({ data }) => data)
    }

    async GetDetailLoyaltyAPI(access_token: string): Promise<GetDetailLoyaltyResponse> {
        return await this._axiosInstance.get(
            "/api/transaction-service/reward-360/GetMemberProfile", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }
        ).then(({ data }) => data)
    }

    async CouponAPI(data: LoyaltyCouponDto, access_token: string): Promise<LoyaltyCouponResponse> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputDataAsync",
            data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }

    async ReturnRequestAPI(data: ReturnBalanceDto, access_token: string): Promise<ReturnBalanceResponse> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputReturnDataAsync",
            data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }

    async getAccessToken(): Promise<string | null> {
        let access_token: string | null;

        access_token = await this.cache.get('access_token');
        if (access_token) return access_token;

        const getToken = await this.RequestAccessTokenAPI({
            grant_type: "client_credentials",
            client_id: this.configService.get<string>('CLIENT_ID')!,
            client_secret: this.configService.get<string>('CLIENT_SECRET')!,
            scope: "CustomerJourneyService MasterDataService MemberService TransactionService"
        })
        if (!getToken.access_token) return null;

        access_token = getToken.access_token;
        await this.cache.set(
            'access_token',
            access_token,
            +this.configService.get('REDIS_TTL_TOKEN_LOYALTY')!
        );

        return access_token;
    }
}
