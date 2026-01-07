import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPaymentPayout extends Document {
    organizer: Types.ObjectId;

    amount: number;
    currency: string;

    periodStart: Date;
    periodEnd: Date;

    status: "pending" | "processing" | "paid" | "failed";
    providerPayoutId?: string;
}

const PaymentPayoutSchema = new Schema<IPaymentPayout>(
    {
        organizer: { type: Schema.Types.ObjectId, ref: "Organizer", index: true },

        amount: Number,
        currency: String,

        periodStart: Date,
        periodEnd: Date,

        status: {
            type: String,
            enum: ["pending", "processing", "paid", "failed"],
            default: "pending",
        },

        providerPayoutId: String,
    },
    { timestamps: true }
);

export const PaymentPayoutModel = mongoose.model<IPaymentPayout>(
    "PaymentPayout",
    PaymentPayoutSchema
);
