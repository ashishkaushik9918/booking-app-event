import fp from "fastify-plugin";
import { pubClient, subClient, connectRedis } from "../config/redis.config";

export default fp(async (fastify) => {
    await connectRedis();
    fastify.decorate("redis", pubClient);
    fastify.decorate("redisSub", subClient);
    fastify.addHook("onClose", async () => {
        await pubClient.quit();
        await subClient.quit();
    });
});
