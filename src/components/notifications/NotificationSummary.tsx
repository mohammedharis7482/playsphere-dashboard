import {
    Bell,
    CalendarCheck,
    CreditCard,
    Settings,
    Users,
  } from "lucide-react";
  
  import { AppNotification } from "../../types/notification";
  
  interface Props {
    notifications: AppNotification[];
  }
  
  export default function NotificationSummary({
    notifications,
  }: Props) {
    const booking = notifications.filter(
      (item) => item.type === "Booking"
    ).length;
  
    const payment = notifications.filter(
      (item) => item.type === "Payment"
    ).length;
  
    const user = notifications.filter(
      (item) => item.type === "User"
    ).length;
  
    const system = notifications.filter(
      (item) => item.type === "System" || item.type === "Turf"
    ).length;
  
    const items = [
      {
        label: "Bookings",
        value: booking,
        icon: CalendarCheck,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "Payments",
        value: payment,
        icon: CreditCard,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Users",
        value: user,
        icon: Users,
        color: "bg-purple-50 text-purple-600",
      },
      {
        label: "System",
        value: system,
        icon: Settings,
        color: "bg-orange-50 text-orange-600",
      },
    ];
  
    return (
      <div className="space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                Today’s Activity
              </h3>
  
              <p className="mt-1 text-sm text-slate-500">
                Notification category summary.
              </p>
            </div>
  
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Bell size={22} />
            </div>
          </div>
  
          <div className="mt-6 space-y-4">
            {items.map((item) => {
              const Icon = item.icon;
  
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>
  
                    <p className="text-sm font-black text-slate-950">
                      {item.label}
                    </p>
                  </div>
  
                  <p className="text-lg font-black text-slate-950">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
  
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">
            Alert Preferences
          </h3>
  
          <p className="mt-1 text-sm text-slate-500">
            Managed from Settings page.
          </p>
  
          <div className="mt-6 space-y-3">
            {["Booking alerts", "Payment alerts", "System alerts"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-black text-slate-700">
                    {item}
                  </span>
  
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    Enabled
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }