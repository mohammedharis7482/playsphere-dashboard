"use client";

import { useState } from "react";
import { FilePlus } from "lucide-react";

import {
  Report,
  ReportFormat,
  ReportType,
} from "@/types/report";

interface Props {
  onGenerate: (report: Report) => void;
}

export default function ReportGenerator({ onGenerate }: Props) {
  const [type, setType] = useState<ReportType>("Revenue");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [format, setFormat] = useState<ReportFormat>("PDF");

  const handleGenerate = () => {
    const newReport: Report = {
      id: Date.now(),
      name: `${type} Report`,
      type,
      dateRange,
      format,
      status: "Ready",
      generatedAt: new Date().toISOString().split("T")[0],
      downloads: 0,
    };

    onGenerate(newReport);
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Report Generator
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create custom reports for bookings, revenue and platform performance.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Report Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as ReportType)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="Revenue">Revenue</option>
            <option value="Booking">Booking</option>
            <option value="Turf Performance">Turf Performance</option>
            <option value="User Activity">User Activity</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Date Range
          </label>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Format
          </label>

          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as ReportFormat)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
            <option value="CSV">CSV</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
      >
        <FilePlus size={18} />
        Generate Report
      </button>
    </div>
  );
}