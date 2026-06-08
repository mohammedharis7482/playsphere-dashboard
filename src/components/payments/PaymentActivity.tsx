import {
    CheckCircle,
    Clock3,
    CreditCard,
    RotateCcw,
    XCircle,
  } from "lucide-react";
  
  export default function PaymentActivity() {
    const activities = [
      {
        title: "Payment received",
        desc: "Rahul Kumar paid ₹1,200 through UPI.",
        time: "5 min ago",
        icon: CheckCircle,
        style: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Payment pending",
        desc: "Arjun Nair payment is awaiting confirmation.",
        time: "18 min ago",
        icon: Clock3,
        style: "bg-yellow-50 text-yellow-600",
      },
      {
        title: "Card payment completed",
        desc: "A card payment was completed successfully.",
        time: "42 min ago",
        icon: CreditCard,
        style: "bg-blue-50 text-blue-600",
      },
      {
        title: "Payment failed",
        desc: "Vishnu Das payment failed during checkout.",
        time: "1 hr ago",
        icon: XCircle,
        style: "bg-red-50 text-red-600",
      },
      {
        title: "Refund processed",
        desc: "Refund was processed for Akash Menon.",
        time: "2 hrs ago",
        icon: RotateCcw,
        style: "bg-orange-50 text-orange-600",
      },
    ];
  
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Payment Activity
        </h3>
  
        <p className="mt-1 text-sm text-slate-500">
          Latest payment and refund updates
        </p>
  
        <div className="mt-6 space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
  
            return (
              <div
                key={activity.title}
                className="flex gap-4 rounded-3xl bg-slate-50 p-4"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${activity.style}`}
                >
                  <Icon size={20} />
                </div>
  
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-black text-slate-950">
                      {activity.title}
                    </h4>
  
                    <span className="shrink-0 text-xs font-bold text-slate-400">
                      {activity.time}
                    </span>
                  </div>
  
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }