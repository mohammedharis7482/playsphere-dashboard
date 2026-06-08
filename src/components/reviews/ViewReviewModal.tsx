"use client";

import { Star } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Review } from "@/types/review";
import ReviewStatusBadge from "./ReviewStatusBadge";

interface Props {
  open: boolean;
  onClose: () => void;
  review: Review | null;
}

export default function ViewReviewModal({
  open,
  onClose,
  review,
}: Props) {
  if (!review) return null;

  return (
    <Modal open={open} onClose={onClose} title="Review Details">
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-4 flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                fill={
                  index < review.rating
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <h3 className="text-2xl font-black text-slate-950">
            {review.customerName}
          </h3>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            {review.turfName}
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {review.comment}
          </p>

          <div className="mt-4 flex gap-2">
            <ReviewStatusBadge status={review.status} />

            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
              {review.date}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}