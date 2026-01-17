"use client";
import { motion } from "framer-motion";
import { container, item } from "@/lib/motion";
import StatsCards from "@/components/dashboard/stats-cards";
import BookingTrend from "@/components/dashboard/bookings-chart";
import RevenueRefundChart from "@/components/dashboard/revenue-chart";
import ServicePie from "@/components/dashboard/ServicePie";
import PaymentDonut from "@/components/dashboard/PaymentDonut";
import CustomerGrowth from "@/components/dashboard/customer-growth";
import BookingHeatmap from "@/components/dashboard/booking-heatmap";
import RecentBookings from "@/components/dashboard/recent-bookings";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
export default function DashboardPage() {
  const socket = useSocket();
 

  const handleLeadCreate = (payload: any) => {
    console.log(payload, "payload")
  

   
  }
 useEffect(() => {
  if (!socket) return;

  socket.on("lead:created", handleLeadCreate);

  return () => {
    socket.off("lead:created", handleLeadCreate);
  };
}, [socket]);
  return (

    <>
     <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 px-2 sm:px-2 lg:px-2 py-3"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Dashboard Overview ewhgweh
        </h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Business performance & real-time analytics
        </p>
      </motion.div>
      <motion.div variants={item}>
        <StatsCards />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <BookingTrend />
        <RevenueRefundChart />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <ServicePie />
        <PaymentDonut />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <CustomerGrowth />
        <BookingHeatmap />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentBookings />
      </div>
    </motion.div>
    </>
  );
}
