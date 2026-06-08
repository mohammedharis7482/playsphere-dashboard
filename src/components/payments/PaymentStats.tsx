import {
    Banknote,
    Clock3,
    IndianRupee,
    RotateCcw,
  } from "lucide-react";
  
  import { Payment } from "@/types/payment";
  
  interface Props {
    payments: Payment[];
  }
  
  export default function PaymentStats({ payments }: Props) {
    const totalRevenue = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((sum, payment) => sum + payment.amount, 0);
  
    const paid = payments.filter((payment) => payment.status === "Paid").length;
    const pending = payments.filter((payment) => payment.status === "Pending").length;
    const refunded = payments.filter((payment) => payment.status === "Refunded").length;
  
    const stats = [
      {
        title: "Total Revenue",
        value: `₹${totalRevenue.toLocaleString()}`,
        icon: IndianRupee,
        color: "bg-emerald-50 text-emerald-600",
        growth: "+18.2%",
      },
      {
        title: "Paid Payments",
        value: paid,
        icon: Banknote,
        color: "bg-blue-50 text-blue-600",
        growth: "+12.4%",
      },
      {
        title: "Pending",
        value: pending,
        icon: Clock3,
        color: "bg-orange-50 text-orange-600",
        growth: "-2.1%",
      },
      {
        title: "Refunds",
        value: refunded,
        icon: RotateCcw,
        color: "bg-red-50 text-red-600",
        growth: "+1.4%",
      },
    ];
  
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.title}
                  </p>
  
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    {stat.value}
                  </h3>
  
                  <p className="mt-4 text-xs font-black text-emerald-600">
                    {stat.growth} this month
                  </p>
                </div>
  
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }