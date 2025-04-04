import { Injectable } from '@nestjs/common';
import axios from "axios";
import { LoyaltyCouponDto, LoyaltyCouponResponse } from "./dto/coupon.dto";
import { GetDetailLoyaltyResponse } from './dto/getInfo.dto';
import { OAuthTokenLoyaltyRequest, OAuthTokenLoyaltyResponse, } from "./dto/token.dto";
import { ReturnBalanceDto, ReturnBalanceResponse } from "./dto/return.dto";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class LoyaltyService {
    private headerLoyalty = {
        '__tenant': '74de91d3-f389-2c57-79f7-3a16bba8a4d7',
        '__merchant': '74de91d3-f389-2c57-79f7-3a16bba81234'
    };
    private _axiosInstance = axios.create({
        baseURL: "",
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    })

    // @Cron('* * * * * *')
    async handleRetryLoyalty() {
        console.log(213);
    }

    async RequestAccessToken(data: OAuthTokenLoyaltyRequest): Promise<OAuthTokenLoyaltyResponse | undefined> {
        return await this._axiosInstance.post(
            "/connect/token",
            data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(({ data }) => data)
    }

    async GetDetailLoyalty(access_token: string): Promise<GetDetailLoyaltyResponse | undefined> {
        return await this._axiosInstance.get(
            "/api/transaction-service/reward-360/GetMemberProfile", {
            headers: {
                ...this.headerLoyalty,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }
        ).then(({ data }) => data)
    }
   
    async Coupon(data: LoyaltyCouponDto, access_token: string): Promise<LoyaltyCouponResponse | undefined> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputDataAsync",
            data, {
            headers: {
                ...this.headerLoyalty,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }

    async ReturnRequest(data: ReturnBalanceDto, access_token: string): Promise<ReturnBalanceResponse | undefined> {
        return await this._axiosInstance.post(
            "/api/customer-journey-service/activitydata/InputReturnDataAsync",
            data, {
            headers: {
                ...this.headerLoyalty,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data }) => data)
    }
}
