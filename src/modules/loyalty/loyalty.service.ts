import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from "@nestjs/schedule";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import axios, { AxiosError, AxiosInstance } from "axios";
import { Cache } from "cache-manager";
import dayjs from "dayjs";
import { writeLog } from "src/common/utils/function.utils";
import { LoyaltyCouponDto, LoyaltyCouponResponse } from "./dto/coupon.dto";
import { GetDetailLoyaltyResponse } from './dto/getInfo.dto';
import { ReturnBalanceDto, ReturnBalanceResponse } from "./dto/return.dto";
import { OAuthTokenLoyaltyRequest, OAuthTokenLoyaltyResponse, } from "./dto/token.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()

export class LoyaltyService {
    private _axiosInstance: AxiosInstance;

    constructor(
        private readonly HdrRepository: HdrRepository,
        private readonly logger: Logger,
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) 
        private readonly cache: Cache
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

    // @Cron(CronExpression.EVERY_HOUR)
    @Cron('*/10 * * * * *')
    async handleRetryLoyalty() {
        this.logger.verbose('Start retry payment failed loyalty...');

        try {
            // const startDate = dayjs().subtract(1, 'hour').toDate();
            // const endDate = dayjs().toDate();

            const startDate = dayjs().set('dates', 9).set('hour', 8).set('minute', 0).set('second', 0).toDate();
            const endDate = dayjs().set('dates', 9).set('hour', 9).set('minute', 0).set('second', 0).toDate();

            const listPaymentFailed = await this.HdrRepository.getAllPaymentFailedByTime({ startDate, endDate });
            if (!listPaymentFailed.length) return;

            let access_token = await this.cache.get('access_token');

            if (!access_token) {
                const token = await this.RequestAccessToken({
                    grant_type: "client_credentials",
                    client_id: this.configService.get<string>('CLIENT_ID')!,
                    client_secret: this.configService.get<string>('CLIENT_SECRET')!,
                    scope: "CustomerJourneyService MasterDataService MemberService TransactionService"
                })
                if (!access_token) return;
                await this.cache.set('access_token', access_token);
                access_token = token.access_token
            }
            
            // const retryFunc = async (list: typeof listPaymentFailed) =>
            //     await Promise.all(list.map(hdr => this.Coupon(
            //         JSON.parse(hdr.payment.Request_Data),
            //         access_token
            //     )));

            // if (listPaymentFailed.length > 500) {
            //     while (listPaymentFailed.length) {
            //         const chunk = listPaymentFailed.splice(0, 500);
            //         await retryFunc(chunk)
            //     }
            // } else {
            //     await retryFunc(listPaymentFailed)
            // }
        } catch (error) {
            const dataLog = error instanceof AxiosError ? error.response?.data : error
            writeLog(dataLog, 'handleRetryLoyalty');
        }

        this.logger.verbose('End retry payment failed loyalty !!!');
    }

    async RequestAccessToken(data: OAuthTokenLoyaltyRequest): Promise<OAuthTokenLoyaltyResponse> {
        return await this._axiosInstance.post(
            "/connect/token",

            data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(({ data }) => data)
    }

    async GetDetailLoyalty(access_token: string): Promise<GetDetailLoyaltyResponse> {
        return await this._axiosInstance.get(
            "/api/transaction-service/reward-360/GetMemberProfile", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }
        ).then(({ data }) => data)
    }

    async Coupon(data: LoyaltyCouponDto, access_token: string): Promise<LoyaltyCouponResponse> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputDataAsync",
            data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }

    async ReturnRequest(data: ReturnBalanceDto, access_token: string): Promise<ReturnBalanceResponse> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputReturnDataAsync",
            data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }
}
