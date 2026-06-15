"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import { Turf, TurfStatus } from "@/types/turf";

interface AddTurfModalProps {
  open: boolean;
  onClose: () => void;
  onAddTurf: (turf: Turf) => void;
}

const defaultImage =
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80";

type ApiTurf = {
  id: string;
  name: string;
  location: string;
  city?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  price: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  createdAt: string;
};

function formatTurf(turf: ApiTurf): Turf {
  return {
    id: turf.id,
    name: turf.name,
    location: turf.location,
    type: "Football",
    status: turf.status,
    image: turf.imageUrl || defaultImage,
    price: turf.price,
    revenue: turf.price * 10,
    bookings: 10,
    occupancy: 80,
    availability: turf.status === "ACTIVE" ? 90 : 0,
    rating: 4.7,
    createdAt: turf.createdAt,
  };
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

export default function AddTurfModal({
  open,
  onClose,
  onAddTurf,
}: AddTurfModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "Calicut",
    description: "",
    type: "Football",
    status: "ACTIVE" as TurfStatus,
    image: defaultImage,
    price: 1000,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      city: "Calicut",
      description: "",
      type: "Football",
      status: "ACTIVE",
      image: defaultImage,
      price: 1000,
    });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location) {
      setError("Turf name and location are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/turfs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          city: formData.city,
          description: formData.description,
          imageUrl: formData.image,
          price: formData.price,
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to add turf.");
        return;
      }

      onAddTurf(formatTurf(data.data));
      resetForm();
      onClose();
    } catch (error) {
      console.error("ADD_TURF_ERROR", error);
      setError("Something went wrong while adding turf.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add New Turf">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Turf Name">
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="PlaySphere Arena"
              className={inputClass}
            />
          </Field>

          <Field label="Location">
            <input
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              placeholder="Calicut Stadium Road"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City">
            <input
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              placeholder="Calicut"
              className={inputClass}
            />
          </Field>

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
              placeholder="1000"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Turf Type">
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
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
              setFormData({
                ...formData,
                image: e.target.value,
              })
            }
            placeholder="https://example.com/turf.jpg"
            className={inputClass}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            placeholder="Short description about this turf..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </Field>

        {error && <p className="text-sm font-bold text-red-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Turf"}
          </button>
        </div>
      </form>
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