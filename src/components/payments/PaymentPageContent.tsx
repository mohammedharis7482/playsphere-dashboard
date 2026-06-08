"use client";

import { useMemo, useState } from "react";

import { Payment } from "@/types/payment";
import { payments as initialPayments } from "@/data/payment";

import PaymentStats from "./PaymentStats";
import PaymentRevenueChart from "./PaymentRevenueChart";
import PaymentMethodChart from "./PaymentMethodChart";
import PaymentFilters from "./PaymentFilters";
import PaymentTable from "./PaymentTable";
import ViewPaymentModal from "./ViewPaymentModal";
import RefundPaymentModal from "./RefundPaymentModal";
import PaymentActivity from "./PaymentActivity";

export default function PaymentPageContent() {
  const [paymentList, setPaymentList] = useState<Payment[]>(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [viewModal, setViewModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);

  const filteredPayments = useMemo(() => {
    return paymentList.filter((payment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        payment.transactionId.toLowerCase().includes(searchValue) ||
        payment.customerName.toLowerCase().includes(searchValue) ||
        payment.turfName.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ? true : payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" ? true : payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [paymentList, search, statusFilter, methodFilter]);

  const handleRefund = () => {
    if (!selectedPayment) return;

    setPaymentList((prev) =>
      prev.map((payment) =>
        payment.id === selectedPayment.id
          ? { ...payment, status: "Refunded" }
          : payment
      )
    );

    setRefundModal(false);
    setSelectedPayment(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
  };

  return (
    <div className="space-y-8">
      <PaymentStats payments={paymentList} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PaymentRevenueChart />
        </div>

        <PaymentMethodChart payments={paymentList} />
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredPayments.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {paymentList.length}
                </span>{" "}
                payments
              </p>
            </div>

            <PaymentFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              methodFilter={methodFilter}
              setMethodFilter={setMethodFilter}
              onClear={clearFilters}
            />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <PaymentTable
            payments={filteredPayments}
            onView={(payment) => {
              setSelectedPayment(payment);
              setViewModal(true);
            }}
            onRefund={(payment) => {
              setSelectedPayment(payment);
              setRefundModal(true);
            }}
          />
        </div>
      </section>

      <PaymentActivity />

      <ViewPaymentModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        payment={selectedPayment}
      />

      <RefundPaymentModal
        open={refundModal}
        onClose={() => setRefundModal(false)}
        onConfirm={handleRefund}
        payment={selectedPayment}
      />
    </div>
  );
}