import { FastifyInstance } from "fastify";
import { createUser } from "./booking.controller";
import { createBookingSchema, createBookingSwagger } from "./dto/booking.dto";

export default async function bookingRoutes(app: FastifyInstance) {
    app.post("/create", {
        schema: {
            description: "Create a new booking",
            tags: ["Booking"],
            body: createBookingSwagger,
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        result: { type: "object", nullable: true }
                    }
                }
            }
        },
        handler: createUser
    });
    app.put('/some-route', {
        schema: {
            description: 'Update booking data',
            tags: ['Bookings'],  // Fixed: Matches config tag name
            summary: 'Update booking',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Booking ID' }
                }
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' }
                },
                required: ['name']
            },
            response: {
                200: {
                    description: 'Success',
                    type: 'object',
                    properties: { message: { type: 'string' } }
                }
            },
            security: [{ bearerAuth: [] }]  // Optional: Applies bearer auth for this route
        }
    }, async (request: any, reply) => {
        const { id } = request.params;
        const { name, email } = request.body;
        // Your handler logic here (e.g., update DB)
        return { message: `Booking ${id} updated to ${name}` };
    });
}
