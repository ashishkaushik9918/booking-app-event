import { FastifyInstance } from "fastify";

export default async function authHook(app: FastifyInstance) {
    app.decorate(
        "authenticate",
        async (request: any, reply: any) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.code(401).send({
                    success: false,
                    message: "Unauthorized"
                });
            }
        }
    );
}
