import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayout extends Document {
    organizer: Types.ObjectId;
    amount: number;
    currency: string;

    periodStart: Date;
    periodEnd: Date;

    status: "pending" | "processing" | "paid" | "failed";
    transactionId?: string;
}

const PayoutSchema = new Schema<IPayout>(
    {
        organizer: { type: Schema.Types.ObjectId, ref: "Organizer", index: true },
        amount: Number,
        currency: { type: String, default: "INR" },

        periodStart: Date,
        periodEnd: Date,

        status: {
            type: String,
            enum: ["pending", "processing", "paid", "failed"],
            default: "pending",
        },

        transactionId: String,
    },
    { timestamps: true }
);

export const PayoutModel = mongoose.model<IPayout>("Payout", PayoutSchema);
