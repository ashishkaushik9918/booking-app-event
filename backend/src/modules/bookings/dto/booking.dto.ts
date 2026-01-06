import { z } from "zod";

export const createBookingSchema = z.object({
    tour: z.string({ message: "Tour is required" }).min(1),
    travelDate: z.string({ message: "Travel date is required" }).min(1),
    persons: z.number({ message: "At least 1 person required" }).min(1),
    price: z.number({ message: "Price must be greater than 0" }).positive()
});


export const createBookingSwagger = {
    type: "object",           // must include type
    required: ["userId", "date", "timeSlot"],
    properties: {
        userId: { type: "string" },
        date: { type: "string", format: "date" },
        timeSlot: { type: "string" },
        notes: { type: "string" },
    }
};