/**
 * Lấy thông tin thành viên loyalty
 * @export
 * @class GetInfoLoyaltyDto
 */
export class GetInfoLoyaltyDto {
    /**
     * Cặp key-value định danh thành viên
     * @type {object}
     * @property {string} key - Loại định danh (MemberId, PartnerLoyaltyId hoặc Phone)
     * @property {string} value - Giá trị định danh
     */
    memberKey: {
        key: string;
        value: string;
    }
}

/**
 * DTO phản hồi thông tin chi tiết thành viên Loyalty
 * @export
 * @class GetDetailLoyaltyResponse
 */
export class GetDetailLoyaltyResponse {
    /**
     * ID duy nhất của thành viên (được tạo bởi LOS - GUID)
     * @type {string}
     * @maxLength 255
     */
    memberId: string;

    /**
     * Số điện thoại thành viên
     * @type {string}
     * @maxLength 20
     */
    phone: string;

    /**
     * Tên đầy đủ của thành viên
     * @type {string}
     * @maxLength 255
     */
    fullName: string;

    /**
     * Trạng thái thành viên
     * @type {'Active' | 'InActive'}
     * @maxLength 20
     */
    status: 'Active' | 'InActive';

    /**
     * Hạng thành viên hiện tại
     * @type {string}
     * @maxLength 20
     */
    currentTier: string;

    /**
     * Tổng điểm còn hiệu lực
     * @type {number}
     */
    totalCoin: number;

    /**
     * Danh sách thuộc tính động
     * Chỉ cần lấy dữ liệu từ attributes với tên là PartnerLoyaltyId
     * @type {DynamicAttribute[]}
     */
    dynamicAttributes: DynamicAttribute[];
}

/**
 * Lớp mô tả thuộc tính động
 * @class DynamicAttribute
 */
class DynamicAttribute {
    /**
     * ID của thuộc tính
     * @type {string}
     */
    attributeId: string;

    /**
     * Tên thuộc tính (dạng JSON)
     * @type {string}
     */
    attributeKeyJson: string;

    /**
     * Giá trị thuộc tính
     * @type {string}
     */
    attributeValue: string;
}