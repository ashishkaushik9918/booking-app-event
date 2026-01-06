import { NextResponse } from "next/server";
import * as authServices from "@/services/authServices";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await authServices.authLogin(body);
        if (!response.success) {
            return NextResponse.json(
                { success: false, message: response.message || "Login failed" },
                { status: 401 }
            );
        }
        if (response.success) {
            const res = NextResponse.json({
                success: true,
                user: response.user,
                message: response.message
            });
            res.cookies.set("token", response.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 5,
            });
            res.cookies.set("refreshToken", response.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
            });
            return res;
        }

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message || "Something went wrong" },
                { status: 500 }
            );
        }
        else {
            return NextResponse.json(
                { success: false, message: "Something went wrong" },
                { status: 500 }
            );
        }
    }

}

export async function GET(req: Request) {
    const res = NextResponse.json({
        success: true,

    });
    return res;
}
