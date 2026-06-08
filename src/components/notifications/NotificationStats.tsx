import {
    AlertCircle,
    Bell,
    CalendarCheck,
    CheckCircle,
  } from "lucide-react";
  
  import { AppNotification } from "@/types/notification";
  
  interface Props {
    notifications: AppNotification[];
  }
  
  export default function NotificationStats({
    notifications,
  }: Props) {
    const unread = notifications.filter(
      (item) => !item.read
    ).length;
  
    const bookingAlerts = notifications.filter(
      (item) => item.type === "Booking"
    ).length;
  
    const systemAlerts = notifications.filter(
      (item) => item.type === "System"
    ).length;
  
    const stats = [
      {
        title: "Total Notifications",
        value: notifications.length,
        icon: Bell,
        color: "bg-blue-50 text-blue-600",
        note: "All alerts",
      },
      {
        title: "Unread",
        value: unread,
        icon: AlertCircle,
        color: "bg-orange-50 text-orange-600",
        note: "Needs attention",
      },
      {
        title: "Booking Alerts",
        value: bookingAlerts,
        icon: CalendarCheck,
        color: "bg-emerald-50 text-emerald-600",
        note: "Booking updates",
      },
      {
        title: "System Alerts",
        value: systemAlerts,
        icon: CheckCircle,
        color: "bg-purple-50 text-purple-600",
        note: "Platform status",
      },
    ];
  
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
  
          return (
            <div
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {item.title}
                  </p>
  
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    {item.value}
                  </h3>
  
                  <p className="mt-4 text-xs font-black text-emerald-600">
                    {item.note}
                  </p>
                </div>
  
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color}`}
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