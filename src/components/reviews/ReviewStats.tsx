import {
  Clock,
  MessageSquare,
  Star,
  ThumbsUp,
} from "lucide-react";

import { Review } from "@/types/review";

interface Props {
  reviews: Review[];
  averageRating: number;
}

export default function ReviewStats({
  reviews,
  averageRating,
}: Props) {
  const positive = reviews.filter(
    (review) => review.rating >= 4
  ).length;

  const pending = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const stats = [
    {
      title: "Total Reviews",
      value: reviews.length,
      note: "Customer feedback",
      icon: MessageSquare,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Average Rating",
      value: averageRating,
      note: "Overall score",
      icon: Star,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Positive Reviews",
      value: positive,
      note: "4 stars and above",
      icon: ThumbsUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Reviews",
      value: pending,
      note: "Needs review",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </h3>

                <p className="mt-4 text-xs font-black text-emerald-600">
                  {stat.note}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}