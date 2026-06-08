export type NotificationType =
  | "Booking"
  | "Payment"
  | "User"
  | "Turf"
  | "System";

export interface AppNotification {
  id: number;
  title: string;
  description: string;
  type: NotificationType;
  time: string;
  read: boolean;
}