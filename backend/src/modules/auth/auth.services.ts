import { UserModel } from "../../models/user.model";
import {
    hashPassword,
    comparePassword,
    verifyTwoFactorToken,
} from "./auth.utils";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "./auth.tokens";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthProvider } from "../../models/user.model";
import {
    InvalidCredentialsError,
    AccountLockedError,
    TwoFactorRequiredError,
    RefreshTokenRevokedError,
    AccountDisabledError,
    InvalidRefreshTokenError,
    InvalidTwoFactorCodeError
} from "../../exceptions/auth.errors";

export class AuthService {
    static async register(data: RegisterDto) {
        const exists = await UserModel.findOne({ email: data.email });
        if (exists) throw new Error("Email already registered");

        const user = await UserModel.create({
            email: data.email,
            password: await hashPassword(data.password),
            firstName: data.firstName,
            lastName: data.lastName,
            provider: AuthProvider.LOCAL,
        });

        return this.issueTokens(user);
    }
    static async login(data: LoginDto, meta?: { ip?: string; device?: string }) {
        const user = await UserModel.findOne({ email: data.email }).select(
            "+password +twoFactorSecret"
        );

        if (!user || !user.password)
            throw new InvalidCredentialsError();

        if (!user.isActive) throw new AccountDisabledError();

        if (user.lockUntil && user.lockUntil > new Date())
            throw new AccountLockedError();

        const match = await comparePassword(data.password, user.password);
        if (!match) {
            user.loginAttempts += 1;
            await user.save();
            throw new InvalidCredentialsError();
        }

        if (user.twoFactorEnabled) {
            if (!data.twoFactorCode)
                throw new TwoFactorRequiredError();

            const valid2fa = verifyTwoFactorToken(
                user.twoFactorSecret!,
                data.twoFactorCode
            );

            if (!valid2fa) throw new InvalidTwoFactorCodeError()
        }

        user.loginAttempts = 0;
        user.lastLoginAt = new Date();
        await user.save();

        return this.issueTokens(user, meta);
    }

    private static async issueTokens(
        user: any,
        meta?: { ip?: string; device?: string }
    ) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshTokens.push({
            token: refreshToken,
            ip: meta?.ip,
            device: meta?.device,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 86400000),
        });

        user.refreshTokens = user.refreshTokens.slice(-5);
        await user.save();

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    static async refresh(refreshToken: string) {
        const payload = verifyRefreshToken(refreshToken);
        const user = await UserModel.findById(payload.sub);
        if (!user) throw new InvalidRefreshTokenError()

        const stored = user.refreshTokens.find(
            (t) => t.token === refreshToken
        );
        if (!stored) throw new RefreshTokenRevokedError();

        user.refreshTokens = user.refreshTokens.filter(
            (t) => t.token !== refreshToken
        );

        return this.issueTokens(user);
    }

    static async logout(userId: string, refreshToken: string) {
        await UserModel.updateOne(
            { _id: userId },
            { $pull: { refreshTokens: { token: refreshToken } } }
        );
    }
    static async updateAllPassword() {
        const pass = await hashPassword("ashish@123");
        await UserModel.updateMany(
            { password: { $exists: true } },
            { $set: { password: pass } }
        );

    }
}

