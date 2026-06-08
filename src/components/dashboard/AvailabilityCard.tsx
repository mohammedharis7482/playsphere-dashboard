import { turfAvailability } from "@/data/dashboardData";

export default function AvailabilityCard() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        Turf Availability
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Current availability overview.
      </p>

      <div className="mt-6 space-y-6">
        {turfAvailability.map((turf) => (
          <div key={turf.name}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-black text-slate-800">
                {turf.name}
              </p>

              <p className="text-sm font-black text-emerald-600">
                {turf.availability}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${turf.availability}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}