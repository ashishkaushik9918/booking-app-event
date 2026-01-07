import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrganizer extends Document {
    name: string;
    email: string;
    phone?: string;

    logo?: string;
    website?: string;

    commissionRate: number; // platform commission %

    bankDetails?: {
        accountName: string;
        accountNumber: string;
        ifsc: string;
        bankName: string;
    };

    isActive: boolean;
}

const OrganizerSchema = new Schema<IOrganizer>(
    {
        name: { type: String, required: true, index: true },
        email: { type: String, unique: true },
        phone: String,

        logo: String,
        website: String,

        commissionRate: { type: Number, default: 10 },

        bankDetails: {
            accountName: String,
            accountNumber: String,
            ifsc: String,
            bankName: String,
        },

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const OrganizerModel = mongoose.model<IOrganizer>(
    "Organizer",
    OrganizerSchema
);
