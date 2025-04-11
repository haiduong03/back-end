
/**
 * Thông tin chi tiết giao dịch
 * @class ActivityData
 */
export class ActivityData {
    /**
     * Thời gian giao dịch theo chuẩn ISO 8601 (ISOString)
     * @type {string}
     */
    BusinessTime: string;

    /**
     * Danh sách sản phẩm trong giỏ hàng
     * @type {CartItems[]}
     */
    CartItems: CartItems[];

    /**
     * Mô tả hoạt động
     * @type {string}
     * @optional
     */
    Description?: string;

    /**
     * Mã đơn hàng (POS tự sinh)
     * @type {string}
     */
    OrderCode: string;

    /**
     * Mã cửa hàng thực hiện giao dịch
     * @type {string}
     */
    StoreCode: string;

    /**
     * Tổng giá trị đơn hàng trước khi giảm giá (khi kiểm tra/sử dụng coupon)
     * @type {number}
     */
    TotalCalcAmount: number;

    /**
     * Tổng giá trị đơn hàng trước mọi giảm giá
     * @type {number}
     * @optional
     */
    TotalCalcAmountBeforeDiscount?: number;
}

/**
 * Thông tin sản phẩm trong giỏ hàng
 * @class CartItems
 */
export class CartItems {
    /**
     * Mã danh mục sản phẩm
     * @type {string}
     */
    ProductCategory: string;

    /**
     * Mã sản phẩm
     * @type {string}
     */
    ProductCode: string;

    /**
     * Số lượng sản phẩm
     * @type {number}
     */
    Quantity: number;

    /**
     * Tổng giá trị sản phẩm (số lượng × đơn giá)
     * @type {number}
     */
    TotalAmount: number;

    /**
     * Giá bán một đơn vị sản phẩm
     * @type {number}
     */
    UnitPrice: number;
}

/**
 * ID thành viên (định dạng UUID)
 * @class MemberKeys
 */
export class MemberKeys {
    /**
     * ID thành viên
     * @type {string}
     * @required
     */
    PartnerLoyaltyId: string;
}


/**
 * Thông tin sản phẩm trong đơn hàng
 * @class CartItem
 */
export class CartItem {
    /**
     * MÃ SẢN PHẨM
     * @type {string}
     * @required
     */
    ProductCode: string;

    /**
     * MÃ DANH MỤC SẢN PHẨM
     * @type {string}
     * @required
     */
    ProductCategory: string;

    /**
     * SỐ LƯỢNG
     * @type {number}
     * @required
     * @integer
     */
    Quantity: number;

    /**
     * ĐƠN GIÁ
     * @type {number}
     * @required
     */
    UnitPrice: number;

    /**
     * THÀNH TIỀN
     * @type {number}
     * @required
     */
    TotalAmount: number;
}