
"use client";

import { Calendar, Badge, Card, List, Drawer, Tag } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState } from "react";
export type Booking = {
  id: string;
  title: string;
  date: string;        // YYYY-MM-DD
  startTime: string;
  endTime: string;
  customer: string;
  status: "confirmed" | "pending" | "cancelled";
};

export const bookings: Booking[] = [
  {
    id: "1",
    title: "Room Booking",
    date: "2026-01-18",
    startTime: "10:00",
    endTime: "11:00",
    customer: "John Doe",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Consultation",
    date: "2026-01-18",
    startTime: "14:00",
    endTime: "15:30",
    customer: "Alice Smith",
    status: "pending",
  },
  {
    id: "3",
    title: "Maintenance",
    date: "2026-01-20",
    startTime: "09:00",
    endTime: "10:00",
    customer: "System",
    status: "cancelled",
  },
];

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  // Filter bookings by selected date
  const dayBookings = bookings.filter(
    (b) => b.date === selectedDate.format("YYYY-MM-DD")
  );

  function dateCellRender(value: Dayjs) {
    const listData = bookings.filter(
      (b) => b.date === value.format("YYYY-MM-DD")
    );

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={
                item.status === "confirmed"
                  ? "success"
                  : item.status === "pending"
                  ? "warning"
                  : "error"
              }
              text={item.title}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* 📅 Calendar */}
      <div className="col-span-8">
        <Card title="Booking Calendar">
          <Calendar
            value={selectedDate}
            onSelect={setSelectedDate}
            cellRender={dateCellRender}
          />
        </Card>
      </div>

      {/* 📋 Booking List */}
      <div className="col-span-4">
        <Card title={`Bookings on ${selectedDate.format("DD MMM YYYY")}`}>
          <List
            dataSource={dayBookings}
            locale={{ emptyText: "No bookings" }}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedBooking(item)}
              >
                <List.Item.Meta
                  title={item.title}
                  description={`${item.startTime} - ${item.endTime}`}
                />
                <Tag
                  color={
                    item.status === "confirmed"
                      ? "green"
                      : item.status === "pending"
                      ? "orange"
                      : "red"
                  }
                >
                  {item.status}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* 📄 Booking Details Drawer */}
      <Drawer
        title="Booking Details"
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        width={420}
      >
        {selectedBooking && (
          <div className="space-y-2">
            <p><strong>Title:</strong> {selectedBooking.title}</p>
            <p><strong>Customer:</strong> {selectedBooking.customer}</p>
            <p>
              <strong>Date:</strong>{" "}
              {dayjs(selectedBooking.date).format("DD MMM YYYY")}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {selectedBooking.startTime} - {selectedBooking.endTime}
            </p>
            <Tag color="blue">{selectedBooking.status}</Tag>
          </div>
        )}
      </Drawer>
    </div>
  );
}
