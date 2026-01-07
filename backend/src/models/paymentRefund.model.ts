import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPaymentRefund extends Document {
    transaction: Types.ObjectId;
    order: Types.ObjectId;
    user: Types.ObjectId;

    amount: number;
    currency: string;

    providerRefundId?: string;

    status: "pending" | "success" | "failed";
    reason?: string;
}

const PaymentRefundSchema = new Schema<IPaymentRefund>(
    {
        transaction: { type: Schema.Types.ObjectId, ref: "PaymentTransaction" },
        order: { type: Schema.Types.ObjectId, ref: "Order" },
        user: { type: Schema.Types.ObjectId, ref: "User" },

        amount: Number,
        currency: String,

        providerRefundId: String,

        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },

        reason: String,
    },
    { timestamps: true }
);

export const PaymentRefundModel = mongoose.model<IPaymentRefund>(
    "PaymentRefund",
    PaymentRefundSchema
);
