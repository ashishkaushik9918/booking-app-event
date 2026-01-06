import jwt from "jsonwebtoken";
import { IUser } from "../../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateAccessToken = (user: IUser) => {
    return jwt.sign(
        {
            sub: user._id,
            role: user.role,
            provider: user.provider,
        },
        JWT_SECRET,
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (user: IUser) => {
    return jwt.sign(
        {
            sub: user._id,
        },
        REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET) as { sub: string };
};
