import Link from "next/link";
import { Star } from "lucide-react";

export default function ReviewsPreview() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Customer Feedback
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest review performance.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
          <Star size={22} fill="currentColor" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Average Rating
          </span>
          <span className="text-xl font-black text-slate-950">
            4.7
          </span>
        </div>

        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Positive Reviews
          </span>
          <span className="text-xl font-black text-slate-950">
            487
          </span>
        </div>

        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Pending Reviews
          </span>
          <span className="text-xl font-black text-slate-950">
            12
          </span>
        </div>
      </div>

      <Link
        href="/dashboard/reviews"
        className="mt-6 flex h-12 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
      >
        View Reviews
      </Link>
    </div>
  );
}