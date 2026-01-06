"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess(true);
    console.log({ password });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* LEFT SECTION */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center">
        <div className="text-white max-w-md p-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Create New Password 🔐
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed">
            Choose a strong password to keep your account secure.
          </p>

          <div className="mt-10">
            <img
              src="/images/login.svg"
              alt="Reset Password"
              className="w-full max-w-sm drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Set New Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Your new password must be different from the previous one
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="mb-2">New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="mb-2">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90">
                Update Password
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">
                ✅ Password updated successfully
              </p>
              <p className="text-sm text-gray-600">
                You can now sign in using your new password.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                onClick={() => (window.location.href = "/login")}
              >
                Go to Sign In
              </Button>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Need help?{" "}
            <a href="/support" className="text-indigo-600 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
