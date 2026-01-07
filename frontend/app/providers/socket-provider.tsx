"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

export default function SocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const socket = getSocket();
        if (!socket.connected) {
            socket.connect();
            console.log("socket connected successfully");
        }
        return () => {
            socket.disconnect();
        };
    }, []);

    return <>{children}</>;
}
