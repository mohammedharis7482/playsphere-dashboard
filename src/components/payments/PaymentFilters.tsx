"use client";

import { Search, X } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  methodFilter: string;
  setMethodFilter: (value: string) => void;
  onClear: () => void;
}

export default function PaymentFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  onClear,
}: Props) {
  const hasFilters = search || statusFilter !== "All" || methodFilter !== "All";

  return (
    <div className="grid w-full gap-3 xl:max-w-[850px] lg:grid-cols-[minmax(260px,1fr)_150px_150px_auto]">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transaction, customer or turf..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      >
        <option value="All">All Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
        <option value="Refunded">Refunded</option>
      </select>

      <select
        value={methodFilter}
        onChange={(e) => setMethodFilter(e.target.value)}
        className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      >
        <option value="All">All Methods</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Cash">Cash</option>
        <option value="Wallet">Wallet</option>
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