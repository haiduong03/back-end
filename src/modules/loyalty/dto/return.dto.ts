import { ActivityData } from "./common.dto";

/**
 * DTO cho thông tin hoàn trả hàng
 * @export
 * @class ReturnOrderDto
 */
export class ReturnBalanceDto {
    /**
     * Thông tin thành viên thực hiện hoàn trả
     * @type {object}
     * @required
     * @property {string} PartnerLoyaltyId - Số điện thoại thành viên
     */
    memberKeys: {
        PartnerLoyaltyId: string;
    };

    /**
     * Mã hoạt động giao dịch
     * @type {string}
     * @maxLength 255
     * @required
     * @description Loyalty cung cấp mã riêng cho từng đối tác
     */
    ActivityCode: string;

    /**
     * Trạng thái hoàn trả
     * @type {string}
     * @required
     * @description 
     * - FullReturn: Hoàn toàn bộ đơn hàng
     * - PartialReturn: Hoàn trả một phần đơn hàng
     */
    State: string;

    /**
     * Thông tin chi tiết giao dịch hoàn trả
     * @type {ActivityData}
     * @required
     */
    ActivityData: ActivityData;
}

/**
 * Lớp DTO phản hồi thông tin thu hồi điểm khi trả hàng
 * @export
 * @class ReturnBalanceResponse
 */
export class ReturnBalanceResponse {
    /**
     * Mã khách hàng tại hệ thống Loyalty
     * @type {string}
     */
    memberId: string;

    /**
     * Mã giao dịch trả hàng phát sinh tại Loyalty
     * @type {string}
     * @maxLength 255
     */
    activityEntityValueId: string;

    /**
     * Danh sách điểm đã thu hồi
     * @type {RetrieveBalance[]}
     * @description Lưu ý: Giá trị âm nếu khách không đủ điểm để thu hồi
     */
    retrieveBalance: RetrieveBalance[];
}

/**
 * Thông tin điểm bị thu hồi
 * @class RetrieveBalance
 */
class RetrieveBalance {
    /**
     * Mã loại điểm
     * @type {string}
     * @maxLength 255
     */
    currencyId: string;

    /**
     * Tên loại điểm bị thu hồi
     * @type {string}
     * @maxLength 255
     * @example "Điểm tích lũy", "Điểm đổi quà"
     */
    currencyName: string;

    /**
     * Số điểm bị thu hồi
     * @type {number}
     * @description Giá trị âm nếu khách không đủ điểm
     */
    value: number;
}