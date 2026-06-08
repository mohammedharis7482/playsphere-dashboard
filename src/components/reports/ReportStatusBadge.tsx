import { ReportStatus } from "@/types/report";

interface Props {
  status: ReportStatus;
}

export default function ReportStatusBadge({ status }: Props) {
  const style: Record<ReportStatus, string> = {
    Ready: "bg-emerald-100 text-emerald-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${style[status]}`}>
      {status}
    </span>
  );
}