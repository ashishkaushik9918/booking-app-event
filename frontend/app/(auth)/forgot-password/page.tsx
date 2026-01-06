"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    console.log({ email });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center">
        <div className="text-white max-w-md p-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Forgot your password? 🔐
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed">
            Don’t worry. We’ll help you reset it securely and get you back on
            track.
          </p>

          <div className="mt-10">
            <img
              src="/images/login.svg"
              alt="Forgot Password Illustration"
              className="w-full max-w-sm drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your registered email to receive reset instructions
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="mb-2">Email Address</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">
                ✅ Reset link sent successfully
              </p>
              <p className="text-sm text-gray-600">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remembered your password?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
