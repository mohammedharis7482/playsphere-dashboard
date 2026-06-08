import { Report } from "@/types/report";

export const reports: Report[] = [
  {
    id: 1,
    name: "Monthly Revenue Report",
    type: "Revenue",
    dateRange: "Jun 01 - Jun 30",
    format: "PDF",
    status: "Ready",
    generatedAt: "2026-06-08",
    downloads: 18,
  },
  {
    id: 2,
    name: "Booking Performance Report",
    type: "Booking",
    dateRange: "Last 30 Days",
    format: "Excel",
    status: "Ready",
    generatedAt: "2026-06-07",
    downloads: 12,
  },
  {
    id: 3,
    name: "Turf Utilization Report",
    type: "Turf Performance",
    dateRange: "This Month",
    format: "CSV",
    status: "Processing",
    generatedAt: "2026-06-06",
    downloads: 7,
  },
  {
    id: 4,
    name: "User Activity Report",
    type: "User Activity",
    dateRange: "Last 7 Days",
    format: "PDF",
    status: "Ready",
    generatedAt: "2026-06-05",
    downloads: 9,
  },
];