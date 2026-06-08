"use client";

interface Props {
  range: string;
  setRange: (range: string) => void;
}

export default function AnalyticsFilter({ range, setRange }: Props) {
  const ranges = ["Today", "7 Days", "30 Days", "90 Days"];

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {ranges.map((item) => (
          <button
            key={item}
            onClick={() => setRange(item)}
            className={`rounded-2xl px-5 py-3 text-sm font-black transition ${
              range === item
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}