import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavIcon from "@/config/navigation-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Notification = () => {
    return (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <NavIcon iconName="Bell" className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Button size="sm" variant="ghost">
                <NavIcon iconName="CheckCheck" className="h-4 w-4 mr-1" />
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
              <NavIcon iconName="List" className="h-4 w-4 mr-2" />
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    );
}