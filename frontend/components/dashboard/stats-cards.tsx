"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Wallet, Percent } from "lucide-react";
import { container, item, cardHover } from "@/lib/motion";

const stats = [
  { title: "Total Bookings", value: "12,450", icon: Calendar },
  { title: "Active Customers", value: "3,240", icon: Users },
  { title: "Revenue", value: "₹8.2L", icon: Wallet },
  { title: "Conversion Rate", value: "18%", icon: Percent },
];

export default function StatsCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.title}
          variants={item}
          whileHover="hover"
        >
          <motion.div variants={container}>
            <Card className="cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold">
                    {stat.value}
                  </h3>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
