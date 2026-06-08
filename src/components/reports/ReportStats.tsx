import {
    CalendarCheck,
    Download,
    FileText,
    IndianRupee,
  } from "lucide-react";
  
  import { Report } from "@/types/report";
  
  interface Props {
    reports: Report[];
    totalDownloads: number;
  }
  
  export default function ReportStats({ reports, totalDownloads }: Props) {
    const revenueReports = reports.filter((report) => report.type === "Revenue").length;
    const bookingReports = reports.filter((report) => report.type === "Booking").length;
  
    const stats = [
      {
        title: "Total Reports",
        value: reports.length,
        note: "Generated reports",
        icon: FileText,
        color: "bg-blue-50 text-blue-600",
      },
      {
        title: "Revenue Reports",
        value: revenueReports,
        note: "Financial summaries",
        icon: IndianRupee,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Booking Reports",
        value: bookingReports,
        note: "Booking insights",
        icon: CalendarCheck,
        color: "bg-orange-50 text-orange-600",
      },
      {
        title: "Downloads",
        value: totalDownloads,
        note: "Total downloads",
        icon: Download,
        color: "bg-purple-50 text-purple-600",
      },
    ];
  
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.title}
                  </p>
  
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    {stat.value}
                  </h3>
  
                  <p className="mt-4 text-xs font-black text-emerald-600">
                    {stat.note}
                  </p>
                </div>
  
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
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