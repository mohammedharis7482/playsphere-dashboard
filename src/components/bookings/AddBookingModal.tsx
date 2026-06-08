"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import {
  Booking,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
}

export default function AddBookingModal({
  open,
  onClose,
  onAddBooking,
}: Props) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    turfName: "",
    date: "",
    startTime: "",
    endTime: "",
    amount: "",
    status: "Pending" as BookingStatus,
    paymentStatus: "Pending" as PaymentStatus,
  });

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      turfName: "",
      date: "",
      startTime: "",
      endTime: "",
      amount: "",
      status: "Pending",
      paymentStatus: "Pending",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.turfName ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.amount
    ) {
      return;
    }

    const start = Number(formData.startTime.split(":")[0]);
    const end = Number(formData.endTime.split(":")[0]);

    const newBooking: Booking = {
      id: Date.now(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      turfName: formData.turfName,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: Math.max(1, end - start),
      amount: Number(formData.amount),
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    resetForm();
    onClose();
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

  return (
    <Modal open={open} onClose={onClose} title="Add New Booking">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer Name">
            <input
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className={inputClass}
              placeholder="Enter customer name"
            />
          </Field>

          <Field label="Phone Number">
            <input
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData({ ...formData, customerPhone: e.target.value })
              }
              className={inputClass}
              placeholder="Enter phone number"
            />
          </Field>
        </div>

        <Field label="Turf">
          <select
            value={formData.turfName}
            onChange={(e) =>
              setFormData({ ...formData, turfName: e.target.value })
            }
            className={inputClass}
          >
            <option value="">Select Turf</option>
            <option>Football Turf A</option>
            <option>Football Turf B</option>
            <option>Cricket Turf</option>
            <option>Badminton Court</option>
          </select>
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
                setFormData({ ...formData, amount: e.target.value })
              }
              className={inputClass}
              placeholder="₹"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Time">
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="End Time">
            <input
              type="time"
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
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </Field>

          <Field label="Payment">
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
              <option>Pending</option>
              <option>Paid</option>
            </select>
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Create Booking
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
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}