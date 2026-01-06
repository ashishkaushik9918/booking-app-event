/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";

// Expanded and realistic service data
const data = [
  { name: "Haircut", value: 120 },
  { name: "Spa", value: 90 },
  { name: "Massage", value: 75 },
  { name: "Facial", value: 60 },
  { name: "Manicure", value: 50 },
  { name: "Pedicure", value: 40 },
  { name: "Hair Coloring", value: 30 },
  { name: "Waxing", value: 25 },
  { name: "Shaving", value: 20 },
  { name: "Other Services", value: 10 },
];

// Colors for slices
const COLORS = [
  "#4F46E5",
  "#6366F1",
  "#8B5CF6",
  "#A78BFA",
  "#F472B6",
  "#FB7185",
  "#FCD34D",
  "#34D399",
  "#22D3EE",
  "#60A5FA",
];

export default function ServicePie() {
  return (
    <motion.div variants={item}>
      <Card className="bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Top Services</CardTitle>
          <p className="text-sm text-gray-400">
            Most booked services in the last month
          </p>
        </CardHeader>

        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                label={({ name, percent }:any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: 8,
                  border: "none",
                  padding: "8px 12px",
                  color: "#F9FAFB",
                }}
                formatter={(value: any) => [`${value}`, "Bookings"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
