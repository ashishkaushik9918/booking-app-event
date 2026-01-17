import * as authController from "./auth.controller";
import { FastifyInstance } from "fastify";
import { authLoginSchema } from "./dto/auth.dto";
import { authGuard } from "../../plugins/auth.guard";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "./auth.tokens";
export default async function authRoutes(route: FastifyInstance) {
    route.post("/login", { schema: { body: authLoginSchema } }, authController.authLogin);
    route.post("/update", authController.authRegister);
    route.post("/refresh", authController.authRefresh);
    route.post("/me", { preHandler: authGuard }, authController.authMe);
    route.post("/logout", { preHandler: authGuard }, authController.authLogoutUser);
    // route.get(
    //     "/google",
    //     {},

    // );

    // route.get(
    //     "/google/callback",
    //     passport.authenticate("google", {
    //         failureRedirect: `${process.env.FRONTEND_URL}/login`,
    //         session: false,
    //     }),
    //     (req, res) => {
    //         const user = req.user as any;

    //         const accessToken = generateAccessToken(user);
    //         const refreshToken = generateRefreshToken(user);
    //         res.setCookie("accessToken", accessToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production",
    //             sameSite: "strict",
    //             path: "/",
    //             maxAge: 7 * 24 * 60 * 5 * 24,
    //         });
    //         res.setCookie("refreshToken", refreshToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production",
    //             sameSite: "strict",
    //             path: "/",
    //             maxAge: 7 * 24 * 60 * 60,
    //         });
    //         res.redirect(
    //             `${process.env.FRONTEND_URL}/dashboard`
    //         );
    //     }
    // );
}
