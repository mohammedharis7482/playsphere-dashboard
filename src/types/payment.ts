export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type PaymentMethod = "UPI" | "Card" | "Cash" | "Wallet";

export interface Payment {
  id: number;
  transactionId: string;
  customerName: string;
  turfName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  createdAt: string;
}