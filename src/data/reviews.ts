import { Review } from "@/types/review";

export const reviews: Review[] = [
  {
    id: 1,
    customerName: "Rahul Kumar",
    turfName: "PlaySphere Arena",
    rating: 5,
    comment: "Excellent turf quality and smooth booking experience.",
    status: "Approved",
    date: "2026-06-08",
  },
  {
    id: 2,
    customerName: "Arjun Nair",
    turfName: "Elite Football Turf",
    rating: 4,
    comment: "Good ground and lighting. Slight delay in slot start.",
    status: "Approved",
    date: "2026-06-07",
  },
  {
    id: 3,
    customerName: "Mohammed Ali",
    turfName: "Champion Cricket Ground",
    rating: 3,
    comment: "Ground was good but maintenance can be improved.",
    status: "Pending",
    date: "2026-06-06",
  },
  {
    id: 4,
    customerName: "Vishnu Das",
    turfName: "Badminton Court",
    rating: 2,
    comment: "Payment issue and support response was slow.",
    status: "Flagged",
    date: "2026-06-05",
  },
];