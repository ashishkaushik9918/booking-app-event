import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAddon extends Document {
    event: Types.ObjectId;
    name: string;
    price: number;
    currency: string;

    stock?: number;
    isActive: boolean;
}

const AddonSchema = new Schema<IAddon>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        name: String,
        price: Number,
        currency: { type: String, default: "INR" },

        stock: Number,
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const AddonModel = mongoose.model<IAddon>("Addon", AddonSchema);
