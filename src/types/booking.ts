export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export interface Booking {
  id: string;

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