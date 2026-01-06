import "@fastify/jwt";
import { FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        user: {
            sub: string;
            role: string;
            provider: string;
            iat: number;
            exp: number;
        };
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            sub: string;
            role: string;
            provider: string;
        };
        user: {
            sub: string;
            role: string;
            provider: string;
        };
    }
}
