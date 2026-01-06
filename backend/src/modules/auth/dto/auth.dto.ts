import { z } from "zod";

export const authLoginSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: 'Email is invalid' }),
    password: z.string({ message: "Password is required" }),
    // twoFactorCode: z.nullish()
});