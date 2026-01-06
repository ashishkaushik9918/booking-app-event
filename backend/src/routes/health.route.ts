import { FastifyInstance } from "fastify";

export default async function healthRoute(app: FastifyInstance) {
    app.get("/", async () => {
        return { status: "ok" };
    });
}
