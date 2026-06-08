import { Activity, CalendarCheck, CircleDollarSign, Wrench } from "lucide-react";

export default function TurfActivity() {
  const activities = [
    {
      title: "New booking received",
      desc: "PlaySphere Arena booked for 7:00 PM",
      time: "5 min ago",
      icon: CalendarCheck,
    },
    {
      title: "Revenue updated",
      desc: "Elite Football Turf generated new payment",
      time: "18 min ago",
      icon: CircleDollarSign,
    },
    {
      title: "Maintenance alert",
      desc: "Champion Cricket Ground marked unavailable",
      time: "42 min ago",
      icon: Wrench,
    },
    {
      title: "System status active",
      desc: "All turf modules are running smoothly",
      time: "1 hr ago",
      icon: Activity,
    },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950">
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Latest turf management updates
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex gap-4 rounded-3xl bg-slate-50 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
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