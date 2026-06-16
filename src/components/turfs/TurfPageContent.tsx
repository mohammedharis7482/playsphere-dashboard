"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import { Turf } from "@/types/turf";

import TurfStats from "./TurfStats";
import TurfAnalytics from "./TurfAnalytics";
import TurfManagement from "./TurfManagement";
import TurfAvailability from "./TurfAvailability";
import RevenueLeaderboard from "./RevenueLeaderboard";
import TurfPerformanceTable from "./TurfPerformanceTable";
import TurfActivity from "./TurfActivity";

const TURFS_API = "/api/turfs";

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

type TurfsResponse = {
  success: boolean;
  data: ApiTurf[];
  message?: string;
};

function formatTurf(turf: ApiTurf): Turf {
  return {
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
    availability: turf.status === "ACTIVE" ? 90 : 0,
    rating: 4.7,
    createdAt: turf.createdAt,
  };
}

export default function TurfPageContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const {
    data,
    isLoading,
    error,
  } = useSWR<TurfsResponse>(TURFS_API);

  const turfList = useMemo(() => {
    if (!data?.success) return [];
    return data.data.map(formatTurf);
  }, [data]);

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

  const handleAddTurf = async () => {
    await mutate(TURFS_API);
  };

  const handleUpdateTurf = async () => {
    await mutate(TURFS_API);
  };

  const handleDeleteTurf = async () => {
    await mutate(TURFS_API);
  };

  if (isLoading) {
    return <TurfPageSkeleton />;
  }

  if (error || data?.success === false) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-red-100 bg-red-50">
        <p className="text-sm font-bold text-red-500">
          {data?.message || "Failed to load turfs."}
        </p>
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

function TurfPageSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-64 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[150px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm"
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-[340px] animate-pulse rounded-[32px] border border-slate-200 bg-white shadow-sm" />
        <div className="h-[340px] animate-pulse rounded-[32px] border border-slate-200 bg-white shadow-sm" />
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="h-[120px] animate-pulse border-b border-slate-100 bg-white" />

        <div className="grid gap-5 p-5 md:grid-cols-2 2xl:grid-cols-3 sm:p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[390px] animate-pulse rounded-[28px] border border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-[340px] animate-pulse rounded-[32px] border border-slate-200 bg-white shadow-sm" />
        <div className="h-[340px] animate-pulse rounded-[32px] border border-slate-200 bg-white shadow-sm" />
      </div>
    </div>
  );
}