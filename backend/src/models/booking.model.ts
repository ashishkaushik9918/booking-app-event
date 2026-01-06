import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
    user: Types.ObjectId;
    tour: Types.ObjectId;
    bookingDate: Date;
    travelDate: Date;
    persons: number;
    price: number;
    status: "pending" | "confirmed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    paymentId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        tour: {
            type: Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
            index: true
        },
        bookingDate: {
            type: Date,
            default: Date.now
        },
        travelDate: {
            type: Date,
            required: true
        },
        persons: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending"
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        paymentId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);
BookingSchema.index(
    { user: 1, tour: 1, travelDate: 1 },
    { unique: true }
);

export const BookingModel = mongoose.model<IBooking>(
    "Booking",
    BookingSchema
);
