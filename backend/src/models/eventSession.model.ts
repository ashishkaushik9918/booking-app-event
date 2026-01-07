import mongoose, { Schema, Types, Document } from "mongoose";
export interface IEventSession extends Document {
    event: Types.ObjectId;
    title: string;
    speaker?: string;

    startTime: Date;
    endTime: Date;
    location?: string;
}

const EventSessionSchema = new Schema<IEventSession>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        title: { type: String, required: true },
        speaker: String,
        startTime: Date,
        endTime: Date,
        location: String,
    },
    { timestamps: true }
);

export const EventSessionModel = mongoose.model<IEventSession>(
    "EventSession",
    EventSessionSchema
);
