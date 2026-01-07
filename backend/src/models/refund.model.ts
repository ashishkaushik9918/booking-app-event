import mongoose, { Schema, Types, Document } from "mongoose";
export interface IRefund extends Document {
    order: Types.ObjectId;
    user: Types.ObjectId;
    amount: number;

    status: "pending" | "processed" | "failed";
    provider: string;
    refundId?: string;

    reason?: string;
}

const RefundSchema = new Schema<IRefund>(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order", index: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        amount: Number,

        status: {
            type: String,
            enum: ["pending", "processed", "failed"],
            default: "pending",
        },

        provider: String,
        refundId: String,
        reason: String,
    },
    { timestamps: true }
);

export const RefundModel = mongoose.model<IRefund>("Refund", RefundSchema);
