import {
    Bell,
    Building2,
    Lock,
    Palette,
  } from "lucide-react";
  
  export default function RecentSettingsActivity() {
    const activities = [
      {
        title: "Profile updated",
        desc: "Admin profile information was changed.",
        time: "8 min ago",
        icon: Building2,
        style: "bg-blue-50 text-blue-600",
      },
      {
        title: "Security enabled",
        desc: "Two-factor authentication is active.",
        time: "22 min ago",
        icon: Lock,
        style: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Notifications changed",
        desc: "Payment alerts were updated.",
        time: "1 hr ago",
        icon: Bell,
        style: "bg-purple-50 text-purple-600",
      },
      {
        title: "Appearance updated",
        desc: "Brand color was synchronized.",
        time: "2 hrs ago",
        icon: Palette,
        style: "bg-orange-50 text-orange-600",
      },
    ];
  
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Recent Activity
        </h3>
  
        <p className="mt-1 text-sm text-slate-500">
          Latest settings updates.
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