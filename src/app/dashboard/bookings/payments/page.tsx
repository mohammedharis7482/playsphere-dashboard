import { Download } from "lucide-react";
import PaymentPageContent from "@/components/payments/PaymentPageContent";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Payments
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Track booking payments, refunds, methods and transaction status.
          </p>
        </div>

        <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <PaymentPageContent />
    </div>
  );
}