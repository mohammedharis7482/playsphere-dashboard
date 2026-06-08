export type UserStatus = "Active" | "Blocked";
export type UserRole = "Customer" | "Premium" | "Admin";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  joinedDate: string;
  bookings: number;
  status: UserStatus;
}