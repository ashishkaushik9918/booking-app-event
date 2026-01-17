"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight">
            Access Denied
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            You do not have permission to access this page.
            <br />
            If you think this is a mistake, please contact your administrator.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/login">Switch Account</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} School ERP. All rights reserved.
      </footer>
    </div>
  );
}

