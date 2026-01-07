import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    role: "super_admin" | "admin" | "moderator";
    permissions: string[];
    isActive: boolean;
}

const AdminSchema = new Schema<IAdmin>(
    {
        name: String,
        email: { type: String, unique: true },
        role: {
            type: String,
            enum: ["super_admin", "admin", "moderator"],
            default: "admin",
        },
        permissions: [String],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
