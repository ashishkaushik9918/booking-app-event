"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "./mobile-sidebar";
import LeadListener from "../common/ring/Notification";
import NavIcon from "@/config/navigation-icon";
import { UserProfile } from "./user-profile";
import { Notification } from "./notification";
import ModuleSearchModal from "./auto-complete";

export function Header() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileSidebar />
        <h1 className="text-lg font-semibold tracking-tight hidden md:block">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ModuleSearchModal />
        <LeadListener />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <NavIcon iconName="Globe" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Hindi</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <NavIcon iconName="Moon" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <NavIcon iconName="Sun" className="mr-2 h-4 w-4" />
              Light Mode
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavIcon iconName="Moon" className="mr-2 h-4 w-4" />
              Dark Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <NavIcon iconName="HelpCircle" className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Support Ticket</DropdownMenuItem>
            <DropdownMenuItem>Live Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Notification />
        <UserProfile />
      </div>
    </header>
  );
}
