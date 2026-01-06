import { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";

export default async function jwtPlugin(app: FastifyInstance) {
    app.register(jwt, {
        secret: process.env.JWT_SECRET || "super-secret-key",
        sign: {
            expiresIn: "1h"
        }
    });
}
