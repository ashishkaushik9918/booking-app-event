import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITicket extends Document {
    event: Types.ObjectId;
    name: string;
    description?: string;

    price: number;
    currency: string;

    totalQuantity: number;
    soldQuantity: number;

    saleStart: Date;
    saleEnd: Date;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            index: true,
        },

        description: String,

        price: {
            type: Number,
            min: 0,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        totalQuantity: {
            type: Number,
            required: true,
            min: 1,
        },

        soldQuantity: {
            type: Number,
            default: 0,
        },

        saleStart: Date,
        saleEnd: Date,

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

TicketSchema.index({ event: 1, name: 1 }, { unique: true });

export const TicketModel = mongoose.model<ITicket>("Ticket", TicketSchema);
