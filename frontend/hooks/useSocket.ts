"use client";

import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

export function useSocket(): Socket {
    return getSocket();
}
