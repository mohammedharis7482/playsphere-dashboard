"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Turf, TurfStatus } from "@/types/turf";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddTurf: (turf: Turf) => void;
}

export default function AddTurfModal({
  open,
  onClose,
  onAddTurf,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Football",
    status: "Available" as TurfStatus,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    bookings: 0,
    revenue: 0,
    occupancy: 0,
    availability: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.type) return;

    onAddTurf({
      id: Date.now(),
      ...formData,
      imageVariant: "green",
      createdAt: new Date().toISOString(),
    });

    setFormData({
      name: "",
      location: "",
      type: "Football",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
      bookings: 0,
      revenue: 0,
      occupancy: 0,
      availability: 100,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Turf">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Turf name"
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10"
          />

          <input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Location"
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            placeholder="Type"
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as TurfStatus,
              })
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10"
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
          placeholder="Image URL"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10"
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
            placeholder="Bookings"
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
            placeholder="Revenue"
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
            placeholder="Occupancy %"
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
            placeholder="Availability %"
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white"
          >
            Add Turf
          </button>
        </div>
      </form>
    </Modal>
  );
}