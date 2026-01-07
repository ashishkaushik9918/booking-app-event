import mongoose, { Schema, Document, Types } from "mongoose";
export interface IOrder extends Document {
    user: Types.ObjectId;
    event: Types.ObjectId;

    tickets: {
        ticket: Types.ObjectId;
        quantity: number;
        price: number;
    }[];

    subtotal: number;
    tax: number;
    discount: number;
    totalAmount: number;

    status: "pending" | "confirmed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";

    paymentId?: string;
    paymentProvider?: string;
    transactionId?: string;

    expiresAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        event: { type: Schema.Types.ObjectId, ref: "Event", required: true },

        tickets: [
            {
                ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],

        subtotal: Number,
        tax: Number,
        discount: Number,
        totalAmount: Number,

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },

        paymentId: String,
        paymentProvider: String,
        transactionId: String,

        expiresAt: Date,
    },
    { timestamps: true }
);

OrderSchema.index({ user: 1, event: 1 });

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
