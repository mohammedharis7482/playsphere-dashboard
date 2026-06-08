import {
  CalendarCheck,
  ChartNoAxesCombined,
  FileText,
  UserPlus,
  Wrench,
} from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      title: "New booking created",
      desc: "A new booking was created for PlaySphere Arena.",
      time: "5 min ago",
      icon: CalendarCheck,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Revenue updated",
      desc: "Monthly revenue summary was recalculated.",
      time: "18 min ago",
      icon: ChartNoAxesCombined,
      style: "bg-blue-50 text-blue-600",
    },
    {
      title: "User registered",
      desc: "A new customer account joined the platform.",
      time: "34 min ago",
      icon: UserPlus,
      style: "bg-purple-50 text-purple-600",
    },
    {
      title: "Turf status changed",
      desc: "Champion Cricket Ground status was updated.",
      time: "1 hr ago",
      icon: Wrench,
      style: "bg-orange-50 text-orange-600",
    },
    {
      title: "Monthly report generated",
      desc: "Analytics report is ready to export.",
      time: "2 hrs ago",
      icon: FileText,
      style: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        Recent Activity
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Latest platform analytics updates
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