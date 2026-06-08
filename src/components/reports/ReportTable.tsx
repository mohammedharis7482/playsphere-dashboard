"use client";

import { Download, Eye, Trash2 } from "lucide-react";

import { Report } from "@/types/report";
import ReportStatusBadge from "./ReportStatusBadge";

interface Props {
  reports: Report[];
  onView: (report: Report) => void;
  onDelete: (id: number) => void;
}

export default function ReportTable({
  reports,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Recent Reports
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Generated platform reports and export history.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full min-w-[980px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-left">
                {[
                  "Report",
                  "Type",
                  "Date Range",
                  "Format",
                  "Status",
                  "Downloads",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className={`px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 ${
                      head === "Actions" ? "text-center" : ""
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-5">
                    <p className="font-black text-slate-950">
                      {report.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Generated {report.generatedAt}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-sm font-bold text-slate-700">
                    {report.type}
                  </td>

                  <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                    {report.dateRange}
                  </td>

                  <td className="px-5 py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                      {report.format}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <ReportStatusBadge status={report.status} />
                  </td>

                  <td className="px-5 py-5 font-black text-slate-950">
                    {report.downloads}
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView(report)}
                        className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={18} />
                      </button>

                      <button className="rounded-xl p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600">
                        <Download size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(report.id)}
                        className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}