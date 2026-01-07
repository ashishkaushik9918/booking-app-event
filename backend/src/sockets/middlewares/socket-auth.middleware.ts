import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
interface JwtPayload {
    id: string;
    orgId: string;
    role: string;
}

export function socketAuth() {
    return (socket: Socket, next: (err?: Error) => void) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie) {
                return next(new Error("Unauthorized"));
            }

            const cookies = cookie.parse(rawCookie)
            const token = cookies.accessToken;
            if (!token) {
                return next(new Error("Unauthorized"));
            }

            const payload = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as JwtPayload;
            socket.data.user = payload;

            next();
        } catch (err) {
            next(new Error("Invalid token"));
        }
    };
}
