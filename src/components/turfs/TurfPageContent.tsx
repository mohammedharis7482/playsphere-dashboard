"use client";

import { useMemo, useState } from "react";

import { Turf } from "@/types/turf";
import { turfs as initialTurfs } from "@/data/turfs";

import TurfStats from "./TurfStats";
import TurfAnalytics from "./TurfAnalytics";
import TurfManagement from "./TurfManagement";
import TurfAvailability from "./TurfAvailability";
import RevenueLeaderboard from "./RevenueLeaderboard";
import TurfPerformanceTable from "./TurfPerformanceTable";
import TurfActivity from "./TurfActivity";

export default function TurfPageContent() {
  const [turfList, setTurfList] = useState<Turf[]>(initialTurfs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTurfs = useMemo(() => {
    return turfList.filter((turf) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        turf.name.toLowerCase().includes(searchValue) ||
        turf.location.toLowerCase().includes(searchValue) ||
        turf.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ? true : turf.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [turfList, search, statusFilter]);

  const handleAddTurf = (turf: Turf) => {
    setTurfList((prev) => [turf, ...prev]);
  };

  const handleUpdateTurf = (updatedTurf: Turf) => {
    setTurfList((prev) =>
      prev.map((turf) =>
        turf.id === updatedTurf.id ? updatedTurf : turf
      )
    );
  };

  const handleDeleteTurf = (id: number) => {
    setTurfList((prev) => prev.filter((turf) => turf.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header - consistent with Bookings page */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Turf Management
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Manage all turfs, availability, bookings and revenue performance.
        </p>
      </div>

      <TurfStats turfs={turfList} />

      <TurfAnalytics turfs={turfList} />

      <TurfManagement
        turfs={filteredTurfs}
        totalTurfs={turfList.length}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddTurf={handleAddTurf}
        onUpdateTurf={handleUpdateTurf}
        onDeleteTurf={handleDeleteTurf}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <TurfAvailability turfs={turfList} />
        <RevenueLeaderboard turfs={turfList} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <TurfPerformanceTable turfs={turfList} />
        <TurfActivity />
      </div>
    </div>
  );
}