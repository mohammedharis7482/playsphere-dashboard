import {
    Bell,
    CalendarCheck,
    CreditCard,
    Trophy,
  } from "lucide-react";
  
  import { operationsData } from "@/data/dashboardData";
  
  const icons = [
    CalendarCheck,
    CreditCard,
    Trophy,
    Bell,
  ];
  
  export default function OperationsSummary() {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Today’s Operations
        </h2>
  
        <p className="mt-1 text-sm text-slate-500">
          Live business activity summary.
        </p>
  
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {operationsData.map((item, index) => {
            const Icon = icons[index];
  
            return (
              <div
                key={item.title}
                className="rounded-3xl bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-slate-700">
                    {item.title}
                  </p>
  
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon size={18} />
                  </div>
                </div>
  
                <h3 className="mt-4 text-3xl font-black text-slate-950">
                  {item.value}
                </h3>
  
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {item.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }