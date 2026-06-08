import { Crown } from "lucide-react";
import { Turf } from "@/types/turf";

interface Props {
  turfs: Turf[];
}

export default function RevenueLeaderboard({ turfs }: Props) {
  const sortedTurfs = [...turfs].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            Revenue Leaderboard
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Highest earning turfs
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
          <Crown size={22} />
        </div>
      </div>

      <div className="space-y-4">
        {sortedTurfs.map((turf, index) => (
          <div
            key={turf.id}
            className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-sm">
                #{index + 1}
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-950">
                  {turf.name}
                </h4>
                <p className="text-xs text-slate-500">{turf.type}</p>
              </div>
            </div>

            <p className="text-sm font-black text-emerald-600">
              ₹{turf.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}