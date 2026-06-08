import { ReviewStatus } from "@/types/review";

interface Props {
  status: ReviewStatus;
}

export default function ReviewStatusBadge({
  status,
}: Props) {
  const style: Record<ReviewStatus, string> = {
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Flagged: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black ${style[status]}`}
    >
      {status}
    </span>
  );
}