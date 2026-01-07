import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { InvalidTokenExpiration } from "../exceptions/auth.errors";
import { verifyRefreshToken, generateAccessToken } from "../modules/auth/auth.tokens";
import { UserModel } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {

    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    if (accessToken) {
        try {
            const payload = jwt.verify(accessToken, JWT_SECRET) as { sub: string };
            request.user = payload as any;
            return;
        } catch {
            throw new InvalidTokenExpiration();
        }
    }
    if (refreshToken) {
        try {

            const payload = verifyRefreshToken(refreshToken);
            const user = await UserModel.findById(payload.sub);
            if (user) {
                const newAccessToken = generateAccessToken(user);
                reply.setCookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                });
                request.user = { sub: payload.sub } as any;
                return;
            } else {
                throw new InvalidTokenExpiration();
            }

        } catch {
            throw new InvalidTokenExpiration();
        }
    }
    throw new InvalidTokenExpiration();
}
