import {
    CalendarClock,
    IndianRupee,
    Trophy,
    Users,
  } from "lucide-react";
  
  export default function ReportInsights() {
    const insights = [
      {
        title: "Best Revenue Month",
        value: "June",
        icon: IndianRupee,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Top Turf",
        value: "Champion Cricket",
        icon: Trophy,
        color: "bg-orange-50 text-orange-600",
      },
      {
        title: "Most Booked Slot",
        value: "8 PM - 9 PM",
        icon: CalendarClock,
        color: "bg-blue-50 text-blue-600",
      },
      {
        title: "Active Users",
        value: "184",
        icon: Users,
        color: "bg-purple-50 text-purple-600",
      },
    ];
  
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Report Insights
        </h3>
  
        <p className="mt-1 text-sm text-slate-500">
          Key highlights from platform performance.
        </p>
  
        <div className="mt-6 space-y-4">
          {insights.map((item) => {
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
  
                <p className="text-sm font-black text-slate-950">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }