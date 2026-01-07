import { z } from "zod";

export const leadCreateSchema = z.object({
    name: z.string({ message: "Name is required" }).max(100, { message: "Phone number should not be more than 100" }),
    email: z.string({ message: "Email is required" }).email({ message: 'Email is invalid' }),
    phone: z.string({ message: "Phone is required" }).max(10, { message: "Phone number should not be more than 10" }),

});

export type LeadCreateDTO = z.infer<typeof leadCreateSchema>;