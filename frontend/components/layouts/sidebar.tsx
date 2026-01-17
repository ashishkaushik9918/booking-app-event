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
  // 📊 Core
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },

  // 📅 Bookings Management
{
  name: "Events & Bookings",
  icon: Calendar,
  children: [
    // 🎉 Event Management
    { name: "All Events", href: "/dashboard/events" },
    { name: "Create Event", href: "/dashboard/events/create" },
    { name: "Event Categories", href: "/dashboard/events/categories" },
    { name: "Event Schedules", href: "/dashboard/events/schedules" },
    { name: "Event Pricing", href: "/dashboard/events/pricing" },
    { name: "Event Media", href: "/dashboard/events/media" },
    { name: "Event Policies", href: "/dashboard/events/policies" },

    // 📅 Bookings Management
    { name: "All Bookings", href: "/dashboard/bookings" },
    { name: "Create Booking", href: "/dashboard/bookings/create" },
    { name: "Pending Approval", href: "/dashboard/bookings/pending" },
    { name: "Confirmed", href: "/dashboard/bookings/confirmed" },
    { name: "Completed", href: "/dashboard/bookings/completed" },
    { name: "Cancelled", href: "/dashboard/bookings/cancelled" },
    { name: "Rescheduled", href: "/dashboard/bookings/rescheduled" },

    // 📊 Booking Tools
    { name: "Booking Calendar", href: "/dashboard/bookings/calendar" },
    { name: "Waitlist / Queue", href: "/dashboard/bookings/waitlist" },
    { name: "VIP / Special Bookings", href: "/dashboard/bookings/vip" },

    // 📄 Docs & Feedback
    { name: "Agreements", href: "/dashboard/bookings/contracts" },
    { name: "Attachments & Media", href: "/dashboard/bookings/attachments" },
    { name: "Customer Feedback", href: "/dashboard/bookings/feedback" },

    // 📈 Reports
    { name: "Booking Reports", href: "/dashboard/bookings/reports" },
  ],
},

  {
  name: "Trips",
  icon: MapPin,
  children: [
    // 🧳 Trip Management
    { name: "All Trips", href: "/dashboard/trips" },
    { name: "Create Trip", href: "/dashboard/trips/create" },
    { name: "Upcoming Trips", href: "/dashboard/trips/upcoming" },
    { name: "Ongoing Trips", href: "/dashboard/trips/ongoing" },
    { name: "Completed Trips", href: "/dashboard/trips/completed" },
    { name: "Cancelled Trips", href: "/dashboard/trips/cancelled" },

    // 📅 Scheduling
    { name: "Trip Calendar", href: "/dashboard/trips/calendar" },
    { name: "Batch & Slots", href: "/dashboard/trips/batches" },

    // 👥 Bookings & Participants
    { name: "Trip Bookings", href: "/dashboard/trips/bookings" },
    { name: "Participants", href: "/dashboard/trips/participants" },
    { name: "Waitlist", href: "/dashboard/trips/waitlist" },

    // 🏕 Logistics
    { name: "Itineraries", href: "/dashboard/trips/itineraries" },
    { name: "Pickup & Drop", href: "/dashboard/trips/pickup-drop" },
    { name: "Accommodation", href: "/dashboard/trips/accommodation" },
    { name: "Transport", href: "/dashboard/trips/transport" },
    { name: "Meals Plan", href: "/dashboard/trips/meals" },

    // 👨‍✈️ Team & Vendors
    { name: "Trip Leaders", href: "/dashboard/trips/leaders" },
    { name: "Vendors", href: "/dashboard/trips/vendors" },

    // 💰 Pricing & Policies
    { name: "Pricing", href: "/dashboard/trips/pricing" },
    { name: "Inclusions / Exclusions", href: "/dashboard/trips/inclusions" },
    { name: "Cancellation Policy", href: "/dashboard/trips/cancellation-policy" },
    { name: "Refund Rules", href: "/dashboard/trips/refunds" },

    // 📄 Documents & Safety
    { name: "Documents", href: "/dashboard/trips/documents" },
    { name: "Insurance", href: "/dashboard/trips/insurance" },
    { name: "Safety Guidelines", href: "/dashboard/trips/safety" },

    // ⭐ Reviews & Media
    { name: "Trip Reviews", href: "/dashboard/trips/reviews" },
    { name: "Gallery & Media", href: "/dashboard/trips/gallery" },

    // 📊 Analytics
    { name: "Trip Reports", href: "/dashboard/trips/reports" },
  ],
},

  // 👥 Customers CRM
  {
    name: "Customers",
    icon: Users,
    children: [
      { name: "All Customers", href: "/dashboard/customers" },
      { name: "Leads", href: "/dashboard/customers/leads" },
      { name: "VIP Customers", href: "/dashboard/customers/vip" },
      { name: "Customer Reviews", href: "/dashboard/customers/reviews" },
      { name: "Customer Timeline", href: "/dashboard/customers/activity" },
    ],
  },

  // 🧰 Services & Packages
  {
    name: "Services",
    icon: ClipboardList,
    children: [
      { name: "All Services", href: "/dashboard/services" },
      { name: "Service Categories", href: "/dashboard/services/categories" },
      { name: "Packages / Combos", href: "/dashboard/services/packages" },
      { name: "Add Service", href: "/dashboard/services/create" },
      { name: "Availability Rules", href: "/dashboard/services/availability" },
    ],
  },

  // 📍 Venues & Locations
  {
    name: "Venues",
    icon: MapPin,
    children: [
      { name: "Venues List", href: "/dashboard/venues" },
      { name: "Venue Pricing", href: "/dashboard/venues/pricing" },
      { name: "Blocked Dates", href: "/dashboard/venues/blocked-dates" },
      { name: "Working Hours", href: "/dashboard/venues/hours" },
    ],
  },

  // 👨‍💼 Staff & Vendors
  {
    name: "Staff & Vendors",
    icon: UserCog,
    children: [
      { name: "Employees", href: "/dashboard/staff" },
      { name: "Vendors", href: "/dashboard/vendors" },
      { name: "Roles & Permissions", href: "/dashboard/staff/roles" },
      { name: "Attendance", href: "/dashboard/staff/attendance" },
      { name: "Task Assignment", href: "/dashboard/staff/tasks" },
    ],
  },

  // 💰 Finance & Billing
  {
    name: "Finance",
    icon: Wallet,
    children: [
       { name: "Payments", href: "/dashboard/finance/payments" },
    { name: "Invoices", href: "/dashboard/finance/invoices" },
    { name: "Create Invoice", href: "/dashboard/finance/invoices/create" },
    { name: "Refunds", href: "/dashboard/finance/refunds" },
    { name: "Payouts", href: "/dashboard/finance/payouts" },
    { name: "Taxes & GST", href: "/dashboard/finance/taxes" },
    { name: "Invoice Reports", href: "/dashboard/finance/invoices/reports" },
    ],
  },

  // 🎟 Offers & Promotions
  {
    name: "Offers",
    icon: Percent,
    children: [
    { name: "Coupons", href: "/dashboard/offers/coupons" },          // Create/manage discount codes
    { name: "Discount Rules", href: "/dashboard/offers/discounts" }, // Set % or fixed discounts
    { name: "Referral Program", href: "/dashboard/offers/referrals" }, // Track referrals
    { name: "Flash Deals / Promotions", href: "/dashboard/offers/flash-deals" }, // Time-bound promotions
    { name: "Seasonal Offers", href: "/dashboard/offers/seasonal" }, // Festival / seasonal discounts
    { name: "Loyalty Rewards", href: "/dashboard/offers/loyalty" },  // Customer loyalty points
    { name: "Gift Vouchers", href: "/dashboard/offers/gift-vouchers" }, // Voucher system
    { name: "Bulk Discounts", href: "/dashboard/offers/bulk-discounts" }, // For group bookings
    { name: "Offer Reports", href: "/dashboard/offers/reports" },    // Analytics on offers
    ],
  },

  // 🔁 Subscriptions (SaaS / Clients)
  {
    name: "Subscriptions",
    icon: CreditCard,
    href: "/dashboard/subscriptions",
  },

  // ⭐ Reviews & Ratings
  {
    name: "Reviews",
    icon: Star,
    children: [
      { name: "All Reviews", href: "/dashboard/reviews" },
      { name: "Moderation", href: "/dashboard/reviews/moderation" },
    ],
  },

  // 📈 Reports & Analytics
  {
    name: "Reports",
    icon: BarChart3,
    children: [
      { name: "Booking Report", href: "/dashboard/reports/bookings" },
      { name: "Revenue Report", href: "/dashboard/reports/revenue" },
      { name: "Customer Insights", href: "/dashboard/reports/customers" },
      { name: "Staff Performance", href: "/dashboard/reports/staff" },
    ],
  },

  // 🔔 Notifications & Automation
  {
    name: "Automation",
    icon: Bell,
    children: [
      { name: "Notifications", href: "/dashboard/notifications" },
      { name: "Email Templates", href: "/dashboard/automation/emails" },
      { name: "WhatsApp / SMS", href: "/dashboard/automation/sms" },
      { name: "Workflow Rules", href: "/dashboard/automation/workflows" },
    ],
  },

  // 📄 CMS & Content
  {
    name: "CMS",
    icon: FileText,
    children: [
      { name: "Pages", href: "/dashboard/cms/pages" },
      { name: "FAQs", href: "/dashboard/cms/faqs" },
      { name: "Banners", href: "/dashboard/cms/banners" },
      { name: "Terms & Policies", href: "/dashboard/cms/policies" },
    ],
  },

  // 🔌 Integrations
  {
    name: "Integrations",
    icon: Layers,
    children: [
      { name: "Payment Gateways", href: "/dashboard/integrations/payments" },
      { name: "Google Calendar", href: "/dashboard/integrations/calendar" },
      { name: "Maps & Location", href: "/dashboard/integrations/maps" },
      { name: "Webhooks & API", href: "/dashboard/integrations/api" },
    ],
  },

  // 🔐 Security & Audit
  {
    name: "Security",
    icon: Shield,
    children: [
      { name: "Access Control", href: "/dashboard/security/access" },
      { name: "Login History", href: "/dashboard/security/logs" },
      { name: "Audit Logs", href: "/dashboard/security/audit" },
      { name: "2FA & Sessions", href: "/dashboard/security/sessions" },
    ],
  },

  // ⚙️ Settings
  {
    name: "Settings",
    icon: Settings,
    children: [
      { name: "Company Profile", href: "/dashboard/settings/company" },
      { name: "Booking Rules", href: "/dashboard/settings/bookings" },
      { name: "Payment Settings", href: "/dashboard/settings/payments" },
      { name: "System Preferences", href: "/dashboard/settings/system" },
    ],
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
                  "block rounded-md px-3 py-2 text-sm hover:bg-muted text-[13px]",
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
