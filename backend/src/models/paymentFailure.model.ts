import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPaymentFailure extends Document {
    user?: Types.ObjectId;
    order?: Types.ObjectId;

    provider: string;
    errorCode?: string;
    errorMessage?: string;

    retryable: boolean;
}

const PaymentFailureSchema = new Schema<IPaymentFailure>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        order: { type: Schema.Types.ObjectId, ref: "Order" },

        provider: String,
        errorCode: String,
        errorMessage: String,

        retryable: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const PaymentFailureModel = mongoose.model<IPaymentFailure>(
    "PaymentFailure",
    PaymentFailureSchema
);
