/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center">
        <div className="text-white max-w-md p-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Create Your Account 🚀
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed">
            Join our platform to manage bookings, events, and customers with
            ease.
          </p>

          <div className="mt-10">
            <img
              src="/images/login.svg"
              alt="Register Illustration"
              className="w-full max-w-sm drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Sign Up
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            It only takes a few seconds
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">First Name</Label>
                <Input
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) =>
                    handleChange("firstName", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label className="mb-2">Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) =>
                    handleChange("lastName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="mb-2">Email</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label className="mb-2">Password</Label>
              <Input
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) =>
                  handleChange("password", e.target.value)
                }
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="mb-2">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                required
              />
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                checked={form.agree}
                onCheckedChange={(v) =>
                  handleChange("agree", !!v)
                }
              />
              <p className="text-sm text-gray-600 leading-tight">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>

            {/* Submit */}
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90">
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
