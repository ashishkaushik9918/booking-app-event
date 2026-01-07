import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAuditLog extends Document {
    user?: Types.ObjectId;
    action: string;
    entity: string;
    entityId?: Types.ObjectId;
    ipAddress?: string;
}

const AuditLogSchema = new Schema<IAuditLog>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        action: String,
        entity: String,
        entityId: Schema.Types.ObjectId,
        ipAddress: String,
    },
    { timestamps: true }
);

export const AuditLogModel = mongoose.model<IAuditLog>(
    "AuditLog",
    AuditLogSchema
);
