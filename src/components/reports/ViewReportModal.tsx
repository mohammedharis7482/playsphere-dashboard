"use client";

import { Calendar, Download, FileText } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { Report } from "@/types/report";
import ReportStatusBadge from "./ReportStatusBadge";

interface Props {
  open: boolean;
  onClose: () => void;
  report: Report | null;
}

export default function ViewReportModal({
  open,
  onClose,
  report,
}: Props) {
  if (!report) return null;

  return (
    <Modal open={open} onClose={onClose} title="Report Details">
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FileText size={24} />
          </div>

          <h3 className="text-2xl font-black text-slate-950">
            {report.name}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {report.type} report generated for {report.dateRange}.
          </p>

          <div className="mt-4">
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem label="Report Type" value={report.type} />
          <InfoItem label="Format" value={report.format} />
          <InfoItem label="Date Range" value={report.dateRange} />
          <InfoItem label="Downloads" value={report.downloads} />
          <InfoItem label="Generated At" value={report.generatedAt} />
          <InfoItem label="Report ID" value={`#${report.id}`} />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-black text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>

          <button className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>
    </Modal>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
        <Calendar size={17} />
        {label}
      </div>

      <p className="mt-2 font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}