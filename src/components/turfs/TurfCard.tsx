import {
  BarChart3,
  Eye,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import { Turf } from "@/types/turf";

interface Props {
  turf: Turf;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const statusStyle = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-700",
  MAINTENANCE: "bg-orange-100 text-orange-700",
};

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function TurfCard({
  turf,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={turf.image}
          alt={turf.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase text-slate-700">
          {turf.type}
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${
            statusStyle[turf.status]
          }`}
        >
          {formatStatus(turf.status)}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white">{turf.name}</h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <MapPin size={16} />
          {turf.location}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Bookings</p>

            <h4 className="mt-1 text-lg font-black text-slate-950">
              {turf.bookings}
            </h4>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">Revenue</p>

            <h4 className="mt-1 text-lg font-black text-emerald-600">
              ₹{turf.revenue.toLocaleString("en-IN")}
            </h4>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1 text-slate-500">
              <BarChart3 size={14} />
              Occupancy
            </span>

            <span className="text-slate-950">{turf.occupancy}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${turf.occupancy}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-600"
          >
            <Eye size={16} />
            View Details
          </button>

          <button
            onClick={onEdit}
            className="rounded-2xl border border-slate-200 p-3 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-2xl border border-slate-200 p-3 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}