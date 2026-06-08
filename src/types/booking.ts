export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Paid";

export interface Booking {
  id: number;

  customerName: string;

  customerPhone: string;

  turfName: string;

  date: string;

  startTime: string;

  endTime: string;

  duration: number;

  amount: number;

  status: BookingStatus;

  paymentStatus: PaymentStatus;

  createdAt: string;
}