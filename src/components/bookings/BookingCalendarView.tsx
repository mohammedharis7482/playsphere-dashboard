"use client";

const bookings = [
  {
    id: 1,
    turf: "Football Turf A",
    time: "06:00 PM",
    customer: "Rahul Kumar",
  },
  {
    id: 2,
    turf: "Cricket Turf",
    time: "07:00 PM",
    customer: "Arjun Nair",
  },
  {
    id: 3,
    turf: "Badminton Court",
    time: "08:00 PM",
    customer: "Mohammed Ali",
  },
];

export default function BookingCalendarView() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-950">
          Calendar View
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Daily booking schedule
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div>
              <h4 className="font-black text-slate-950">
                {booking.turf}
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                {booking.customer}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-600">
              {booking.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}