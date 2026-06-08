"use client";

import { RotateCcw } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Payment } from "@/types/payment";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  payment: Payment | null;
}

export default function RefundPaymentModal({
  open,
  onClose,
  onConfirm,
  payment,
}: Props) {
  if (!payment) return null;

  return (
    <Modal open={open} onClose={onClose} title="Refund Payment">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-orange-500">
          <RotateCcw size={30} />
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-950">
            Refund ₹{payment.amount.toLocaleString()}?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            This will mark transaction{" "}
            <span className="font-bold text-slate-700">
              {payment.transactionId}
            </span>{" "}
            as refunded.
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
            className="rounded-2xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </Modal>
  );
}