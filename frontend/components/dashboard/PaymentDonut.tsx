/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { item } from "@/lib/motion";

const data = [
  { name: "UPI", value: 45 },
  { name: "Card", value: 30 },
  { name: "Cash", value: 15 },
  { name: "Wallet", value: 10 },
  { name: "NetBanking", value: 8 },
  { name: "PayPal", value: 5 },
  { name: "Gift Card", value: 3 },
  { name: "EMI", value: 2 },
  { name: "Other", value: 1 },
];

// Vibrant color palette
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
];

export default function PaymentDonut() {
  return (
    <motion.div variants={item}>
      <Card className="bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <p className="text-sm text-gray-400">
            Distribution of payment methods in the last month
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
                  color: "#F9FAFB",
                  padding: "8px 12px",
                }}
                formatter={(value: any) => [`${value}`, "Transactions"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
