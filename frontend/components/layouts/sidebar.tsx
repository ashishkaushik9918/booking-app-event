/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { navigationMenuList } from "@/config/navigation-menu";
import {
  Home,
  Calendar,
  Users,
  ClipboardList,
  Wallet,
  Percent,
  Bell,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  MapPin,
  UserCog,
  Shield,
  CreditCard,
  Layers,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Bookings",
    icon: Calendar,
    children: [
      { name: "All Bookings", href: "/dashboard/bookings" },
      { name: "Create Booking", href: "/dashboard/bookings/create" },
      { name: "Pending", href: "/dashboard/bookings/pending" },
      { name: "Cancelled", href: "/dashboard/bookings/cancelled" },
      { name: "Completed", href: "/dashboard/bookings/completed" },
    ],
  },
  {
    name: "Customers",
    icon: Users,
    children: [
      { name: "All Customers", href: "/dashboard/customers" },
      { name: "VIP Customers", href: "/dashboard/customers/vip" },
      { name: "Customer Reviews", href: "/dashboard/customers/reviews" },
    ],
  },
  {
    name: "Services",
    icon: ClipboardList,
    children: [
      { name: "All Services", href: "/dashboard/services" },
      { name: "Service Categories", href: "/dashboard/services/categories" },
      { name: "Add Service", href: "/dashboard/services/create" },
    ],
  },
  {
    name: "Locations",
    icon: MapPin,
    children: [
      { name: "Branches", href: "/dashboard/locations/branches" },
      { name: "Working Hours", href: "/dashboard/locations/hours" },
    ],
  },
  {
    name: "Staff",
    icon: UserCog,
    children: [
      { name: "Employees", href: "/dashboard/staff" },
      { name: "Roles & Permissions", href: "/dashboard/staff/roles" },
      { name: "Attendance", href: "/dashboard/staff/attendance" },
    ],
  },
  {
    name: "Finance",
    icon: Wallet,
    children: [
      { name: "Payments", href: "/dashboard/finance/payments" },
      { name: "Invoices", href: "/dashboard/finance/invoices" },
      { name: "Refunds", href: "/dashboard/finance/refunds" },
    ],
  },
  {
    name: "Offers",
    icon: Percent,
    children: [
      { name: "Coupons", href: "/dashboard/offers/coupons" },
      { name: "Discount Rules", href: "/dashboard/offers/discounts" },
    ],
  },
  {
    name: "Subscriptions",
    icon: CreditCard,
    href: "/dashboard/subscriptions",
  },
  {
    name: "Reviews",
    icon: Star,
    href: "/dashboard/reviews",
  },
  {
    name: "Reports",
    icon: BarChart3,
    children: [
      { name: "Booking Report", href: "/dashboard/reports/bookings" },
      { name: "Revenue Report", href: "/dashboard/reports/revenue" },
      { name: "Customer Report", href: "/dashboard/reports/customers" },
    ],
  },
  {
    name: "Notifications",
    icon: Bell,
    href: "/dashboard/notifications",
  },
  {
    name: "CMS",
    icon: FileText,
    children: [
      { name: "Pages", href: "/dashboard/cms/pages" },
      { name: "FAQs", href: "/dashboard/cms/faqs" },
      { name: "Banners", href: "/dashboard/cms/banners" },
    ],
  },
  {
    name: "Integrations",
    icon: Layers,
    href: "/dashboard/integrations",
  },
  {
    name: "Security",
    icon: Shield,
    href: "/dashboard/security",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-background",
        !mobile && "hidden md:flex md:w-64",
        mobile && "w-full"
      )}
    >
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b">
       <img src="https://storage.justwravel.com/remote-public/logo/JW-logo-dark.png" alt="logo" width={160} />
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto sidebar-scroll">
        {menu.map((item) =>
          item.children ? (
            <SubMenu key={item.name} item={item} pathname={pathname} />
          ) : (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname === item.href &&
                  "bg-muted font-semibold text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}

function SubMenu({ item, pathname }: { item: any; pathname: string }) {
  const [open, setOpen] = useState(
    item.children.some((sub: any) => sub.href === pathname)
  );

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
          open && "bg-muted font-semibold text-primary"
        )}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {item.name}
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-1 space-y-1 overflow-hidden"
          >
            {item.children.map((sub: any) => (
              <Link
                key={sub.name}
                href={sub.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm hover:bg-muted",
                  pathname === sub.href &&
                    "bg-muted font-semibold text-primary"
                )}
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
