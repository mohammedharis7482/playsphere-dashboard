"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Review } from "@/types/review";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: Review[];
  onView: (review: Review) => void;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ReviewList({
  reviews,
  onView,
  onApprove,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        review.customerName.toLowerCase().includes(searchValue) ||
        review.turfName.toLowerCase().includes(searchValue) ||
        review.comment.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" ? true : review.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, status]);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Recent Reviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[320px,150px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviews..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onView={onView}
              onApprove={onApprove}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="rounded-3xl bg-slate-50 py-16 text-center">
            <h3 className="text-xl font-black text-slate-950">
              No reviews found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}