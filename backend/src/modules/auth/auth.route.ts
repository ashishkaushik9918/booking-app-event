import * as authController from "./auth.controller";
import { FastifyInstance } from "fastify";
import { authLoginSchema } from "./dto/auth.dto";
import { authGuard } from "../../plugins/auth.guard";
export default async function authRoutes(route: FastifyInstance) {
    route.post("/login", { schema: { body: authLoginSchema } }, authController.authLogin);
    route.post("/update", authController.authRegister);
    route.post("/refresh", authController.authRefresh);
    route.post("/me", { preHandler: authGuard }, authController.authMe);
    route.post("/logout", { preHandler: authGuard }, authController.authLogoutUser);
}
