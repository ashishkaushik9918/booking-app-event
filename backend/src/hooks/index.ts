import { FastifyInstance } from "fastify";
export default async function hooks(app: FastifyInstance) {
    app.addHook("onRequest", async (request, reply) => {
        request.startTime = Date.now();
        reply.header("X-Request-Id", request.id);
    });

    app.addHook("onResponse", async (request, reply) => {
        const responseTime = Date.now() - request.startTime;

        request.log.info({
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            responseTime
        });
    });

    app.addHook("onReady", async () => {
        app.log.info("Application ready");
    });

    app.addHook("onClose", async () => {
        app.log.info("Application closing");
    });
}
