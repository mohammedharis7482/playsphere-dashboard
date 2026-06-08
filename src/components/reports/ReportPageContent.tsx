"use client";

import { useMemo, useState } from "react";

import { reports as initialReports } from "@/data/reports";
import { Report } from "@/types/report";

import ReportStats from "./ReportStats";
import ReportGenerator from "./ReportGenerator";
import ReportInsights from "./ReportInsights";
import ReportTable from "./ReportTable";
import ViewReportModal from "./ViewReportModal";
import ReportActivity from "./ReportActivity";

export default function ReportPageContent() {
  const [reportList, setReportList] = useState<Report[]>(initialReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewModal, setViewModal] = useState(false);

  const totalDownloads = useMemo(() => {
    return reportList.reduce((sum, report) => sum + report.downloads, 0);
  }, [reportList]);

  const handleGenerateReport = (report: Report) => {
    setReportList((prev) => [report, ...prev]);
  };

  const handleDeleteReport = (id: number) => {
    setReportList((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="space-y-8">
      <ReportStats reports={reportList} totalDownloads={totalDownloads} />

      <div className="grid gap-6 xl:grid-cols-[1fr,380px]">
        <ReportGenerator onGenerate={handleGenerateReport} />
        <ReportInsights />
      </div>

      <ReportTable
        reports={reportList}
        onView={(report) => {
          setSelectedReport(report);
          setViewModal(true);
        }}
        onDelete={handleDeleteReport}
      />

      <ReportActivity />

      <ViewReportModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        report={selectedReport}
      />
    </div>
  );
}