import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEventAdminStats extends Document {
    event: Types.ObjectId;

    totalOrders: number;
    totalTicketsSold: number;
    totalRevenue: number;

    refundCount: number;
}

const EventAdminStatsSchema = new Schema<IEventAdminStats>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", unique: true },

        totalOrders: { type: Number, default: 0 },
        totalTicketsSold: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 },

        refundCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const EventAdminStatsModel = mongoose.model<IEventAdminStats>(
    "EventAdminStats",
    EventAdminStatsSchema
);
