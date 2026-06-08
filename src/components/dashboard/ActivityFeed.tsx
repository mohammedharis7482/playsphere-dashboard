import { recentActivities } from "@/data/dashboardData";

export default function ActivityFeed() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        Recent Activity
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Latest platform activities.
      </p>

      <div className="mt-6 space-y-5">
        {recentActivities.map((activity) => (
          <div
            key={activity.title}
            className="flex gap-4 rounded-3xl bg-slate-50 p-4"
          >
            <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-500" />

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-slate-950">
                {activity.title}
              </h4>

              <p className="mt-1 text-xs font-bold text-slate-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}