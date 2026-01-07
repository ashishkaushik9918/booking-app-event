import mongoose, { Schema, Document, Types } from "mongoose";


export interface IEventApproval extends Document {
    event: Types.ObjectId;
    reviewedBy: Types.ObjectId;

    status: "pending" | "approved" | "rejected";
    remarks?: string;
}

const EventApprovalSchema = new Schema<IEventApproval>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        remarks: String,
    },
    { timestamps: true }
);

EventApprovalSchema.index({ event: 1 }, { unique: true });

export const EventApprovalModel = mongoose.model<IEventApproval>(
    "EventApproval",
    EventApprovalSchema
);
