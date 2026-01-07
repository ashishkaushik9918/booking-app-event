import mongoose, { Schema, Document, Types } from "mongoose";
export interface IPaymentTransaction extends Document {
    user: Types.ObjectId;
    order: Types.ObjectId;

    provider: "razorpay" | "stripe" | "paypal";
    providerPaymentId: string;
    providerOrderId?: string;

    amount: number;
    currency: string;

    status: "success" | "failed" | "pending";

    rawResponse?: any;
}

const PaymentTransactionSchema = new Schema<IPaymentTransaction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", index: true },
        order: { type: Schema.Types.ObjectId, ref: "Order", index: true },

        provider: String,
        providerPaymentId: { type: String, unique: true },

        providerOrderId: String,

        amount: Number,
        currency: String,

        status: {
            type: String,
            enum: ["success", "failed", "pending"],
        },

        rawResponse: Schema.Types.Mixed,
    },
    { timestamps: true }
);

export const PaymentTransactionModel = mongoose.model<IPaymentTransaction>(
    "PaymentTransaction",
    PaymentTransactionSchema
);
