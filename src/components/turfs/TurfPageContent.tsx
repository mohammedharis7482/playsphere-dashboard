"use client";

import { useEffect, useMemo, useState } from "react";

import { Turf } from "@/types/turf";

import TurfStats from "./TurfStats";
import TurfAnalytics from "./TurfAnalytics";
import TurfManagement from "./TurfManagement";
import TurfAvailability from "./TurfAvailability";
import RevenueLeaderboard from "./RevenueLeaderboard";
import TurfPerformanceTable from "./TurfPerformanceTable";
import TurfActivity from "./TurfActivity";

type ApiTurf = {
  id: string;
  name: string;
  location: string;
  city?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  price: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  createdAt: string;
  updatedAt: string;
};

export default function TurfPageContent() {
  const [turfList, setTurfList] = useState<Turf[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchTurfs() {
      try {
        const response = await fetch("/api/turfs", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          const formattedTurfs: Turf[] = data.data.map((turf: ApiTurf) => ({
            id: turf.id,
            name: turf.name,
            location: turf.location,
            type: "Football",
            status: turf.status,
            image: turf.imageUrl || "/images/turfs/turf-1.jpg",
            price: turf.price,
            revenue: turf.price * 10,
            bookings: 10,
            occupancy: 80,
            availability: 90,
            rating: 4.7,
            createdAt: turf.createdAt,
          }));

          setTurfList(formattedTurfs);
        }
      } catch (error) {
        console.error("FETCH_TURFS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTurfs();
  }, []);

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
      prev.map((turf) => (turf.id === updatedTurf.id ? updatedTurf : turf))
    );
  };

  const handleDeleteTurf = (id: string) => {
    setTurfList((prev) => prev.filter((turf) => turf.id !== id));
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
        <p className="text-sm font-bold text-slate-500">Loading turfs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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