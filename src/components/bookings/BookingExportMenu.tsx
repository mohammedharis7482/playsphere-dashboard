"use client";

import {
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

export default function BookingExportMenu() {
  return (
    <div className="flex gap-3">
      <button
        className="
          flex items-center gap-2
          rounded-xl
          border
          px-4 py-2
        "
      >
        <FileSpreadsheet size={16} />
        Excel
      </button>

      <button
        className="
          flex items-center gap-2
          rounded-xl
          border
          px-4 py-2
        "
      >
        <FileText size={16} />
        PDF
      </button>

      <button
        className="
          flex items-center gap-2
          rounded-xl
          border
          px-4 py-2
        "
      >
        <Download size={16} />
        CSV
      </button>
    </div>
  );
}