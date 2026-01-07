import mongoose, { Schema, Types, Document } from "mongoose";
export interface IWaitlist extends Document {
    event: Types.ObjectId;
    user: Types.ObjectId;
    position: number;
    notified: boolean;
}

const WaitlistSchema = new Schema<IWaitlist>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        user: { type: Schema.Types.ObjectId, ref: "User", index: true },
        position: Number,
        notified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

WaitlistSchema.index({ event: 1, user: 1 }, { unique: true });

export const RefundModel = mongoose.model<IWaitlist>("WaitList", WaitlistSchema);
