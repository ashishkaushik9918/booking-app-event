import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
    user: Types.ObjectId;
    tour: Types.ObjectId;

    bookingDate: Date;
    travelDate: Date;

    persons: number;
    price: number;
    currency: string;

    discount?: number;
    tax?: number;
    totalAmount: number;

    status: "pending" | "confirmed" | "cancelled" | "completed";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";

    paymentId?: string;
    paymentProvider?: "razorpay" | "stripe" | "paypal";
    transactionId?: string;

    contactDetails: {
        name: string;
        email: string;
        phone: string;
    };

    bookingReference: string;

    cancellation?: {
        cancelledAt?: Date;
        cancelledBy?: "user" | "admin" | "system";
        reason?: string;
        refundAmount?: number;
        refundId?: string;
    };

    notes?: string;
    metadata?: Record<string, any>;

    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        tour: {
            type: Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
            index: true,
        },

        bookingDate: {
            type: Date,
            default: Date.now,
        },

        travelDate: {
            type: Date,
            required: true,
            index: true,
        },

        persons: {
            type: Number,
            required: true,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        discount: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
            index: true,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
            index: true,
        },

        paymentId: {
            type: String,
        },

        paymentProvider: {
            type: String,
            enum: ["razorpay", "stripe", "paypal"],
        },

        transactionId: {
            type: String,
            index: true,
        },

        contactDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
        },

        bookingReference: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        cancellation: {
            cancelledAt: Date,
            cancelledBy: {
                type: String,
                enum: ["user", "admin", "system"],
            },
            reason: String,
            refundAmount: Number,
            refundId: String,
        },

        notes: {
            type: String,
        },

        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);


BookingSchema.index(
    { user: 1, tour: 1, travelDate: 1 },
    { unique: true }
);
BookingSchema.pre("validate", function (next) {
    if (!this.bookingReference) {
        this.bookingReference = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
});

export const BookingModel = mongoose.model<IBooking>(
    "Booking",
    BookingSchema
);
