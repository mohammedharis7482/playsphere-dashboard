import { IndianRupee, TrendingUp } from "lucide-react";

interface Props {
  revenue: number;
}

export default function BookingRevenueCard({ revenue }: Props) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            Revenue Overview
          </p>

          <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            ₹{revenue.toLocaleString()}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-600" />

            <span className="text-sm font-black text-emerald-600">
              +12.5%
            </span>

            <span className="text-sm text-slate-500">vs last month</span>
          </div>
        </div>

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
          <IndianRupee size={30} />
        </div>
      </div>
    </div>
  );
}