import { HttpError } from "./http-error";

export class InvalidCredentialsError extends HttpError {
    constructor() {
        super(
            "Login credentials invalid",
            401,
            "INVALID_CREDENTIALS"
        );
    }
}

export class AccountLockedError extends HttpError {
    constructor() {
        super(
            "Account is locked",
            423,
            "ACCOUNT_LOCKED"
        );
    }
}

export class TwoFactorRequiredError extends HttpError {
    constructor() {
        super(
            "Two-factor authentication required",
            403,
            "TWO_FACTOR_REQUIRED"
        );
    }
}

export class AccountDisabledError extends HttpError {
    constructor() {
        super(
            "Account disabled",
            403,
            "ACCOUNT_DISABLED"
        );
    }
}

export class InvalidTwoFactorCodeError extends HttpError {
    constructor() {
        super(
            "Invalid 2FA code",
            401,
            "INVALID_2FA_CODE"
        );
    }
}

export class InvalidRefreshTokenError extends HttpError {
    constructor() {
        super(
            "Invalid refresh token",
            401,
            "INVALID_REFRESH_TOKEN"
        );
    }
}

export class RefreshTokenRevokedError extends HttpError {
    constructor() {
        super(
            "Refresh token revoked",
            401,
            "REFRESH_TOKEN_REVOKED"
        );
    }
}

export class InvalidTokenExpiration extends HttpError {
    constructor() {
        super(
            "Invalid access token",
            401,
            "",
            "INVALID_ACCESS_TOKEN"
        );
    }
}
