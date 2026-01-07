import { Schema, Types, Document } from "mongoose";
export interface ISeatLock extends Document {
    seat: Types.ObjectId;
    event: Types.ObjectId;
    user?: Types.ObjectId;
    expiresAt: Date;
}

const SeatLockSchema = new Schema<ISeatLock>(
    {
        seat: { type: Schema.Types.ObjectId, ref: "Seat", required: true },
        event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        expiresAt: { type: Date, index: true },
    },
    { timestamps: true }
);

SeatLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
