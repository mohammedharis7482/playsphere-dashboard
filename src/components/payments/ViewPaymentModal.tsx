"use client";

import {
  CalendarDays,
  CreditCard,
  IndianRupee,
  ReceiptText,
  User,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Payment } from "@/types/payment";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  open: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export default function ViewPaymentModal({
  open,
  onClose,
  payment,
}: Props) {
  if (!payment) return null;

  return (
    <Modal open={open} onClose={onClose} title="Payment Details">
      <div className="space-y-6">
        <div className="rounded-3xl bg-emerald-50 p-5">
          <p className="text-sm font-bold text-emerald-700">
            {payment.transactionId}
          </p>

          <h2 className="mt-1 text-3xl font-black text-slate-950">
            ₹{payment.amount.toLocaleString()}
          </h2>

          <div className="mt-3">
            <PaymentStatusBadge status={payment.status} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem icon={User} label="Customer" value={payment.customerName} />
          <InfoItem icon={ReceiptText} label="Turf" value={payment.turfName} />
          <InfoItem icon={CreditCard} label="Method" value={payment.method} />
          <InfoItem icon={CalendarDays} label="Date" value={payment.date} />
          <InfoItem
            icon={IndianRupee}
            label="Amount"
            value={`₹${payment.amount.toLocaleString()}`}
          />
          <InfoItem label="Created At" value={new Date(payment.createdAt).toLocaleString()} />
        </div>

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
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
        {Icon && <Icon size={17} />}
        {label}
      </div>

      <p className="mt-2 font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}