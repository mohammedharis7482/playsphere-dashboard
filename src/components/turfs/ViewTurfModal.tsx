"use client";

import Image from "next/image";
import {
  BarChart3,
  CalendarDays,
  IndianRupee,
  MapPin,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Turf } from "@/types/turf";

interface Props {
  open: boolean;
  onClose: () => void;
  turf: Turf | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ViewTurfModal({
  open,
  onClose,
  turf,
  onEdit,
  onDelete,
}: Props) {
  if (!turf) return null;

  return (
    <Modal open={open} onClose={onClose} title="Turf Details">
      <div className="space-y-6">
        <div className="relative h-64 overflow-hidden rounded-[28px]">
          <Image
            src={turf.image}
            alt={turf.name}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-sm font-bold uppercase text-white/80">
              {turf.type}
            </p>

            <h2 className="mt-1 text-3xl font-black text-white">
              {turf.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <MapPin size={18} />
          {turf.location}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <CalendarDays className="text-blue-500" />
            <p className="mt-3 text-sm text-slate-500">
              Total Bookings
            </p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">
              {turf.bookings}
            </h3>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <IndianRupee className="text-emerald-500" />
            <p className="mt-3 text-sm text-slate-500">
              Revenue
            </p>
            <h3 className="mt-1 text-2xl font-black text-emerald-600">
              ₹{turf.revenue.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <BarChart3 className="text-purple-500" />
            <p className="mt-3 text-sm text-slate-500">
              Occupancy
            </p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">
              {turf.occupancy}%
            </h3>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <BarChart3 className="text-orange-500" />
            <p className="mt-3 text-sm text-slate-500">
              Availability
            </p>
            <h3 className="mt-1 text-2xl font-black text-slate-950">
              {turf.availability}%
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onEdit}
            className="flex-1 rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Edit Turf
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            Delete Turf
          </button>
        </div>
      </div>
    </Modal>
  );
}