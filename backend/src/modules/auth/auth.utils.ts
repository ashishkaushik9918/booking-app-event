import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 12);
};

export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateTwoFactorSecret = () => {
    return speakeasy.generateSecret({
        length: 20,
    });
};

export const verifyTwoFactorToken = (
    secret: string,
    token: string
): boolean => {
    return speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1,
    });
};
