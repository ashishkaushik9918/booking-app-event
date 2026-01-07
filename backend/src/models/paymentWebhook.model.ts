import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPaymentWebhook extends Document {
    provider: string;
    eventType: string;

    providerEventId: string;
    payload: any;

    processed: boolean;
}

const PaymentWebhookSchema = new Schema<IPaymentWebhook>(
    {
        provider: String,
        eventType: String,
        providerEventId: { type: String, unique: true },

        payload: Schema.Types.Mixed,
        processed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const PaymentWebhookModel = mongoose.model<IPaymentWebhook>(
    "PaymentWebhook",
    PaymentWebhookSchema
);
