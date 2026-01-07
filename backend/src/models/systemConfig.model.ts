import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISystemConfig extends Document {
    key: string;
    value: any;
}

const SystemConfigSchema = new Schema<ISystemConfig>(
    {
        key: { type: String, unique: true },
        value: Schema.Types.Mixed,
    },
    { timestamps: true }
);

export const SystemConfigModel = mongoose.model<ISystemConfig>(
    "SystemConfig",
    SystemConfigSchema
);
