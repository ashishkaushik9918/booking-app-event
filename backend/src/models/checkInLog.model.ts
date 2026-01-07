import mongoose, { Schema, Document, Types } from "mongoose";
export interface ICheckInLog extends Document {
    attendee: Types.ObjectId;
    event: Types.ObjectId;
    scannedBy: Types.ObjectId;
    scannedAt: Date;
}

const CheckInLogSchema = new Schema<ICheckInLog>(
    {
        attendee: { type: Schema.Types.ObjectId, ref: "Attendee", required: true },
        event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        scannedBy: { type: Schema.Types.ObjectId, ref: "User" },
        scannedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const CheckInLogModel = mongoose.model<ICheckInLog>(
    "CheckInLog",
    CheckInLogSchema
);
