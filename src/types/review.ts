export type ReviewStatus =
  | "Approved"
  | "Pending"
  | "Flagged";

export interface Review {
  id: number;
  customerName: string;
  turfName: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  date: string;
}