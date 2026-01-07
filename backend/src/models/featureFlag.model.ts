import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFeatureFlag extends Document {
    key: string;
    enabled: boolean;
    rolloutPercentage: number;
}

const FeatureFlagSchema = new Schema<IFeatureFlag>(
    {
        key: { type: String, unique: true },
        enabled: Boolean,
        rolloutPercentage: { type: Number, default: 100 },
    },
    { timestamps: true }
);

export const FeatureFlagModel = mongoose.model<IFeatureFlag>(
    "FeatureFlag",
    FeatureFlagSchema
);
