"use client"
import { navigationIcon } from "./navigation-icon";
export const navigationMenuList = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: navigationIcon.Home,
  },
  {
    name: "Bookings",
    icon: navigationIcon.Calendar,
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
    icon: navigationIcon.Users,
    children: [
      { name: "All Customers", href: "/dashboard/customers" },
      { name: "VIP Customers", href: "/dashboard/customers/vip" },
      { name: "Customer Reviews", href: "/dashboard/customers/reviews" },
    ],
  },
  {
    name: "Services",
    icon: navigationIcon.ClipboardList,
    children: [
      { name: "All Services", href: "/dashboard/services" },
      { name: "Service Categories", href: "/dashboard/services/categories" },
      { name: "Add Service", href: "/dashboard/services/create" },
    ],
  },
  {
    name: "Locations",
    icon: navigationIcon.MapPin,
    children: [
      { name: "Branches", href: "/dashboard/locations/branches" },
      { name: "Working Hours", href: "/dashboard/locations/hours" },
    ],
  },
  {
    name: "Staff",
    icon: navigationIcon.UserCog,
    children: [
      { name: "Employees", href: "/dashboard/staff" },
      { name: "Roles & Permissions", href: "/dashboard/staff/roles" },
      { name: "Attendance", href: "/dashboard/staff/attendance" },
    ],
  },
  {
    name: "Finance",
    icon: navigationIcon.Wallet,
    children: [
      { name: "Payments", href: "/dashboard/finance/payments" },
      { name: "Invoices", href: "/dashboard/finance/invoices" },
      { name: "Refunds", href: "/dashboard/finance/refunds" },
    ],
  },
  {
    name: "Offers",
    icon: navigationIcon.Percent,
    children: [
      { name: "Coupons", href: "/dashboard/offers/coupons" },
      { name: "Discount Rules", href: "/dashboard/offers/discounts" },
    ],
  },
  {
    name: "Subscriptions",
    icon: navigationIcon.CreditCard,
    href: "/dashboard/subscriptions",
  },
  {
    name: "Reviews",
    icon: navigationIcon.Star,
    href: "/dashboard/reviews",
  },
  {
    name: "Reports",
    icon: navigationIcon.BarChart3,
    children: [
      { name: "Booking Report", href: "/dashboard/reports/bookings" },
      { name: "Revenue Report", href: "/dashboard/reports/revenue" },
      { name: "Customer Report", href: "/dashboard/reports/customers" },
    ],
  },
  {
    name: "Notifications",
    icon: navigationIcon.Bell,
    href: "/dashboard/notifications",
  },
  {
    name: "CMS",
    icon: navigationIcon.FileText,
    children: [
      { name: "Pages", href: "/dashboard/cms/pages" },
      { name: "FAQs", href: "/dashboard/cms/faqs" },
      { name: "Banners", href: "/dashboard/cms/banners" },
    ],
  },
  {
    name: "Integrations",
    icon: navigationIcon.Layers,
    href: "/dashboard/integrations",
  },
  {
    name: "Security",
    icon: navigationIcon.Shield,
    href: "/dashboard/security",
  },
  {
    name: "Settings",
    icon: navigationIcon.Settings,
    href: "/dashboard/settings",
  },
];