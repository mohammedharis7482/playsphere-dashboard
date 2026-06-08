"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSave: (booking: Booking) => void;
}

export default function EditBookingModal({
  open,
  onClose,
  booking,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<Booking | null>(null);

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  if (!formData) return null;

  const inputClass =
    "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

  const handleSave = () => {
    const start = Number(formData.startTime.split(":")[0]);
    const end = Number(formData.endTime.split(":")[0]);

    onSave({
      ...formData,
      duration: Math.max(1, end - start),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Booking">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer Name">
            <input
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="Phone Number">
            <input
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData({ ...formData, customerPhone: e.target.value })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Turf Name">
          <input
            value={formData.turfName}
            onChange={(e) =>
              setFormData({ ...formData, turfName: e.target.value })
            }
            className={inputClass}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="Amount">
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Time">
            <input
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="End Time">
            <input
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Booking Status">
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as BookingStatus,
                })
              }
              className={inputClass}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </Field>

          <Field label="Payment Status">
            <select
              value={formData.paymentStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentStatus: e.target.value as PaymentStatus,
                })
              }
              className={inputClass}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Save Changes
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
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}