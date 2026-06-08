"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteBookingModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Booking">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-500">
          <AlertTriangle size={30} />
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-950">
            Are you sure?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            This booking will be permanently removed from the dashboard.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}