import { Trophy } from "lucide-react";
import { analyticsData } from "@/data/analytics";

export default function TopTurfs() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Top Performing Turfs
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Ranked by revenue and occupancy
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
          <Trophy size={22} />
        </div>
      </div>

      <div className="space-y-4">
        {analyticsData.topTurfs.map((turf, index) => (
          <div
            key={turf.name}
            className="rounded-3xl bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-sm">
                  #{index + 1}
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-950">
                    {turf.name}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    {turf.location} · {turf.bookings} bookings
                  </p>
                </div>
              </div>

              <p className="text-sm font-black text-emerald-600">
                ₹{turf.revenue.toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                <span>Occupancy</span>
                <span>{turf.occupancy}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${turf.occupancy}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}