import NavIcon from "@/config/navigation-icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import { authLogoutUser } from "@/services/authServices";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";

export const profileMenu = [
    { name: "My Profile", icon: "User" },
    { name: "Account Settings", icon: "Settings" },
    { name: "Billing & Plans", icon: "CreditCard" },
    { name: "Activity Logs", icon: "Activity" },
    { name: "API Key", icon: "Key" },
    { name: "Help & Support", icon: "LifeBuoy" },
    { name: "Change Password", icon: "KeyRound" },
] as const;
import { navigationIcon } from "@/config/navigation-icon";



export type ProfileMenuItem = {
    name: string;
    icon: keyof typeof navigationIcon;
    group: string;
    path?: string;
    danger?: boolean;
};

export const profileMenuNew: readonly ProfileMenuItem[] = [
    {
        name: "My Profile",
        icon: "User",
        path: "/profile",
        group: "Account",
    },
    {
        name: "Account Settings",
        icon: "Settings",
        path: "/account/settings",
        group: "Account",
    },
    {
        name: "Appearance",
        icon: "Sun",
        path: "/preferences/theme",
        group: "Preferences",
    },
    {
        name: "Language & Region",
        icon: "Globe",
        path: "/preferences/language",
        group: "Preferences",
    },
    {
        name: "Notifications",
        icon: "Bell",
        path: "/preferences/notifications",
        group: "Preferences",
    },

    // 🔹 Security
    {
        name: "Change Password",
        icon: "KeyRound",
        path: "/security/password",
        group: "Security",
    },
    {
        name: "Two-Factor Authentication",
        icon: "ShieldAlert",
        path: "/security/2fa",
        group: "Security",
    },
    {
        name: "Active Sessions",
        icon: "Activity",
        path: "/security/sessions",
        group: "Security",
    },
    {
        name: "API Keys",
        icon: "Key",
        path: "/security/api-keys",
        group: "Security",
    },

    // 🔹 Billing
    {
        name: "Billing & Plans",
        icon: "CreditCard",
        path: "/billing",
        group: "Billing",
    },
    {
        name: "Invoices",
        icon: "File",
        path: "/billing/invoices",
        group: "Billing",
    },
    {
        name: "Usage & Limits",
        icon: "BarChart3",
        path: "/billing/usage",
        group: "Billing",
    },

    // 🔹 Support
    {
        name: "Help Center",
        icon: "HelpCircle",
        path: "/support",
        group: "Support",
    },
    {
        name: "Contact Support",
        icon: "LifeBuoy",
        path: "/support/contact",
        group: "Support",
    },

    // 🔹 System
    {
        name: "Keyboard Shortcuts",
        icon: "List",
        path: "/shortcuts",
        group: "System",
    },

];

export const UserProfile = () => {
    const { user } = useAuth();
    const router = useRouter();

    const grouped = profileMenuNew.reduce<
        Record<string, ProfileMenuItem[]>
    >((acc, item) => {
        acc[item.group] ??= [];
        acc[item.group].push(item);
        return acc;
    }, {});

    const handleLogout = async () => {
        const response = await authLogoutUser();
        if (!response.success)
            toastError(response?.message || "Whoops! something went wrong");
        toastSuccess(response.message);
        setTimeout(() => router.push("/"), 400);

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 mr-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{user?.firstName?.[0]?.toLocaleUpperCase()}{user?.lastName?.[0]?.toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="font-medium">{user?.firstName} {user?.lastName}</span>
                        <span className="text-xs text-muted-foreground">
                            {user?.email}
                        </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(grouped).map(([group, items]) => (
                    <div key={group}>
                        {/* Group Label */}
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            {group}
                        </DropdownMenuLabel>

                        {items.map((menu) => (
                            <DropdownMenuItem className="text-[12px]"
                                key={menu.name}>
                                <NavIcon
                                    iconName={menu.icon}
                                    className="mr-2 h-4 w-4"
                                />
                                {menu.name}
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator />
                    </div>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                    <NavIcon iconName="LogOut" className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}