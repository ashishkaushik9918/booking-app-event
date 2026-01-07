import fp from "fastify-plugin";
import { Server } from "socket.io";
import { socketAuth } from "../sockets/middlewares/socket-auth.middleware";
import { joinUserRooms } from "../sockets/helpers/join-rooms";
export default fp(async (fastify) => {

    const io = new Server(fastify.server, {
        cors: {
            origin: "*",
            credentials: true,
        },
        transports: ["websocket"],
    });

    fastify.decorate("io", io);
    fastify.log.info("Socket.IO initialized");
    io.use(socketAuth());
    io.on("connection", (socket) => {
        try {
            const user = socket.data.user;
            if (!user) {
                fastify.log.warn(
                    { socketId: socket.id },
                    "Socket connected without user, disconnecting"
                );
                socket.disconnect(true);
                return;
            }
            fastify.log.info(
                {
                    socketId: socket.id,
                    userId: user.id,
                    orgId: user.orgId,
                },
                "Socket connected"
            );
            joinUserRooms(socket);
            socket.on("disconnect", (reason) => {
                fastify.log.info(
                    {
                        socketId: socket.id,
                        userId: user.id,
                        reason,
                    },
                    "Socket disconnected"
                );
            });
        } catch (err) {
            fastify.log.error(
                { err, socketId: socket.id },
                "Socket connection error"
            );
            socket.disconnect(true);
        }
    });
});
