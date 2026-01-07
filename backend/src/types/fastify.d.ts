import "@fastify/jwt";
import { FastifyRequest } from "fastify";
import { RedisClientType } from "redis";
import { Server as SocketIOServer } from "socket.io";

declare module "fastify" {
    interface FastifyRequest {
        user: {
            sub: string;
            role: string;
            provider: string;
            iat: number;
            exp: number;
        };
        redis: RedisClientType;
        redisSub: RedisClientType;
        io: SocketIOServer;
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
