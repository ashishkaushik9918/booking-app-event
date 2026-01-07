import { FastifyInstance } from "fastify";

export const setUpPluginsConfig = async (app: FastifyInstance) => {
    await app.register(import("./socket.plugin"));
    await app.register(import("./redis.plugin"))
}