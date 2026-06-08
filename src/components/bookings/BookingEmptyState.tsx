import { CalendarX } from "lucide-react";

export default function BookingEmptyState() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-16
        text-center
      "
    >
      <div
        className="
          mb-4
          rounded-full
          bg-slate-100
          p-5
        "
      >
        <CalendarX
          size={40}
          className="text-slate-400"
        />
      </div>

      <h3
        className="
          text-xl
          font-bold
          text-slate-900
        "
      >
        No bookings found
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-slate-500
        "
      >
        There are currently no bookings
        matching your search or filter.
      </p>
    </div>
  );
}