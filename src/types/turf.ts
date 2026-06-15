export type TurfStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export interface Turf {
  id: string;
  name: string;
  location: string;
  type: string;
  status: TurfStatus;
  image: string;
  price: number;
  revenue: number;
  bookings: number;
  occupancy: number;
  availability: number;
  rating: number;
  createdAt: string;
}