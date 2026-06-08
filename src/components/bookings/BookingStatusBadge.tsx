interface BookingStatusBadgeProps {
    status: string;
  }
  
  export default function BookingStatusBadge({
    status,
  }: BookingStatusBadgeProps) {
    const styles = {
      Confirmed:
        "bg-blue-100 text-blue-700",
  
      Completed:
        "bg-green-100 text-green-700",
  
      Pending:
        "bg-yellow-100 text-yellow-700",
  
      Cancelled:
        "bg-red-100 text-red-700",
    };
  
    return (
      <span
        className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${
            styles[
              status as keyof typeof styles
            ] ||
            "bg-slate-100 text-slate-700"
          }
        `}
      >
        {status}
      </span>
    );
  }