import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPricingRule extends Document {
    event: Types.ObjectId;
    ticket?: Types.ObjectId;

    ruleType: "time" | "demand";
    multiplier: number;

    startDate?: Date;
    endDate?: Date;

    minPrice?: number;
    maxPrice?: number;
}

const PricingRuleSchema = new Schema<IPricingRule>(
    {
        event: { type: Schema.Types.ObjectId, ref: "Event", index: true },
        ticket: { type: Schema.Types.ObjectId, ref: "Ticket" },

        ruleType: {
            type: String,
            enum: ["time", "demand"],
        },

        multiplier: { type: Number, default: 1 },

        startDate: Date,
        endDate: Date,

        minPrice: Number,
        maxPrice: Number,
    },
    { timestamps: true }
);

export const PricingRuleModel = mongoose.model<IPricingRule>(
    "PricingRule",
    PricingRuleSchema
);
