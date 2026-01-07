import mongoose, { Schema, Document, Types } from "mongoose";
export interface ICoupon extends Document {
    code: string;
    discountType: "flat" | "percentage";
    discountValue: number;

    maxDiscount?: number;
    minOrderAmount?: number;

    usageLimit: number;
    usedCount: number;

    validFrom: Date;
    validTill: Date;

    isActive: boolean;
}

const CouponSchema = new Schema<ICoupon>(
    {
        code: { type: String, unique: true, index: true },
        discountType: {
            type: String,
            enum: ["flat", "percentage"],
            required: true,
        },
        discountValue: Number,
        maxDiscount: Number,
        minOrderAmount: Number,

        usageLimit: Number,
        usedCount: { type: Number, default: 0 },

        validFrom: Date,
        validTill: Date,

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const CouponModel = mongoose.model<ICoupon>("Coupon", CouponSchema);
