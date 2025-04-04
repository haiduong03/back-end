import { ActivityData, MemberKeys } from "./common.dto";

/**
 * Thông tin coupon
 * @class CouponCode
 */
export class CouponCode {
    /**
     * Mã coupon
     * @type {string}
     * @default "Check"
     */
    Code: string = "Check";

    /**
     * Trạng thái/hành động với coupon
     * @type {string}
     * @description "Check": Kiểm tra coupon có sử dụng được không, "Use": Sử dụng coupon
     */
    Status: string;

    /**
     * Loại mã giảm giá
     * @type {'DiscountByItem' | 'DiscountByTotal' | 'RewardProduct'}
     */
    type: 'DiscountByItem' | 'DiscountByTotal' | 'RewardProduct' | string;

    /**
     * Có thể áp dụng hay không
     * @type {boolean}
     */
    canUse: boolean;

    /**
     * Mô tả mã giảm giá
     * @type {string}
     */
    description: string;

    /**
     * Trạng thái mã giảm giá
     * @type {string}
     */
    status: string;

    /**
     * Lý do từ chối (nếu canUse = false)
     * @type {string}
     * @optional
     */
    Reason?: string;
}

/**
 * Kiểm tra và sử dụng coupon
 * @export
 * @class CheckCouponDto
 */
export class LoyaltyCouponDto {
    /**
     * Mã hoạt động đại diện cho giao dịch (Utop cung cấp cho từng đối tác)
     * @type {string}
     */
    ActivityCode: string;

    /**
     * Thông tin chi tiết giao dịch
     * @type {ActivityData}
     */
    ActivityData: ActivityData;

    /**
     * Danh sách mã coupon cần kiểm tra/sử dụng
     * @type {CouponCode[]}
     */
    CouponCode: CouponCode[];

    /**
     * Thông tin định danh thành viên
     * @type {MemberKeys}
     */
    MemberKeys: MemberKeys;

    /**
     * Trạng thái API
     * @type {string}
     * @default "Open"
     * @description Open: Tạm tính (Check/Sử dụng voucher), Closed: Hoàn tất
     */
    State: string = "Open";

    /**
     * Điểm Loyalty sử dụng cho đơn hàng này
     * @type {number}
     * @optional
     */
    UsePoint?: number;
}

/**
 * Lớp DTO phản hồi thông tin áp dụng khuyến mãi Loyalty
 * @export
 * @class LoyaltyTransactionResponse
 */
export class LoyaltyCouponResponse {
    /**
     * ID thành viên (định dạng UUID)
     * @type {string}
     */
    MemberId: string;

    /**
     * ID đơn hàng sinh ra tại hệ thống LOS (UUID)
     * @type {string}
     */
    ActivityEntityValueId: string;

    /**
     * Trạng thái giao dịch
     * @type {'Open' | 'Closed'}
     * @description 
     * - Open: Tạm tính
     * - Closed: Hoàn tất
     */
    State: 'Open' | 'Closed';

    /**
     * Danh sách mã giảm giá áp dụng
     * @type {CouponCode[]}
     */
    CouponCode: CouponCode[];

    /**
     * Số điểm đã sử dụng
     * @type {number}
     */
    usedPoint: number;

    /**
     * Tổng giá trị khuyến mãi
     * @type {number}
     */
    totalDiscount: number;

    /**
     * Danh sách rule khuyến mãi được áp dụng
     * @type {PromotionEffect[]}
     */
    Effects: PromotionEffect[];

    /**
     * Danh sách điểm thưởng nhận được
     * @type {RewardBalance[]}
     */
    rewardBalance: RewardBalance[];
}

/**
 * Thông tin rule khuyến mãi
 * @class PromotionEffect
 */
class PromotionEffect {
    /**
     * ID Offer khuyến mãi
     * @type {string}
     */
    OfferID: string;

    /**
     * Tên Offer khuyến mãi
     * @type {string}
     */
    OfferName: string;

    /**
     * ID Rule khuyến mãi
     * @type {string}
     */
    RuleID: string;

    /**
     * Tên Rule khuyến mãi
     * @type {string}
     */
    RuleName: string;

    /**
     * Loại rule khuyến mãi
     * @type {string}
     */
    EffectType: string;

    /**
     * Chi tiết rule khuyến mãi
     * @type {PromotionEffectProperty}
     */
    PromotionEffectProperty: PromotionEffectProperty;
}

/**
 * Chi tiết hiệu ứng khuyến mãi
 * @class PromotionEffectProperty
 */
class PromotionEffectProperty {
    /**
     * ID sản phẩm tặng (nếu có)
     * @type {string}
     * @optional
     */
    EntityId?: string;

    /**
     * Mã sản phẩm tặng (nếu có)
     * @type {string}
     * @optional
     */
    EntityCode?: string;

    /**
     * Giá trị khuyến mãi
     * @type {number}
     * @description 
     * - Số tiền giảm (DiscountByTotal)
     * - Số lượng sản phẩm tặng (RewardProduct)
     */
    Value: number;

    /**
     * Chi tiết các dòng hiệu ứng
     * @type {PromotionEffectLine[]}
     */
    PromotionEffectLine: PromotionEffectLine[];
}

/**
 * Chi tiết dòng hiệu ứng
 * @class PromotionEffectLine
 */
class PromotionEffectLine {
    /**
     * ID sản phẩm
     * @type {string}
     */
    EntityId: string;

    /**
     * Mã sản phẩm
     * @type {string}
     */
    EntityCode: string;

    /**
     * Giá trị giảm theo dòng
     * @type {number}
     */
    Value: number;

    /**
     * Mã line hàng
     * @type {number}
     */
    Position: number;

    /**
     * Mã thứ tự phân rã
     * @type {number}
     */
    SubPosition: number;
}

/**
 * Thông tin điểm thưởng
 * @class RewardBalance
 */
class RewardBalance {
    /**
     * Mã loại điểm
     * @type {string}
     * @maxLength 255
     */
    currencyId: string;

    /**
     * Tên loại điểm thưởng
     * @type {string}
     * @maxLength 255
     * @example "Điểm đổi quà (coin), Điểm xếp hạng (point)"
     */
    currencyName: string;

    /**
     * Số điểm thưởng
     * @type {number}
     */
    value: number;
}
