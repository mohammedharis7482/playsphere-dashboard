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

type TurfOption = {
  id: string;
  name: string;
  price: number;
};

function toDateInputValue(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}

function toTimeInputValue(date: string) {
  return new Date(date).toISOString().slice(11, 16);
}

function formatBooking(bookingData: any): Booking {
  const start = new Date(bookingData.startTime);
  const end = new Date(bookingData.endTime);

  return {
    id: bookingData.id,
    customerName: bookingData.customer.name,
    customerPhone: bookingData.customer.phone,
    turfName: bookingData.turf.name,
    date: bookingData.bookingDate,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    duration: Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60)),
    amount: bookingData.amount,
    status: bookingData.status,
    paymentStatus: bookingData.payment?.status || "PENDING",
    createdAt: bookingData.createdAt,
  };
}

export default function EditBookingModal({
  open,
  onClose,
  booking,
  onSave,
}: Props) {
  const [turfs, setTurfs] = useState<TurfOption[]>([]);
  const [formData, setFormData] = useState<Booking | null>(null);
  const [selectedTurfId, setSelectedTurfId] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

  useEffect(() => {
    async function fetchTurfs() {
      try {
        const response = await fetch("/api/turfs", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setTurfs(data.data);

          if (booking) {
            const matchedTurf = data.data.find(
              (turf: TurfOption) => turf.name === booking.turfName
            );

            if (matchedTurf) {
              setSelectedTurfId(matchedTurf.id);
            }
          }
        }
      } catch (error) {
        console.error("FETCH_TURFS_FOR_BOOKING_EDIT_ERROR", error);
      }
    }

    if (open) {
      fetchTurfs();
    }
  }, [open, booking]);

  useEffect(() => {
    if (booking) {
      setFormData(booking);
      setDateValue(toDateInputValue(booking.date));
      setStartTimeValue(toTimeInputValue(booking.startTime));
      setEndTimeValue(toTimeInputValue(booking.endTime));
      setError("");
    }
  }, [booking]);

  if (!formData) return null;

  const handleTurfChange = (turfId: string) => {
    const selectedTurf = turfs.find((turf) => turf.id === turfId);

    setSelectedTurfId(turfId);

    if (selectedTurf) {
      setFormData({
        ...formData,
        turfName: selectedTurf.name,
        amount: selectedTurf.price,
      });
    }
  };

  const handleSave = async () => {
    if (!selectedTurfId || !dateValue || !startTimeValue || !endTimeValue) {
      setError("Please fill all editable booking fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const bookingDate = new Date(`${dateValue}T00:00:00`);
      const startTime = new Date(`${dateValue}T${startTimeValue}:00`);
      const endTime = new Date(`${dateValue}T${endTimeValue}:00`);

      const bookingResponse = await fetch(`/api/bookings/${formData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turfId: selectedTurfId,
          bookingDate,
          startTime,
          endTime,
          amount: formData.amount,
          status: formData.status,
        }),
      });

      const bookingData = await bookingResponse.json();

      if (!bookingData.success) {
        setError(bookingData.message || "Failed to update booking.");
        return;
      }

      onSave(formatBooking(bookingData.data));
      onClose();
    } catch (error) {
      console.error("EDIT_BOOKING_ERROR", error);
      setError("Something went wrong while updating booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Booking">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer Name">
            <input
              value={formData.customerName}
              disabled
              className={`${inputClass} bg-slate-50 text-slate-500`}
            />
          </Field>

          <Field label="Phone Number">
            <input
              value={formData.customerPhone}
              disabled
              className={`${inputClass} bg-slate-50 text-slate-500`}
            />
          </Field>
        </div>

        <Field label="Turf">
          <select
            value={selectedTurfId}
            onChange={(e) => handleTurfChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Turf</option>
            {turfs.map((turf) => (
              <option key={turf.id} value={turf.id}>
                {turf.name}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <input
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Amount">
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Time">
            <input
              type="time"
              value={startTimeValue}
              onChange={(e) => setStartTimeValue(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="End Time">
            <input
              type="time"
              value={endTimeValue}
              onChange={(e) => setEndTimeValue(e.target.value)}
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
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </Field>

          <Field label="Payment Status">
            <select
              value={formData.paymentStatus}
              disabled
              className={`${inputClass} bg-slate-50 text-slate-500`}
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
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
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600 disabled:opacity-60"
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
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}