import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (app) => {
    await app.register(cors, {
        origin: (origin, cb) => {
            const allowedOrigins = [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "https://your-frontend.com",
            ];
            if (!origin) return cb(null, true);

            if (allowedOrigins.includes(origin)) {
                cb(null, true);
            } else {
                cb(new Error("Not allowed by CORS"), false);
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
})

