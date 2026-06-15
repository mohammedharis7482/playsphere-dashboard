"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  RotateCcw,
  Search,
} from "lucide-react";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

type Payment = {
  id: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  transactionId?: string | null;
  createdAt: string;
  booking: {
    customer: {
      name: string;
      phone: string;
    };
    turf: {
      name: string;
    };
  };
};

const statusStyles = {
  PAID: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-purple-100 text-purple-700",
};

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch("/api/payments", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setPayments(data.data);
        }
      } catch (error) {
        console.error("FETCH_PAYMENTS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    const value = search.toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        payment.booking.customer.name.toLowerCase().includes(value) ||
        payment.booking.customer.phone.includes(value) ||
        payment.booking.turf.name.toLowerCase().includes(value) ||
        payment.transactionId?.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" ? true : payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const totalRevenue = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + payment.amount, 0);

  const paidCount = payments.filter((payment) => payment.status === "PAID").length;
  const pendingCount = payments.filter(
    (payment) => payment.status === "PENDING"
  ).length;
  const refundedCount = payments.filter(
    (payment) => payment.status === "REFUNDED"
  ).length;

  const handleStatusUpdate = async (id: string, status: PaymentStatus) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update payment.");
        return;
      }

      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, status: data.data.status } : payment
        )
      );
    } catch (error) {
      console.error("UPDATE_PAYMENT_STATUS_ERROR", error);
      alert("Something went wrong while updating payment.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Payments
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Track revenue, payment status, refunds and transaction history.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={Banknote}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Paid Payments"
          value={paidCount.toString()}
          icon={CheckCircle2}
          color="bg-green-50 text-green-600"
        />

        <StatCard
          title="Pending Payments"
          value={pendingCount.toString()}
          icon={Clock}
          color="bg-yellow-50 text-yellow-600"
        />

        <StatCard
          title="Refunded"
          value={refundedCount.toString()}
          icon={RotateCcw}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Payment Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredPayments.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {payments.length}
                </span>{" "}
                payments
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-[280px]">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search payments..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="All">All Status</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="REFUNDED">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm font-bold text-slate-500">
                Loading payments...
              </p>
            </div>
          ) : filteredPayments.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full min-w-[980px]">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-left">
                    {[
                      "Customer",
                      "Turf",
                      "Amount",
                      "Method",
                      "Status",
                      "Transaction",
                      "Date",
                      "Action",
                    ].map((head) => (
                      <th
                        key={head}
                        className={`px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 ${
                          head === "Action" ? "text-center" : ""
                        }`}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-900">
                          {payment.booking.customer.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {payment.booking.customer.phone}
                        </p>
                      </td>

                      <td className="px-5 py-5 font-semibold text-slate-700">
                        {payment.booking.turf.name}
                      </td>

                      <td className="px-5 py-5 font-black text-slate-950">
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          <CreditCard size={14} />
                          {payment.method}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            statusStyles[payment.status]
                          }`}
                        >
                          {formatStatus(payment.status)}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                        {payment.transactionId || "N/A"}
                      </td>

                      <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-center">
                          <select
                            value={payment.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                payment.id,
                                e.target.value as PaymentStatus
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none transition focus:border-emerald-400"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="FAILED">Failed</option>
                            <option value="REFUNDED">Refunded</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-slate-50">
              <p className="text-sm font-bold text-slate-500">
                No payments found.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}