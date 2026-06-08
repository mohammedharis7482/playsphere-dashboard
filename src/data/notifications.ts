import { AppNotification } from "../types/notification";

export const notifications: AppNotification[] = [
  {
    id: 1,
    title: "New booking received",
    description: "Rahul Kumar booked Football Turf A.",
    type: "Booking",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Payment successful",
    description: "₹1,200 received through UPI.",
    type: "Payment",
    time: "8 min ago",
    read: false,
  },
  {
    id: 3,
    title: "New user registered",
    description: "Akash Menon joined PlaySphere.",
    type: "User",
    time: "15 min ago",
    read: false,
  },
  {
    id: 4,
    title: "Maintenance alert",
    description: "Champion Cricket Ground marked unavailable.",
    type: "Turf",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 5,
    title: "Monthly report generated",
    description: "Analytics report is ready for export.",
    type: "System",
    time: "2 hours ago",
    read: true,
  },
];