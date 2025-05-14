import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Cron, CronExpression } from "@nestjs/schedule";
import { HdrRepository } from "@repository/dsmart90/hdr.repo";
import axios, { AxiosError, AxiosInstance } from "axios";
import dayjs from "dayjs";
import { handleErrAPILoyalty, writeLog } from "src/common/utils/function.utils";
import { RedisCacheService } from "../redis-cache/redis-cache.service";
import { EVENT_EMIT } from "../telegram/enum/event-emit.enum";
import { LoyaltyCouponDto, LoyaltyCouponResponse } from "./dto/coupon.dto";
import { GetDetailLoyaltyResponse } from './dto/getInfo.dto';
import { ReturnBalanceDto, ReturnBalanceResponse } from "./dto/return.dto";
import { OAuthTokenLoyaltyRequest, OAuthTokenLoyaltyResponse, } from "./dto/token.dto";
import { TGetAllPaymentFailedByTime } from "./types/dsmart90Query.interface";

@Injectable()
export class LoyaltyService {
    private _axiosInstance: AxiosInstance;

    constructor(
        private readonly HdrRepository: HdrRepository,
        private readonly logger: Logger,
        private readonly configService: ConfigService,
        private readonly cache: RedisCacheService,
        private readonly evenEmit: EventEmitter2,
    ) {
        this._axiosInstance = axios.create({
            baseURL: this.configService.get('TLS')!,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            headers: {
                '__tenant': this.configService.get('TENANT')!,
                '__merchant': this.configService.get('MERCHANT')!,
            }
        })

        this._axiosInstance
            .interceptors
            .response
            .use(
                (response) => response,
                this.retryUnauthorized.bind(this)
        );
    }

    @Cron(CronExpression.EVERY_HOUR, {
        disabled: process.env.NODE_ENV !== 'production',
    })
    async handleRetryLoyalty() {
        this.logger.verbose('Start retry payment loyalty...');

        const endDate = dayjs().add(7, 'hour').toISOString();
        const startDate = dayjs(endDate).subtract(1, 'hour').toISOString();

        this.logger.fatal({ endDate, startDate });

        try {
            const [listPaymentFailed, access_token] = await Promise.all([
                await this.HdrRepository.getAllPaymentFailedByTime({ startDate, endDate }),
                await this.getAccessToken(),
            ])

            if (!listPaymentFailed.length || !access_token) {
                if (!listPaymentFailed.length) this.logger.verbose('No data payment failed');
                if (!access_token) this.logger.verbose('No access token');
                return;
            };
            writeLog(listPaymentFailed, `getAllPaymentFailedByTime`);

            if (this.configService.get('NODE_ENV') === "production") {
                let success = 0, err = 0;
                const filter = listPaymentFailed.filter(hdr => hdr?.payment?.Request_Data);
                const countAll = listPaymentFailed.length;
                const countMissRequest = countAll - filter.length;

                while (filter.length) {
                    const chunk = filter.splice(0, 500);
                    const retry = await this.retryFunc(chunk, access_token);

                    success += retry.success;
                    err += retry.err;
                }

                const payload = `♻️Retry Payment Loyalty♻️\nSuccess: ${success}\nFailed: ${err}\nTotal: ${countAll}\nNot have request data: ${countMissRequest}`;
                this.evenEmit.emit(EVENT_EMIT.MESSAGE_LOYALTY_RETRY, payload);
            }
        } catch (error) {
            handleErrAPILoyalty(error);
        }

        this.logger.verbose('End retry payment loyalty !!!');
    }

    async retryFunc(list: TGetAllPaymentFailedByTime[], access_token: string, success = 0, err = 0) {
        const callingAPI = await Promise.allSettled(
            list.map(
                hdr => hdr?.payment?.Request_Data &&
                    this.CouponAPI(
                        JSON.parse(hdr.payment.Request_Data),
                        access_token
                    )
            ));


        for (const item of callingAPI) {
            item.status === "fulfilled" ?
                (success += 1) :
                (err += 1, handleErrAPILoyalty(item.reason))
        }

        return { success, err }
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
            client_id: this.configService.get('CLIENT_ID')!,
            client_secret: this.configService.get('CLIENT_SECRET')!,
            scope: "CustomerJourneyService MasterDataService MemberService TransactionService"
        })
        if (!getToken.access_token) return null;

        access_token = getToken.access_token;
        this.evenEmit.emit(
            EVENT_EMIT.SET_CACHE,
            'access_token',
            access_token,
            +this.configService.get('REDIS_TTL_TOKEN_LOYALTY')!
        );

        return access_token;
    }

    async retryUnauthorized(error: AxiosError) {
        try {
            if (error.response?.status === 401) {
                const access_token = await this.getAccessToken();

                if (!access_token) throw error;

                return this._axiosInstance.request(error.request)
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
