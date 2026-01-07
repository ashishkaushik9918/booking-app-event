import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMedia extends Document {
    entityType: "event" | "organizer";
    entityId: Types.ObjectId;

    type: "image" | "video" | "pdf";
    url: string;

    isPrimary: boolean;
}

const MediaSchema = new Schema<IMedia>(
    {
        entityType: {
            type: String,
            enum: ["event", "organizer"],
        },
        entityId: Schema.Types.ObjectId,

        type: {
            type: String,
            enum: ["image", "video", "pdf"],
        },
        url: String,
        isPrimary: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const MediaModel = mongoose.model<IMedia>("Media", MediaSchema);
