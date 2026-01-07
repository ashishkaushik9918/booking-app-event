import mongoose, { Schema, Document, Types } from "mongoose";
export interface INotification extends Document {
    user: Types.ObjectId;
    type: "email" | "sms" | "push";
    title: string;
    message: string;

    isRead: boolean;
    sentAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", index: true },
        type: {
            type: String,
            enum: ["email", "sms", "push"],
        },
        title: String,
        message: String,
        isRead: { type: Boolean, default: false },
        sentAt: Date,
    },
    { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>(
    "Notification",
    NotificationSchema
);
