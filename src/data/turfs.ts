import { Turf } from "@/types/turf";

export const turfs: Turf[] = [
  {
    id: 1,
    name: "PlaySphere Arena",
    location: "Calicut",
    type: "Football",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
    bookings: 84,
    revenue: 54000,
    occupancy: 88,
    availability: 85,
    createdAt: "2026-06-01",
  },
  {
    id: 2,
    name: "Elite Football Turf",
    location: "Kochi",
    type: "Football",
    status: "Busy",
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80",
    bookings: 72,
    revenue: 42000,
    occupancy: 79,
    availability: 70,
    createdAt: "2026-06-02",
  },
  {
    id: 3,
    name: "Champion Cricket Ground",
    location: "Malappuram",
    type: "Cricket",
    status: "Unavailable",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
    bookings: 96,
    revenue: 75000,
    occupancy: 92,
    availability: 0,
    createdAt: "2026-06-03",
  },
];