import { Turf } from "@/types/turf";

interface Props {
  turfs: Turf[];
}

export default function TurfPerformanceTable({ turfs }: Props) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-xl font-black text-slate-950">
          Turf Performance
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Booking, revenue and occupancy comparison
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4">Turf</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Bookings</th>
              <th className="px-6 py-4">Revenue</th>
              <th className="px-6 py-4">Occupancy</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {turfs.map((turf) => (
              <tr key={turf.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-5">
                  <h4 className="font-black text-slate-950">{turf.name}</h4>
                  <p className="text-sm text-slate-500">{turf.location}</p>
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                    {turf.status}
                  </span>
                </td>

                <td className="px-6 py-5 font-bold text-slate-700">
                  {turf.bookings}
                </td>

                <td className="px-6 py-5 font-black text-emerald-600">
                  ₹{turf.revenue.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${turf.occupancy}%` }}
                      />
                    </div>

                    <span className="text-sm font-black">
                      {turf.occupancy}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}