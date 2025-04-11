import { ActivityData, MemberKeys } from "./common.dto";

/**
 * DTO cho giao dịch áp dụng coupon và điểm Loyalty
 * @export
 * @class OrderTransactionDto
 */
export class OrderTransactionDto {
    /**
      * Thông tin định danh thành viên
      * @type {MemberKeys}
      */
    MemberKeys: MemberKeys;

    /**
     * SỬ DỤNG ĐIỂM LOYALTY
     * @type {number}
     * @optional
     */
    UsePoint?: number;

    /**
     * DANH SÁCH COUPON ÁP DỤNG
     * @type {CouponCode[]}
     */
    CouponCode: {
        /**
         * Mã coupon
         * @type {string}
         */
        Code: string;

        /**
         * Trạng thái coupon
         * @type {string}
         */
        Status: string;
    }[];

    /**
     * MÃ HOẠT ĐỘNG GIAO DỊCH
     * @type {string}
     * @required
     * @description Utop cung cấp cho từng đối tác
     */
    ActivityCode: string;

    /**
     * TRẠNG THÁI GIAO DỊCH
     * @type {string}
     * @default "Closed"
     * @required
     * @description 
     * - "Open": Tạm tính (Check/Sử dụng voucher)
     * - "Closed": Hoàn tất (Default)
     */
    State: string = "Closed";

    /**
     * CHI TIẾT GIAO DỊCH
     * @type {ActivityData}
     * @required
     */
    ActivityData: ActivityData;
}