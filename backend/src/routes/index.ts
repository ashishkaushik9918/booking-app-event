import { FastifyInstance } from "fastify";
import healthRoute from "./health.route";
import bookingRoutes from "../modules/bookings/booking.route";
import authRoutes from "../modules/auth/auth.route";

export default async function routes(app: FastifyInstance) {
    app.register(healthRoute);
    app.register(bookingRoutes);
    app.register(authRoutes, { prefix: '/api/auth' });
}
