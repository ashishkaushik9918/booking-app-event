import BookingTable, { Booking } from "./_components/table/BookingTable";

const bookings: Booking[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    eventDate: "2026-01-10",
    eventTime: "10:00",
    guests: 5,
    address: "123 Street, City",
    specialRequests: "Vegetarian",
    attachment: "/files/booking1.pdf",
    status: "Pending",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "9876543210",
    eventDate: "2026-01-15",
    eventTime: "14:00",
    guests: 3,
    address: "456 Avenue, City",
    status: "Confirmed",
  },
];

export const metadata = {
  title:"Booking List"
}
export default function Page() {


  return <BookingTable data={bookings} />;
}
