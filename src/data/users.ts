import { User } from "@/types/user";

export const users: User[] = [
  {
    id: 1,
    name: "Mohammed Haris",
    email: "haris@gmail.com",
    phone: "+91 9876543210",
    role: "Admin",
    joinedDate: "2025-01-15",
    bookings: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Arjun Krishna",
    email: "arjun@gmail.com",
    phone: "+91 9999999999",
    role: "Premium",
    joinedDate: "2025-02-20",
    bookings: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Nair",
    email: "rahul@gmail.com",
    phone: "+91 8888888888",
    role: "Customer",
    joinedDate: "2025-03-12",
    bookings: 4,
    status: "Blocked",
  },
];