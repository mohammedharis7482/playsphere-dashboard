"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";

type DashboardStats = {
  totalRevenue: number;
  totalBookings: number;
  totalCustomers: number;
  activeTurfs: number;
};

type DashboardResponse = {
  success: boolean;
  stats: DashboardStats;
};

const statMeta = [
  {
    title: "Total Revenue",
    key: "totalRevenue",
    icon: IndianRupee,
    color: "bg-emerald-50 text-emerald-600",
    growth: "+18%",
    note: "from paid payments",
  },
  {
    title: "Total Bookings",
    key: "totalBookings",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600",
    growth: "+12%",
    note: "all booking records",
  },
  {
    title: "Total Customers",
    key: "totalCustomers",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
    growth: "+9%",
    note: "registered customers",
  },
  {
    title: "Active Turfs",
    key: "activeTurfs",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600",
    growth: "Live",
    note: "available turfs",
  },
] as const;

function formatValue(key: keyof DashboardStats, value: number) {
  if (key === "totalRevenue") {
    return `₹${value.toLocaleString("en-IN")}`;
  }

  return value.toString();
}

export default function StatsOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/dashboard", {
          credentials: "include",
        });

        const data: DashboardResponse = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("FAILED_TO_FETCH_DASHBOARD_STATS", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statMeta.map((stat) => (
          <div
            key={stat.title}
            className="h-[168px] animate-pulse rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statMeta.map((stat) => {
        const Icon = stat.icon;
        const key = stat.key as keyof DashboardStats;
        const value = stats ? stats[key] : 0;

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
                  {formatValue(key, value)}
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    {stat.growth}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    {stat.note}
                  </span>
                </div>
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