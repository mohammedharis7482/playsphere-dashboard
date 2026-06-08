"use client";

import { Search, X } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onClear: () => void;
}

export default function BookingFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onClear,
}: Props) {
  const hasFilters = search || statusFilter !== "All";

  return (
    <div className="grid w-full gap-3 lg:grid-cols-[minmax(260px,1fr)_170px_auto]">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer, phone or turf..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      >
        <option value="All">All Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {hasFilters && (
        <button
          onClick={onClear}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
        >
          <X size={16} />
          Clear
        </button>
      )}
    </div>
  );
}