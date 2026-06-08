import {
  CheckCircle,
  CreditCard,
  Database,
  HardDrive,
} from "lucide-react";

export default function SystemHealth() {
  const items = [
    {
      title: "Database",
      status: "Healthy",
      icon: Database,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Payments API",
      status: "Online",
      icon: CreditCard,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Notifications",
      status: "Operational",
      icon: CheckCircle,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Storage",
      status: "78%",
      icon: HardDrive,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        System Health
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Current operational status.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={20} />
                </div>

                <p className="text-sm font-black text-slate-950">
                  {item.title}
                </p>
              </div>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}