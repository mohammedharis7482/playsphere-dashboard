"use client";

import { useEffect, useState } from "react";

type RecentBooking = {
  id: string;
  status: string;
  createdAt: string;
  customer: {
    name: string;
  };
  turf: {
    name: string;
  };
};

type DashboardResponse = {
  success: boolean;
  recentBookings: RecentBooking[];
};

function formatTime(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/dashboard", {
          credentials: "include",
        });

        const data: DashboardResponse = await response.json();

        if (data.success) {
          setActivities(data.recentBookings);
        }
      } catch (error) {
        console.error("FAILED_TO_FETCH_ACTIVITY_FEED", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Latest platform activities.
      </p>

      <div className="mt-6 space-y-5">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[72px] animate-pulse rounded-3xl bg-slate-100"
              />
            ))}
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4 rounded-3xl bg-slate-50 p-4"
            >
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-500" />

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-black text-slate-950">
                  {activity.customer.name} booked {activity.turf.name}
                </h4>

                <p className="mt-1 text-xs font-bold text-slate-400">
                  {activity.status} • {formatTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}