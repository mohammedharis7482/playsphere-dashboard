import { Turf } from "@/types/turf";

interface Props {
  turfs: Turf[];
}

export default function TurfAvailability({ turfs }: Props) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">
          Turf Availability
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Live slot availability overview
        </p>
      </div>

      <div className="space-y-5">
        {turfs.map((turf) => (
          <div key={turf.id}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {turf.name}
                </h4>
                <p className="text-xs text-slate-500">{turf.location}</p>
              </div>

              <span className="text-sm font-black text-slate-950">
                {turf.availability}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${turf.availability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}