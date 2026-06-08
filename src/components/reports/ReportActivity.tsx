import {
    Download,
    FilePlus,
    FileText,
    RefreshCw,
  } from "lucide-react";
  
  export default function ReportActivity() {
    const activities = [
      {
        title: "Revenue report exported",
        desc: "Monthly Revenue Report was downloaded.",
        time: "8 min ago",
        icon: Download,
        style: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Booking report generated",
        desc: "Booking Performance Report was created.",
        time: "24 min ago",
        icon: FilePlus,
        style: "bg-blue-50 text-blue-600",
      },
      {
        title: "Turf report downloaded",
        desc: "Turf Utilization Report was exported as CSV.",
        time: "1 hr ago",
        icon: FileText,
        style: "bg-orange-50 text-orange-600",
      },
      {
        title: "Monthly report scheduled",
        desc: "Automatic monthly report schedule updated.",
        time: "2 hrs ago",
        icon: RefreshCw,
        style: "bg-purple-50 text-purple-600",
      },
    ];
  
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Report Activity
        </h3>
  
        <p className="mt-1 text-sm text-slate-500">
          Latest report generation and export updates.
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