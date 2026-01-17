import { Schema, model, Types } from "mongoose";
export enum AuthProvider {
    LOCAL = "local",
    GOOGLE = "google",
    GITHUB = "github",
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager",
}

export interface IRefreshToken {
    _id?: Types.ObjectId;
    token: string;
    createdAt: Date;
    expiresAt?: Date;
    device?: string;
    ip?: string;
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    password?: string;
    provider: AuthProvider;
    providerId?: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    refreshTokens: IRefreshToken[]
    lastLoginAt?: Date;
    loginAttempts: number;
    lockUntil?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    emailVerificationToken?: string;
    createdBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    name?: string;
    googleId?: string;
}

export type SafeUser = Omit<
    IUser,
    | "password"
    | "twoFactorSecret"
    | "refreshTokens"
    | "resetPasswordToken"
    | "emailVerificationToken"
>;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        provider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local",
            index: true,
        },
        providerId: {
            type: String,
        },

        role: {
            type: String,
            enum: ["admin", "user", "manager"],
            default: "user",
        },
        firstName: String,
        lastName: String,
        avatar: String,
        phone: {
            type: String,
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        twoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        twoFactorSecret: {
            type: String,
            select: false,
        },
        refreshTokens: [
            {
                token: {
                    type: String,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                expiresAt: {
                    type: Date,
                },
                device: String,
                ip: String,
            },
        ],

        lastLoginAt: Date,
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: Date,
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpires: Date,

        emailVerificationToken: {
            type: String,
            select: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
UserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
UserSchema.index({ email: 1 });
UserSchema.index({ provider: 1, providerId: 1 });
UserSchema.index({ role: 1, isActive: 1 });

export const UserModel = model<IUser>("User", UserSchema);
