import { Booking } from "@/types/booking";

export const bookings: Booking[] = [
  {
    id: "1001",
    customerName: "Rahul Kumar",
    customerPhone: "9876543210",
    turfName: "Football Turf A",

    date: "2026-06-15",

    startTime: "06:00 PM",
    endTime: "07:00 PM",
    duration: 1,

    amount: 1200,

    paymentStatus: "PAID",
    status: "CONFIRMED",

    createdAt: "2026-06-10",
  },

  {
    id: "1002",
    customerName: "Arjun Nair",
    customerPhone: "9876543211",
    turfName: "Cricket Turf",

    date: "2026-06-16",

    startTime: "08:00 PM",
    endTime: "10:00 PM",
    duration: 2,

    amount: 1500,

    paymentStatus: "PENDING",
    status: "PENDING",

    createdAt: "2026-06-10",
  },

  {
    id: "1003",
    customerName: "Mohammed Ali",
    customerPhone: "9876543212",
    turfName: "Football Turf B",

    date: "2026-06-16",

    startTime: "07:00 PM",
    endTime: "08:00 PM",
    duration: 1,

    amount: 1300,

    paymentStatus: "PAID",
    status: "COMPLETED",

    createdAt: "2026-06-11",
  },

  {
    id: "1004",
    customerName: "Vishnu Das",
    customerPhone: "9876543213",
    turfName: "Badminton Court",

    date: "2026-06-17",

    startTime: "05:00 PM",
    endTime: "06:00 PM",
    duration: 1,

    amount: 800,

    paymentStatus: "PENDING",
    status: "CANCELLED",

    createdAt: "2026-06-12",
  },

  {
    id: "1005",
    customerName: "Akash Menon",
    customerPhone: "9876543214",
    turfName: "Football Turf A",

    date: "2026-06-18",

    startTime: "09:00 PM",
    endTime: "10:00 PM",
    duration: 1,

    amount: 1400,

    paymentStatus: "PAID",
    status: "CONFIRMED",

    createdAt: "2026-06-13",
  },
];