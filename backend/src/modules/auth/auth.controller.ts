import { AuthService } from "./auth.services";
import { FastifyRequest, FastifyReply } from "fastify";
import { LoginDto } from "./auth.dto";
import { UserModel } from "../../models/user.model";
export const authLogin = async (request: FastifyRequest, response: FastifyReply) => {
    try {

        const { email, password, twoFactorCode }: any = request.body;
        const ip =
            request.headers["x-forwarded-for"]?.toString() ||
            request.socket.remoteAddress;

        const device = request.headers["user-agent"];

        const result = await AuthService.login(
            { email, password, twoFactorCode },
            { ip, device }
        );

        response.setCookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
        response.setCookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 5,
        });

        return response.status(200).send({
            success: true,
            user: {
                id: result.user._id,
                email: result.user.email,
                role: result.user.role,
            },
            message: 'Logged In successfully'
        });

    } catch (error: any) {
        return response.status(error.statusCode).send({ success: false, message: error.message, code: error.code })
    }
}
export const authRegister = async (request: FastifyRequest, response: FastifyReply) => {
    await AuthService.updateAllPassword();
    return response.status(200).send({ success: true })
}
export const authChangePassword = async (request: FastifyRequest, response: FastifyReply) => { }
export const authResetPassword = async (request: FastifyRequest, response: FastifyReply) => { }
export const authForgotPassword = async (request: FastifyRequest, response: FastifyReply) => { }
export const authNewPassword = async (request: FastifyRequest, response: FastifyReply) => { }
export const authRefresh = async (request: FastifyRequest, response: FastifyReply) => {
    try {

        const refreshToken = request.cookies.refreshToken;
        if (!refreshToken)
            return response.status(401).send({ success: false, message: 'Session logout' });

        const result = await AuthService.refresh(refreshToken);

        response.setCookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 5,
        });

        return response.send({
            success: true,
            user: {
                id: result.user._id,
                email: result.user.email,
                role: result.user.role,
            },
        });

    } catch (error: any) {
        return response.status(error.statusCode).send({ success: false, message: error.message, code: error.code })
    }
}
export const authMe = async (request: FastifyRequest, response: FastifyReply) => {
    const { sub: userId } = request.user as { sub: string };

    const user = await UserModel.findById(userId).select(
        "_id email role provider firstName lastName avatar"
    );

    if (!user) {
        throw Object.assign(new Error("User not found"), { statusCode: 404 });
    }
    return response.send({
        success: true,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            provider: user.provider,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
        },
    });
}

export const authLogoutUser = async (request: FastifyRequest, response: FastifyReply) => {
    try {


        const refreshToken = request.cookies.refreshToken;
        if (!refreshToken)
            return response.status(404).send({ success: false, message: 'Session not found' });

        if (refreshToken) {
            await UserModel.updateMany({}, { $pull: { refreshTokens: { refreshToken } } });
        }

        response.clearCookie("refreshToken", {
            path: "/",
        });

        response.clearCookie("accessToken", {
            path: "/",
        });

        return response.send({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error: any) {
        return response.status(error.statusCode).send({ success: false, message: error.message, code: error.code })
    }
}

