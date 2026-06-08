export type TurfStatus =
  | "Available"
  | "Busy"
  | "Maintenance"
  | "Unavailable";

export interface Turf {
  id: number;
  name: string;
  location: string;
  type: string;
  status: TurfStatus;
  image: string;
  bookings: number;
  revenue: number;
  occupancy: number;
  availability: number;
  createdAt: string;
}