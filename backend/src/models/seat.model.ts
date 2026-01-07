import { Schema, Types, Document } from "mongoose";

export interface ISeat extends Document {
    event: Types.ObjectId;
    section: string;
    row: string;
    seatNumber: string;

    type: "regular" | "vip" | "premium";
    price: number;

    status: "available" | "reserved" | "booked";
}

const SeatSchema = new Schema<ISeat>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        section: String,
        row: String,
        seatNumber: String,

        type: {
            type: String,
            enum: ["regular", "vip", "premium"],
        },

        price: Number,

        status: {
            type: String,
            enum: ["available", "reserved", "booked"],
            default: "available",
        },
    },
    { timestamps: true }
);

SeatSchema.index(
    { event: 1, section: 1, row: 1, seatNumber: 1 },
    { unique: true }
);
