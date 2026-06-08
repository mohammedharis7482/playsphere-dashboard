"use client";

interface Props {
  view: string;
  setView: (view: string) => void;
}

export default function BookingViewSwitcher({ view, setView }: Props) {
  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
      <button
        onClick={() => setView("table")}
        className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
          view === "table"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-600 hover:bg-white"
        }`}
      >
        Table View
      </button>

      <button
        onClick={() => setView("calendar")}
        className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
          view === "calendar"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-slate-600 hover:bg-white"
        }`}
      >
        Calendar View
      </button>
    </div>
  );
}