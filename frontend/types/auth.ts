export interface AuthLoginPayload {
    email: string;
    password: string;
    remember?: boolean;
}

export interface AuthRegisterPayload extends AuthLoginPayload {
    phone: string;
    username: string;
    first_name: string;
    last_name: string;
    confirmPassword: string
}

export interface AuthLoginResponse {
    success: boolean;
    user: Record<string, string>;
    accessToken: string;
    refreshToken: string;
    message: string;
}