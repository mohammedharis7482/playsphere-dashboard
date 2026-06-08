"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Turf } from "@/types/turf";

import TurfCard from "./TurfCard";
import TurfFilters from "./TurfFilters";
import AddTurfModal from "./AddTurfModal";
import EditTurfModal from "./EditTurfModal";
import ViewTurfModal from "./ViewTurfModal";
import ConfirmDeleteTurfModal from "./ConfirmDeleteTurfModal";

interface Props {
  turfs: Turf[];
  totalTurfs: number;
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  onAddTurf: (turf: Turf) => void;
  onUpdateTurf: (turf: Turf) => void;
  onDeleteTurf: (id: number) => void;
}

export default function TurfManagement({
  turfs,
  totalTurfs,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onAddTurf,
  onUpdateTurf,
  onDeleteTurf,
}: Props) {
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [sortBy, setSortBy] = useState("Newest");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const sortedTurfs = useMemo(() => {
    return [...turfs].sort((a, b) => {
      if (sortBy === "Revenue") return b.revenue - a.revenue;
      if (sortBy === "Bookings") return b.bookings - a.bookings;
      if (sortBy === "Occupancy") return b.occupancy - a.occupancy;
      if (sortBy === "Availability")
        return b.availability - a.availability;

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [turfs, sortBy]);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSortBy("Newest");
  };

  const handleConfirmDelete = () => {
    if (!selectedTurf) return;

    onDeleteTurf(selectedTurf.id);
    setOpenDelete(false);
    setSelectedTurf(null);
  };

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-end 2xl:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Featured Turfs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-800">
                {turfs.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-800">
                {totalTurfs}
              </span>{" "}
              turfs
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 2xl:max-w-[850px] 2xl:flex-row">
            <TurfFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClear={handleClearFilters}
            />

            <button
              onClick={() => setOpenAdd(true)}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
            >
              <Plus size={18} />
              Add Turf
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {sortedTurfs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {sortedTurfs.map((turf) => (
              <TurfCard
                key={turf.id}
                turf={turf}
                onView={() => {
                  setSelectedTurf(turf);
                  setOpenView(true);
                }}
                onEdit={() => {
                  setSelectedTurf(turf);
                  setOpenEdit(true);
                }}
                onDelete={() => {
                  setSelectedTurf(turf);
                  setOpenDelete(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-2xl">
              🏟️
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-950">
              No turfs found
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Try changing your search, status filter, or sorting options.
            </p>

            <button
              onClick={handleClearFilters}
              className="mt-5 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <AddTurfModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAddTurf={onAddTurf}
      />

      <EditTurfModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        turf={selectedTurf}
        onSave={onUpdateTurf}
      />

      <ViewTurfModal
        open={openView}
        onClose={() => setOpenView(false)}
        turf={selectedTurf}
        onEdit={() => {
          setOpenView(false);
          setOpenEdit(true);
        }}
        onDelete={() => {
          setOpenView(false);
          setOpenDelete(true);
        }}
      />

      <ConfirmDeleteTurfModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}