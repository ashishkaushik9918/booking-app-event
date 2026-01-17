"use client";
import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingButton from "@/components/shared/button/loadingButton";
import { toastError, toastSuccess } from "@/lib/toast";
import throttle from "lodash/throttle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authLogin } from "@/services/authServices";
import { SocialLoginButton } from "./socialLoginButton";
export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        try {
            const response = await authLogin({ email, password })
            const result = response;
            if (!result.success) {
                toastError(result.message);
            } else {
                toastSuccess(result.message);
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);
            }
        } catch (err) {
            if (err instanceof Error) toastError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [email, password, router]);

    const throttledSubmit = useMemo(
        () =>
            throttle(() => {
                if (!loading) handleSubmit();
            }, 3000),
        [loading, handleSubmit]
    );

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 justify-center items-center">
                <div className="text-white p-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg">
                        Sign in to access your dashboard and manage your bookings easily.
                    </p>
                    <div className="mt-8">
                        <Image
                            src="/images/login.svg"
                            alt="Illustration"
                            className="w-full max-w-sm"
                            width={500}
                            height={100}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center  bg-white shadow-2xl">
                <div className="w-full max-w-md shadow-2xl p-6 rounded-2xl">
                    <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        throttledSubmit();
                    }} className="space-y-5">
                        <div>
                            <Label htmlFor="email" className="mb-2">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="mb-2">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={remember}
                                    onCheckedChange={(checked) => setRemember(!!checked)}
                                />
                                <Label htmlFor="remember" className="cursor-pointer" >
                                    Remember Me
                                </Label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <LoadingButton type="submit" className="w-full mt-2" loading={loading} text="Sign In"

                        />
                    </form>
                    <div className="flex items-center my-6">
                        <span className="flex-grow border-t border-gray-300"></span>
                        <span className="mx-2 text-gray-400 text-sm">or</span>
                        <span className="flex-grow border-t border-gray-300"></span>
                    </div>
                  <SocialLoginButton/>
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}