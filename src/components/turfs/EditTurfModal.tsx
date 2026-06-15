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

const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

export default function EditTurfModal({
  open,
  onClose,
  turf,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<Turf | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (turf) {
      setFormData(turf);
      setError("");
    }
  }, [turf]);

  if (!formData) return null;

  const handleSave = async () => {
    if (!formData.name || !formData.location) {
      setError("Turf name and location are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/turfs/${formData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          imageUrl: formData.image,
          price: formData.price,
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to update turf.");
        return;
      }

      const updatedTurf: Turf = {
        ...formData,
        name: data.data.name,
        location: data.data.location,
        image: data.data.imageUrl || formData.image,
        price: data.data.price,
        status: data.data.status,
        createdAt: data.data.createdAt,
      };

      onSave(updatedTurf);
      onClose();
    } catch (error) {
      console.error("EDIT_TURF_ERROR", error);
      setError("Something went wrong while updating turf.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Turf">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Turf Name">
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Turf name"
              className={inputClass}
            />
          </Field>

          <Field label="Location">
            <input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Location"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Turf Type">
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className={inputClass}
            >
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Badminton">Badminton</option>
            </select>
          </Field>

          <Field label="Status">
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as TurfStatus,
                })
              }
              className={inputClass}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </Field>
        </div>

        <Field label="Image URL">
          <input
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="Image URL"
            className={inputClass}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hourly Price">
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
              placeholder="Price"
              className={inputClass}
            />
          </Field>

          <Field label="Occupancy %">
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
              className={inputClass}
            />
          </Field>
        </div>

        {error && <p className="text-sm font-bold text-red-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}