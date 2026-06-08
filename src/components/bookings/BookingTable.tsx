"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CreditCard,
  Eye,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Booking } from "@/types/booking";

import AddBookingModal from "./AddBookingModal";
import EditBookingModal from "./EditBookingModal";
import ViewBookingModal from "./ViewBookingModal";
import ConfirmDeleteBookingModal from "./ConfirmDeleteBookingModal";
import BookingAvatar from "./BookingAvatar";
import BookingEmptyState from "./BookingEmptyState";
import BookingStatusBadge from "./BookingStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  bookings: Booking[];
  totalBookings: number;
  onAddBooking: (booking: Booking) => void;
  onUpdateBooking: (booking: Booking) => void;
  onDeleteBooking: (bookingId: number) => void;
}

export default function BookingTable({
  bookings = [],
  totalBookings,
  onAddBooking,
  onUpdateBooking,
  onDeleteBooking,
}: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleConfirmDelete = () => {
    if (!selectedBooking) return;

    onDeleteBooking(selectedBooking.id);
    setOpenDelete(false);
    setSelectedBooking(null);
  };

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage customer bookings and reservations
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {bookings.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800">
              {totalBookings}
            </span>{" "}
            bookings
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/dashboard/bookings/payments"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            <CreditCard size={18} />
            View Payments
          </Link>

          <button
            onClick={() => setOpenAdd(true)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            <Plus size={18} />
            Add Booking
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full min-w-[980px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-left">
                {[
                  "Customer",
                  "Turf",
                  "Date & Time",
                  "Amount",
                  "Status",
                  "Payment",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className={`px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 ${
                      head === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <BookingAvatar name={booking.customerName} />

                        <div className="min-w-0">
                          <p className="font-bold text-slate-900">
                            {booking.customerName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {booking.customerPhone}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-bold text-slate-900">
                        {booking.turfName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {booking.duration} hour slot
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-bold text-slate-900">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </td>

                    <td className="px-5 py-5 font-black text-slate-950">
                      ₹{booking.amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-5">
                      <BookingStatusBadge status={booking.status} />
                    </td>

                    <td className="px-5 py-5">
                      <PaymentStatusBadge status={booking.paymentStatus} />
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setOpenView(true);
                          }}
                          className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setOpenEdit(true);
                          }}
                          className="rounded-xl p-2 text-slate-500 transition hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setOpenDelete(true);
                          }}
                          className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <BookingEmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddBookingModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAddBooking={onAddBooking}
      />

      <EditBookingModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        booking={selectedBooking}
        onSave={onUpdateBooking}
      />

      <ViewBookingModal
        open={openView}
        onClose={() => setOpenView(false)}
        booking={selectedBooking}
      />

      <ConfirmDeleteBookingModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}