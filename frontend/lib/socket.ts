import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;
export function getSocket(): Socket {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
            autoConnect: false,
            transports: ["websocket"],
            withCredentials: true,
            auth: {
                token:
                    typeof window !== "undefined"
                        ? localStorage.getItem("accessToken")
                        : "",
            },
        });
    }
    socket.on("connect", () => {
        console.log("🟢 Socket connected:", socket!.id);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Socket disconnected");
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });
    return socket;
}
