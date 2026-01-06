import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
export async function authGuard(request: FastifyRequest) {
    const token = request.cookies.accessToken;
    if (!token) {
        throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
        request.user = payload as any;
    } catch {
        throw Object.assign(new Error("Invalid or expired token"), { statusCode: 401 });
    }
}
