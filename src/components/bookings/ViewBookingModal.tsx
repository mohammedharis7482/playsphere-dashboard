"use client";

import Modal from "@/components/ui/Modal";
import { Booking } from "@/types/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const paymentColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-purple-100 text-purple-700",
};

function formatLabel(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ViewBookingModal({ open, onClose, booking }: Props) {
  if (!booking) return null;

  return (
    <Modal open={open} onClose={onClose} title="Booking Details">
      <div className="space-y-6">
        <div className="rounded-3xl bg-emerald-50 p-5">
          <p className="text-sm font-bold text-emerald-700">
            {booking.turfName}
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950">
            {booking.customerName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {booking.customerPhone}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem label="Date" value={formatDate(booking.date)} />
          <InfoItem
            label="Time"
            value={`${formatTime(booking.startTime)} - ${formatTime(
              booking.endTime
            )}`}
          />
          <InfoItem label="Duration" value={`${booking.duration} hrs`} />
          <InfoItem
            label="Amount"
            value={`₹${booking.amount.toLocaleString("en-IN")}`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold text-slate-500">
              Booking Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                statusColor[booking.status]
              }`}
            >
              {formatLabel(booking.status)}
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-slate-500">
              Payment Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                paymentColor[booking.paymentStatus]
              }`}
            >
              {formatLabel(booking.paymentStatus)}
            </span>
          </div>
        </div>

        <InfoItem
          label="Created At"
          value={new Date(booking.createdAt).toLocaleString("en-IN")}
        />

        <div className="flex justify-end pt-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black text-slate-950">{value}</p>
    </div>
  );
}