"use client";

import Modal from "@/components/ui/Modal";
import { Booking } from "@/types/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export default function ViewBookingModal({ open, onClose, booking }: Props) {
  if (!booking) return null;

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const paymentColor = {
    Pending: "bg-orange-100 text-orange-700",
    Paid: "bg-emerald-100 text-emerald-700",
  };

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
          <InfoItem label="Date" value={booking.date} />
          <InfoItem
            label="Time"
            value={`${booking.startTime} - ${booking.endTime}`}
          />
          <InfoItem label="Duration" value={`${booking.duration} hrs`} />
          <InfoItem label="Amount" value={`₹${booking.amount}`} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold text-slate-500">
              Booking Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${statusColor[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-slate-500">
              Payment Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${paymentColor[booking.paymentStatus]}`}
            >
              {booking.paymentStatus}
            </span>
          </div>
        </div>

        <InfoItem
          label="Created At"
          value={new Date(booking.createdAt).toLocaleString()}
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