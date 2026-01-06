"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";

// Example weekly booking data (replace with API)
const data = [
  { day: "Mon", bookings: 120 },
  { day: "Tue", bookings: 180 },
  { day: "Wed", bookings: 150 },
  { day: "Thu", bookings: 210 },
  { day: "Fri", bookings: 260 },
  { day: "Sat", bookings: 320 },
  { day: "Sun", bookings: 280 },
];

export default function BookingHeatmap() {
  return (
    <motion.div variants={item}>
      <Card className="h-full bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Weekly Booking Heatmap</CardTitle>
          <p className="text-sm text-gray-400">
            Booking activity throughout the week
          </p>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {/* Gradient fill */}
              <defs>
                <linearGradient id="colorBookingsGray" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#A78BFA" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

              {/* Axes */}
              <XAxis
                dataKey="day"
                stroke="#D1D5DB" // light gray
                tickLine={false}
              />
              <YAxis
                stroke="#D1D5DB"
                tickLine={false}
                axisLine={false}
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8, border: "none", color: "#F9FAFB" }}
                itemStyle={{ color: "#F9FAFB" }}
                cursor={{ fill: "rgba(255,255,255,0.1)" }}
              />

              {/* Area */}
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#A78BFA" // violet accent
                fill="url(#colorBookingsGray)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#A78BFA" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
