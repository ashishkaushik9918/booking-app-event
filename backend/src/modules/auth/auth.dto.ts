export interface RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginDto {
    email: string;
    password: string;
    twoFactorCode?: string;
}

export interface RefreshDto {
    refreshToken: string;
}
