import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPaymentIntent extends Document {
    user: Types.ObjectId;
    order: Types.ObjectId;

    amount: number;
    currency: string;

    provider: "razorpay" | "stripe" | "paypal";
    providerIntentId?: string;

    status: "created" | "processing" | "succeeded" | "failed" | "expired";

    expiresAt: Date;
}

const PaymentIntentSchema = new Schema<IPaymentIntent>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", index: true },
        order: { type: Schema.Types.ObjectId, ref: "Order", index: true },

        amount: Number,
        currency: { type: String, default: "INR" },

        provider: {
            type: String,
            enum: ["razorpay", "stripe", "paypal"],
        },

        providerIntentId: String,

        status: {
            type: String,
            enum: ["created", "processing", "succeeded", "failed", "expired"],
            default: "created",
        },

        expiresAt: Date,
    },
    { timestamps: true }
);

PaymentIntentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PaymentIntentModel = mongoose.model<IPaymentIntent>(
    "PaymentIntent",
    PaymentIntentSchema
);
