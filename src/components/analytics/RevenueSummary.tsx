import {
  IndianRupee,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { analyticsData } from "@/data/analytics";

export default function RevenueSummary() {
  const summary = [
    {
      label: "Total Revenue",
      value: `₹${analyticsData.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Monthly Revenue",
      value: `₹${analyticsData.monthlyRevenue.toLocaleString()}`,
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Growth",
      value: `+${analyticsData.revenueGrowth}%`,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        Revenue Summary
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Key financial performance overview
      </p>

      <div className="mt-6 space-y-4">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={20} />
                </div>

                <p className="text-sm font-bold text-slate-500">
                  {item.label}
                </p>
              </div>

              <p className="text-lg font-black text-slate-950">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}