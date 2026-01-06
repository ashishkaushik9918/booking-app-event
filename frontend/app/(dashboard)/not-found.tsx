"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full"
      >
        {/* Small label */}
        <p className="text-sm font-medium text-gray-400 tracking-wide mb-3">
          404 ERROR
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
          This page does not exist
        </h1>

        {/* Description */}
        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          The page you are trying to access could not be found. It may have been
          moved, renamed, or removed entirely.
        </p>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-4">
          <Button asChild>
            <Link href="/">Back to dashboard</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/support">Contact support</Link>
          </Button>
        </div>

        {/* Subtle divider */}
        <div className="mt-12 border-t border-gray-200 pt-4 text-sm text-gray-400">
          If you believe this is an error, please contact your administrator.
        </div>
      </motion.div>
    </div>
  );
}
