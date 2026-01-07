import mongoose, { Schema, Document, Types } from "mongoose";


export interface IPaymentLedger extends Document {
    referenceType: "order" | "refund" | "payout";
    referenceId: Types.ObjectId;

    debit: number;
    credit: number;

    balance: number;
    currency: string;
}

const PaymentLedgerSchema = new Schema<IPaymentLedger>(
    {
        referenceType: String,
        referenceId: Schema.Types.ObjectId,

        debit: { type: Number, default: 0 },
        credit: { type: Number, default: 0 },

        balance: Number,
        currency: String,
    },
    { timestamps: true }
);

export const PaymentLedgerModel = mongoose.model<IPaymentLedger>(
    "PaymentLedger",
    PaymentLedgerSchema
);
