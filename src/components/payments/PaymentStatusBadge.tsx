import { PaymentStatus } from "@/types/payment";

interface Props {
  status: PaymentStatus;
}

export default function PaymentStatusBadge({ status }: Props) {
  const style: Record<PaymentStatus, string> = {
    Paid: "bg-emerald-100 text-emerald-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${style[status]}`}>
      {status}
    </span>
  );
}