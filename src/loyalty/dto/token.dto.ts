/**
 * Lớp DTO yêu cầu cấp phát token OAuth2 (Client Credentials Flow)
 * @export
 * @class OAuthTokenRequest
 */
export class OAuthTokenLoyaltyRequest {
    /**
     * Loại grant type (luôn là client_credentials)
     * @type {'client_credentials'}
     * @maxLength 255
     * @required
     */
    grant_type: string;

    /**
     * Client ID của ứng dụng
     * @type {string}
     * @maxLength 255
     * @required
     */
    client_id: string;

    /**
     * Client Secret của ứng dụng
     * @type {string}
     * @maxLength 1000
     * @required
     */
    client_secret: string;

    /**
     * Các scope yêu cầu
     * @type {string}
     * @maxLength 255
     * @required
     * @example "CustomerJourneyService MasterDataService MemberService TransactionService"
     */
    scope: string;
}

/**
 * Lớp DTO phản hồi thông tin token OAuth2
 * @export
 * @class OAuthTokenResponse
 */
export class OAuthTokenLoyaltyResponse {
    /**
     * Token truy cập dùng để xác thực các API bảo mật
     * @type {string}
     * @maxLength 3000
     */
    access_token: string;

    /**
     * Loại token (Luôn là Bearer)
     * @type {'Bearer'}
     * @maxLength 255
     */
    token_type: string;

    /**
     * Thời gian hết hạn của token (tính bằng giây)
     * @type {number}
     * @default 3600
     */
    expires_in: number = 3600;

    /**
     * Token dùng để làm mới access token mà không cần xác thực lại
     * @type {string}
     * @maxLength 3000
     */
    refresh_token: string;
}