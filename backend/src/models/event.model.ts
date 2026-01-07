import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document {
    title: string;
    slug: string;

    description: string;
    shortDescription?: string;

    category: Types.ObjectId;
    organizer: Types.ObjectId;

    venue: {
        name: string;
        address: string;
        city: string;
        state?: string;
        country: string;
        latitude?: number;
        longitude?: number;
        isOnline: boolean;
        meetingUrl?: string;
    };

    startDate: Date;
    endDate: Date;
    timezone: string;

    pricing: {
        type: "free" | "paid";
        price?: number;
        currency?: string;
    };

    capacity: {
        totalSeats: number;
        bookedSeats: number;
    };

    images: {
        banner?: string;
        gallery?: string[];
    };

    tags?: string[];

    status: "draft" | "published" | "cancelled" | "completed";
    isFeatured: boolean;

    registrationDeadline?: Date;

    refundPolicy?: string;

    metadata?: Record<string, any>;

    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
            index: true,
            trim: true,
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

        venue: {
            name: { type: String, required: true },
            address: { type: String },
            city: { type: String, index: true },
            state: String,
            country: { type: String, index: true },
            latitude: Number,
            longitude: Number,
            isOnline: { type: Boolean, default: false },
            meetingUrl: String,
        },

        startDate: {
            type: Date,
            required: true,
            index: true,
        },

        endDate: {
            type: Date,
            required: true,
            index: true,
        },

        timezone: {
            type: String,
            default: "Asia/Kolkata",
        },

        pricing: {
            type: {
                type: String,
                enum: ["free", "paid"],
                default: "free",
            },
            price: {
                type: Number,
                min: 0,
            },
            currency: {
                type: String,
                default: "INR",
            },
        },

        capacity: {
            totalSeats: {
                type: Number,
                required: true,
                min: 1,
            },
            bookedSeats: {
                type: Number,
                default: 0,
            },
        },

        images: {
            banner: String,
            gallery: [String],
        },

        tags: {
            type: [String],
            index: true,
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

        registrationDeadline: {
            type: Date,
        },

        refundPolicy: {
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
 * Indexes
 */
EventSchema.index({ startDate: 1, endDate: 1 });
EventSchema.index({ "venue.city": 1, "venue.country": 1 });
EventSchema.index({ isFeatured: 1, status: 1 });

/**
 * Auto-generate slug
 */
EventSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

export const EventModel = mongoose.model<IEvent>("Event", EventSchema);
