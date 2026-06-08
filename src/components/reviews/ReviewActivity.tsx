import {
    AlertTriangle,
    CheckCircle,
    MessageSquare,
    Star,
  } from "lucide-react";
  
  export default function ReviewActivity() {
    const activities = [
      {
        title: "New review received",
        desc: "Rahul Kumar submitted a 5-star review.",
        time: "5 min ago",
        icon: MessageSquare,
        style: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Review approved",
        desc: "Elite Football Turf review was approved.",
        time: "18 min ago",
        icon: CheckCircle,
        style: "bg-blue-50 text-blue-600",
      },
      {
        title: "Low rating flagged",
        desc: "A 2-star review was marked for admin attention.",
        time: "1 hr ago",
        icon: AlertTriangle,
        style: "bg-red-50 text-red-600",
      },
      {
        title: "Top rating updated",
        desc: "PlaySphere Arena rating improved to 4.8.",
        time: "2 hrs ago",
        icon: Star,
        style: "bg-yellow-50 text-yellow-600",
      },
    ];
  
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Review Activity
        </h3>
  
        <p className="mt-1 text-sm text-slate-500">
          Latest customer feedback updates.
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