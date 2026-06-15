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
  onAddBooking: (booking: Booking) => void;
}

type TurfOption = {
  id: string;
  name: string;
  price: number;
};

type CustomerOption = {
  id: string;
  name: string;
  phone: string;
};

type ApiBooking = {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: BookingStatus;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
  };
  turf: {
    name: string;
  };
  payment: {
    status: PaymentStatus;
  } | null;
};

function formatBooking(booking: ApiBooking): Booking {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  return {
    id: booking.id,
    customerName: booking.customer.name,
    customerPhone: booking.customer.phone,
    turfName: booking.turf.name,
    date: booking.bookingDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
    duration: Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60)),
    amount: booking.amount,
    status: booking.status,
    paymentStatus: booking.payment?.status || "PENDING",
    createdAt: booking.createdAt,
  };
}

export default function AddBookingModal({
  open,
  onClose,
  onAddBooking,
}: Props) {
  const [turfs, setTurfs] = useState<TurfOption[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);

  const [formData, setFormData] = useState({
    customerId: "",
    turfId: "",
    date: "",
    startTime: "",
    endTime: "",
    amount: "",
    status: "PENDING" as BookingStatus,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [turfsResponse, customersResponse] = await Promise.all([
          fetch("/api/turfs", { credentials: "include" }),
          fetch("/api/customers", { credentials: "include" }),
        ]);

        const turfsData = await turfsResponse.json();
        const customersData = await customersResponse.json();

        if (turfsData.success) {
          setTurfs(turfsData.data);
        }

        if (customersData.success) {
          setCustomers(customersData.data);
        }
      } catch (error) {
        console.error("FETCH_BOOKING_OPTIONS_ERROR", error);
      }
    }

    if (open) {
      fetchOptions();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
      customerId: "",
      turfId: "",
      date: "",
      startTime: "",
      endTime: "",
      amount: "",
      status: "PENDING",
    });
    setError("");
  };

  const handleTurfChange = (turfId: string) => {
    const selectedTurf = turfs.find((turf) => turf.id === turfId);

    setFormData({
      ...formData,
      turfId,
      amount: selectedTurf ? String(selectedTurf.price) : "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.customerId ||
      !formData.turfId ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.amount
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const bookingDate = new Date(`${formData.date}T00:00:00`);
      const startTime = new Date(`${formData.date}T${formData.startTime}:00`);
      const endTime = new Date(`${formData.date}T${formData.endTime}:00`);

      const response = await fetch("/api/bookings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turfId: formData.turfId,
          customerId: formData.customerId,
          bookingDate,
          startTime,
          endTime,
          amount: Number(formData.amount),
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to create booking.");
        return;
      }

      onAddBooking(formatBooking(data.data));
      resetForm();
      onClose();
    } catch (error) {
      console.error("ADD_BOOKING_ERROR", error);
      setError("Something went wrong while creating booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Booking">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer">
            <select
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
              }
              className={inputClass}
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Turf">
            <select
              value={formData.turfId}
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
        </div>

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
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Booking"}
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