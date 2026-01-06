import { AuthLoginPayload, AuthRegisterPayload, AuthLoginResponse } from "@/types/auth"
import { RequestAPI } from "@/lib/alova"
export const authLogin = async (payloadData: AuthLoginPayload) => {

    const data = await RequestAPI.Post<AuthLoginResponse>("/auth/login", payloadData, {
        credentials: "include"
    });
    return data;
}

export const authRegister = async (payload: AuthRegisterPayload) => {

}

export const authChangePassword = async (payload: AuthLoginPayload) => {

}

export const authResetPassword = async (payload: AuthLoginPayload) => { }
export const authForgotPassword = async (payload: AuthLoginPayload) => { }

export const authSetNewPassword = async (payload: AuthLoginPayload) => {
    return await RequestAPI.Post<AuthLoginResponse>("/auth/me", {
        credentials: "include"
    });
}

export const authCurrentUser = async () => {
    return await RequestAPI.Post<AuthLoginResponse>("/auth/me", {}, {
        credentials: "include"
    });
}

export const authLogoutUser = async () => {
    return await RequestAPI.Post<AuthLoginResponse>("/auth/logout", {}, {
        credentials: "include"
    });
}