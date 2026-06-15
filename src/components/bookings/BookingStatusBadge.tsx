interface BookingStatusBadgeProps {
  status: string;
}

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          styles[status as keyof typeof styles] ||
          "bg-slate-100 text-slate-700"
        }
      `}
    >
      {label}
    </span>
  );
}