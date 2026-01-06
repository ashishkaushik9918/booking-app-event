/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";
const data = [
  { month: "Jan", customers: 800 },
  { month: "Feb", customers: 1200 },
  { month: "Mar", customers: 1800 },
  { month: "Apr", customers: 2500 },
  { month: "May", customers: 3200 },
  { month: "Jun", customers: 3900 },
  { month: "Jul", customers: 4500 },
  { month: "Aug", customers: 5200 },
  { month: "Sep", customers: 6000 },
  { month: "Oct", customers: 6800 },
  { month: "Nov", customers: 7500 },
  { month: "Dec", customers: 8200 },
];

export default function CustomerGrowth() {
  return (
    <motion.div variants={item}>
      <Card className="h-full bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Customer Growth</CardTitle>
          <p className="text-sm text-gray-400">
            Monthly new customer acquisition
          </p>
        </CardHeader>

        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              {/* Gradient area */}
              <defs>
                <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

              {/* Axes */}
              <XAxis dataKey="month" stroke="#D1D5DB" tickLine={false} />
              <YAxis
                stroke="#D1D5DB"
                tickFormatter={(value) =>
                  `${value.toLocaleString()}`
                }
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: 8,
                  border: "none",
                  padding: "10px",
                  color: "#F9FAFB",
                }}
                formatter={(value: any) => [`${value}`, "Customers"]}
              />

              {/* Area + Line */}
              <Area
                type="monotone"
                dataKey="customers"
                stroke="#4F46E5"
                strokeWidth={3}
                fill="url(#colorCustomers)"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
