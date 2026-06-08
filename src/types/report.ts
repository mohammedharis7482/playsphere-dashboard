export type ReportType =
  | "Revenue"
  | "Booking"
  | "Turf Performance"
  | "User Activity";

export type ReportFormat = "PDF" | "Excel" | "CSV";

export type ReportStatus = "Ready" | "Processing" | "Failed";

export interface Report {
  id: number;
  name: string;
  type: ReportType;
  dateRange: string;
  format: ReportFormat;
  status: ReportStatus;
  generatedAt: string;
  downloads: number;
}