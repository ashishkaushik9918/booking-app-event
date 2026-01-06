"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";

// Expanded 12 months data with realistic numbers
const data = [
  { month: "Jan", revenue: 120000, refunds: 8000 },
  { month: "Feb", revenue: 180000, refunds: 12000 },
  { month: "Mar", revenue: 240000, refunds: 15000 },
  { month: "Apr", revenue: 200000, refunds: 10000 },
  { month: "May", revenue: 260000, refunds: 18000 },
  { month: "Jun", revenue: 310000, refunds: 22000 },
  { month: "Jul", revenue: 350000, refunds: 25000 },
  { month: "Aug", revenue: 400000, refunds: 30000 },
  { month: "Sep", revenue: 370000, refunds: 27000 },
  { month: "Oct", revenue: 420000, refunds: 32000 },
  { month: "Nov", revenue: 480000, refunds: 35000 },
  { month: "Dec", revenue: 500000, refunds: 40000 },
];

export default function RevenueRefundChart() {
  return (
    <motion.div variants={item}>
      <Card className="bg-gray-900 text-white h-full">
        <CardHeader>
          <CardTitle>Revenue vs Refunds</CardTitle>
          <p className="text-sm text-gray-400">
            Monthly revenue and refund comparison
          </p>
        </CardHeader>

        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

              <XAxis dataKey="month" stroke="#D1D5DB" tickLine={false} />
              <YAxis
                stroke="#D1D5DB"
                tickFormatter={(value) =>
                  `₹${(value / 1000).toLocaleString()}k`
                }
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: 8,
                  border: "none",
                  color: "#F9FAFB",
                  padding: "10px",
                }}
                itemStyle={{ color: "#F9FAFB", fontWeight: "bold" }}
                cursor={{ fill: "rgba(255,255,255,0.1)" }}
              />

              <Bar
                dataKey="revenue"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="refunds"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
