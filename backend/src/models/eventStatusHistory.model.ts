import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEventStatusHistory extends Document {
    event: Types.ObjectId;
    oldStatus: string;
    newStatus: string;
    changedBy: Types.ObjectId;
}

const EventStatusHistorySchema = new Schema<IEventStatusHistory>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        oldStatus: String,
        newStatus: String,
        changedBy: Schema.Types.ObjectId,
    },
    { timestamps: true }
);

export const EventStatusHistoryModel = mongoose.model<IEventStatusHistory>(
    "EventStatusHistory",
    EventStatusHistorySchema
);
