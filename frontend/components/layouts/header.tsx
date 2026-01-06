"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileSidebar } from "./mobile-sidebar";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/useAuth";
import { useRouter } from "next/navigation";
import { authLogoutUser } from "@/services/authServices";

import {
  Bell,
  LogOut,
  Settings,
  KeyRound,
  User,
  CreditCard,
  Activity,
  LifeBuoy,
  Key,
  CheckCheck,
  Sun,
  List,
  HelpCircle,
  Moon,
  Globe,
  Search,
} from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";

export function Header() {
  const { user} = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  
  const handleLogout = async() => {
    const response = await authLogoutUser();
    if (!response.success)
      toastError(response?.message || "Whoops! something went wrong");
    toastSuccess(response.message);
    setTimeout(() => router.push("/"), 400);

  }

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileSidebar />
        <h1 className="text-lg font-semibold tracking-tight hidden md:block">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu open={searchOpen} onOpenChange={setSearchOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-full max-w-xs p-3 md:w-72"
          >
            <Input
              placeholder="Search bookings, users..."
              autoFocus
              className="w-full"
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Hindi</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Moon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Support Ticket</DropdownMenuItem>
            <DropdownMenuItem>Live Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Button size="sm" variant="ghost">
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">New Booking</span>
              <span className="text-xs text-muted-foreground">
                Booking #1234 has been confirmed
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">Payment Received</span>
              <span className="text-xs text-muted-foreground">
                ₹2,500 credited to your account
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium">New Review</span>
              <span className="text-xs text-muted-foreground">
                You received a 5★ review
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="justify-center text-primary">
              <List className="h-4 w-4 mr-2" />
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 mr-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.firstName?.[0]?.toLocaleUpperCase()}{ user?.lastName?.[0]?.toLocaleUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.firstName} { user?.lastName}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Plans
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Activity className="mr-2 h-4 w-4" />
              Activity Logs
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Key className="mr-2 h-4 w-4" />
              API Keys
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>

            <DropdownMenuItem>
              <KeyRound className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
