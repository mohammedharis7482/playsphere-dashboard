"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Turf, TurfStatus } from "@/types/turf";

interface Props {
  open: boolean;
  onClose: () => void;
  turf: Turf | null;
  onSave: (turf: Turf) => void;
}

export default function EditTurfModal({
  open,
  onClose,
  turf,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<Turf | null>(null);

  useEffect(() => {
    if (turf) setFormData(turf);
  }, [turf]);

  if (!formData) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Turf">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />

          <input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as TurfStatus,
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <input
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="number"
            value={formData.bookings}
            onChange={(e) =>
              setFormData({
                ...formData,
                bookings: Number(e.target.value),
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />

          <input
            type="number"
            value={formData.revenue}
            onChange={(e) =>
              setFormData({
                ...formData,
                revenue: Number(e.target.value),
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="number"
            value={formData.occupancy}
            onChange={(e) =>
              setFormData({
                ...formData,
                occupancy: Number(e.target.value),
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />

          <input
            type="number"
            value={formData.availability}
            onChange={(e) =>
              setFormData({
                ...formData,
                availability: Number(e.target.value),
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}