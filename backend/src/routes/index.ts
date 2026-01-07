import { FastifyInstance } from "fastify";
import healthRoute from "./health.route";
import bookingRoutes from "../modules/bookings/booking.route";
import authRoutes from "../modules/auth/auth.route";
import LeadRoutes from "../modules/leads/lead.route";


export default async function routes(app: FastifyInstance) {
    app.register(healthRoute, { prefix: '/api/health' });
    app.register(bookingRoutes, { prefix: '/api/bookings' });
    app.register(authRoutes, { prefix: '/api/auth' });
    app.register(LeadRoutes, { prefix: '/api/leads' })
}
