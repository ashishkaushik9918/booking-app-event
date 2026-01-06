import { FastifyInstance } from "fastify";
import rateLimit from "@fastify/rate-limit";

export default async function rateLimitPlugin(app: FastifyInstance) {
    await app.register(rateLimit, {
        max: 100,
        timeWindow: "1 minute",
        hook: "onRequest",
        addHeaders: {
            "x-ratelimit-limit": true,
            "x-ratelimit-remaining": true,
            "x-ratelimit-reset": true
        },
        errorResponseBuilder: (req, context) => {
            return {
                success: false,
                message: `Too many requests, retry in ${context.after}ms`
            };
        }
    });
}
