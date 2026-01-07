import { Socket } from "socket.io";
export function joinUserRooms(socket: Socket) {
    const user = socket.data.user;
    if (!user) return;
    socket.join(`user:${user.sub}`);
    console.log("Joined rooms:", socket.rooms);
    // socket.join(`org:${user.orgId}`);
}
