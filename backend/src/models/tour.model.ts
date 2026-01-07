import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITour extends Document {
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;

    category: Types.ObjectId;
    organizer: Types.ObjectId;

    location: {
        address: string;
        city: string;
        state?: string;
        country: string;
        latitude?: number;
        longitude?: number;
    };

    startDate: Date;
    endDate?: Date;
    durationDays?: number;

    price: number;
    currency: string;

    maxSeats: number;
    bookedSeats: number;

    images: string[];
    bannerImage?: string;

    inclusions?: string[];
    exclusions?: string[];

    status: "draft" | "published" | "cancelled" | "completed";
    isFeatured: boolean;

    rating?: number;
    reviewsCount?: number;

    cancellationPolicy?: string;

    metadata?: Record<string, any>;

    createdAt: Date;
    updatedAt: Date;
}

const TourSchema = new Schema<ITour>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        description: {
            type: String,
            required: true,
        },

        shortDescription: {
            type: String,
            maxlength: 300,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },

        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        location: {
            address: { type: String, required: true },
            city: { type: String, required: true, index: true },
            state: String,
            country: { type: String, required: true, index: true },
            latitude: Number,
            longitude: Number,
        },

        startDate: {
            type: Date,
            required: true,
            index: true,
        },

        endDate: {
            type: Date,
        },

        durationDays: {
            type: Number,
            min: 1,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        maxSeats: {
            type: Number,
            required: true,
            min: 1,
        },

        bookedSeats: {
            type: Number,
            default: 0,
            min: 0,
        },

        images: {
            type: [String],
            default: [],
        },

        bannerImage: {
            type: String,
        },

        inclusions: {
            type: [String],
        },

        exclusions: {
            type: [String],
        },

        status: {
            type: String,
            enum: ["draft", "published", "cancelled", "completed"],
            default: "draft",
            index: true,
        },

        isFeatured: {
            type: Boolean,
            default: false,
            index: true,
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
        },

        reviewsCount: {
            type: Number,
            default: 0,
        },

        cancellationPolicy: {
            type: String,
        },

        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes for performance
 */
TourSchema.index({ price: 1 });
TourSchema.index({ startDate: 1, endDate: 1 });
TourSchema.index({ "location.city": 1, "location.country": 1 });

/**
 * Auto-generate slug
 */
TourSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

export const TourModel = mongoose.model<ITour>("Tour", TourSchema);
