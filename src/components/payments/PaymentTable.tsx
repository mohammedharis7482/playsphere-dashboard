"use client";

import { Eye, ReceiptText, RotateCcw } from "lucide-react";

import { Payment } from "@/types/payment";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  payments: Payment[];
  onView: (payment: Payment) => void;
  onRefund: (payment: Payment) => void;
}

export default function PaymentTable({
  payments,
  onView,
  onRefund,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[980px]">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200 text-left">
            {[
              "Transaction",
              "Customer",
              "Turf",
              "Amount",
              "Method",
              "Status",
              "Date",
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
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-5 py-5">
                  <p className="font-black text-slate-950">
                    {payment.transactionId}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    ID #{payment.id}
                  </p>
                </td>

                <td className="px-5 py-5 text-sm font-bold text-slate-800">
                  {payment.customerName}
                </td>

                <td className="px-5 py-5 text-sm text-slate-600">
                  {payment.turfName}
                </td>

                <td className="px-5 py-5 font-black text-slate-950">
                  ₹{payment.amount.toLocaleString()}
                </td>

                <td className="px-5 py-5">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                    {payment.method}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <PaymentStatusBadge status={payment.status} />
                </td>

                <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                  {payment.date}
                </td>

                <td className="px-5 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(payment)}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <ReceiptText size={18} />
                    </button>

                    <button
                      onClick={() => onRefund(payment)}
                      disabled={payment.status === "Refunded"}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <RotateCcw size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <div className="flex min-h-[260px] flex-col items-center justify-center bg-slate-50 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-2xl">
                    ₹
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    No payments found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}