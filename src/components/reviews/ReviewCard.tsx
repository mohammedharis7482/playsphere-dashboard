"use client";

import {
  Check,
  Eye,
  Star,
  Trash2,
} from "lucide-react";

import { Review } from "@/types/review";
import ReviewStatusBadge from "./ReviewStatusBadge";

interface Props {
  review: Review;
  onView: (review: Review) => void;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ReviewCard({
  review,
  onView,
  onApprove,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-lg font-black text-slate-950">
              {review.customerName}
            </h4>

            <ReviewStatusBadge status={review.status} />
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            {review.turfName}
          </p>

          <div className="mt-3 flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={17}
                fill={
                  index < review.rating
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
            {review.comment}
          </p>

          <p className="mt-3 text-xs font-bold text-slate-400">
            {review.date}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onView(review)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye size={18} />
          </button>

          {review.status !== "Approved" && (
            <button
              onClick={() => onApprove(review.id)}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Check size={18} />
            </button>
          )}

          <button
            onClick={() => onDelete(review.id)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}