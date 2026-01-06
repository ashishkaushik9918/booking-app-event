"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { item } from "@/lib/motion";

const bookings = [
  { id: "#BK001", customer: "Rahul", service: "Haircut", status: "Completed" },
  { id: "#BK002", customer: "Anita", service: "Spa", status: "Pending" },
  { id: "#BK003", customer: "Amit", service: "Massage", status: "Cancelled" },
  { id: "#BK004", customer: "Neha", service: "Facial", status: "Completed" },
  { id: "#BK005", customer: "Rohan", service: "Haircut", status: "Completed" },
  { id: "#BK006", customer: "Simran", service: "Spa", status: "Pending" },
  { id: "#BK007", customer: "Vikram", service: "Massage", status: "Completed" },
  { id: "#BK008", customer: "Priya", service: "Facial", status: "Cancelled" },
  { id: "#BK009", customer: "Aakash", service: "Haircut", status: "Completed" },
  { id: "#BK010", customer: "Divya", service: "Spa", status: "Pending" },
  { id: "#BK011", customer: "Karan", service: "Massage", status: "Completed" },
  { id: "#BK012", customer: "Shreya", service: "Facial", status: "Completed" },
  { id: "#BK013", customer: "Ankit", service: "Haircut", status: "Cancelled" },
  { id: "#BK014", customer: "Sneha", service: "Spa", status: "Completed" },
  { id: "#BK015", customer: "Rahul", service: "Massage", status: "Pending" },
  { id: "#BK016", customer: "Anita", service: "Facial", status: "Completed" },
  { id: "#BK017", customer: "Amit", service: "Haircut", status: "Completed" },
  { id: "#BK018", customer: "Neha", service: "Spa", status: "Pending" },
  { id: "#BK019", customer: "Rohan", service: "Massage", status: "Completed" },
  { id: "#BK020", customer: "Simran", service: "Facial", status: "Cancelled" },
];


const statusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500 text-white";
    case "Pending":
      return "bg-yellow-500 text-black";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default function RecentBookings() {
  return (
    <motion.div variants={item}>
      <Card className="">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <p className="text-sm text-gray-400">
            Latest 20 bookings from customers
          </p>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table className="">
              <TableHeader>
                <TableRow className="">
                  <TableHead className=" cursor-pointer">Booking ID</TableHead>
                  <TableHead className=" cursor-pointer">Customer</TableHead>
                  <TableHead className=" cursor-pointer">Service</TableHead>
                  <TableHead className=" cursor-pointer">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((b) => (
                  <TableRow
                    key={b.id}
                    className=" transition-colors"
                  >
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.customer}</TableCell>
                    <TableCell>{b.service}</TableCell>
                    <TableCell>
                      <Badge className={statusColor(b.status)}>{b.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
