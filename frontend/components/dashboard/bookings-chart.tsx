"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";

const data = [
  { month: "Jan", bookings: 400 },
  { month: "Feb", bookings: 620 },
  { month: "Mar", bookings: 800 },
  { month: "Apr", bookings: 700 },
  { month: "May", bookings: 950 },
  { month: "Jun", bookings: 1100 },
];

export default function BookingsChart() {
  return (
    <motion.div variants={item}>
      <Card className="bg-gray-900 text-white h-full">
        <CardHeader>
          <CardTitle>Bookings Trend</CardTitle>
          <p className="text-sm text-gray-400">
            Monthly bookings with growth trend
          </p>
        </CardHeader>

        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Gradient Fill */}
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

              {/* Axes */}
              <XAxis dataKey="month" stroke="#D1D5DB" tickLine={false} />
              <YAxis stroke="#D1D5DB" tickLine={false} axisLine={false} />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: 8,
                  border: "none",
                  color: "#F9FAFB",
                  padding: "10px",
                }}
                itemStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
                cursor={{ stroke: "#4F46E5", strokeWidth: 2 }}
              />

              {/* Line */}
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#4F46E5"
                strokeWidth={3}
                fill="url(#lineGradient)"
                dot={{ r: 5, fill: "#4F46E5", strokeWidth: 0 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
