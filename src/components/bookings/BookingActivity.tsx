"use client";

import {
  CalendarCheck,
  CircleDollarSign,
  Clock3,
  XCircle,
} from "lucide-react";

import { bookingActivities } from "@/data/bookingActivities";

export default function BookingActivity() {
  const getMeta = (type: string) => {
    switch (type) {
      case "confirmed":
        return {
          icon: CalendarCheck,
          style: "bg-emerald-50 text-emerald-600",
        };
      case "pending":
        return {
          icon: Clock3,
          style: "bg-yellow-50 text-yellow-600",
        };
      case "cancelled":
        return {
          icon: XCircle,
          style: "bg-red-50 text-red-600",
        };
      case "completed":
        return {
          icon: CircleDollarSign,
          style: "bg-blue-50 text-blue-600",
        };
      default:
        return {
          icon: CalendarCheck,
          style: "bg-slate-50 text-slate-600",
        };
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-black text-slate-950">
        Recent Activity
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Latest booking updates and actions
      </p>

      <div className="mt-6 space-y-4">
        {bookingActivities.map((activity) => {
          const meta = getMeta(activity.type);
          const Icon = meta.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-4 rounded-3xl bg-slate-50 p-4"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${meta.style}`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-black text-slate-950">
                    {activity.title}
                  </h4>

                  <span className="shrink-0 text-xs font-bold text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}