"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import { Booking } from "@/types/booking";

import BookingStats from "./BookingStats";
import BookingRevenueCard from "./BookingRevenueCard";
import BookingAnalyticsCard from "./BookingAnalyticsCard";
import BookingActivity from "./BookingActivity";
import BookingViewSwitcher from "./BookingViewSwitcher";
import BookingCalendarView from "./BookingCalendarView";
import BookingTable from "./BookingTable";
import BookingFilters from "./BookingFilters";
import BookingPagination from "./BookingPagination";

const ITEMS_PER_PAGE = 5;
const BOOKINGS_API = "/api/bookings";

type ApiBooking = {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: Booking["status"];
  createdAt: string;
  customer: {
    name: string;
    phone: string;
  };
  turf: {
    name: string;
  };
  payment: {
    status: Booking["paymentStatus"];
  } | null;
};

type BookingsResponse = {
  success: boolean;
  data: ApiBooking[];
  message?: string;
};

function formatBooking(booking: ApiBooking): Booking {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  const duration =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  return {
    id: booking.id,
    customerName: booking.customer.name,
    customerPhone: booking.customer.phone,
    turfName: booking.turf.name,
    date: booking.bookingDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
    duration,
    amount: booking.amount,
    status: booking.status,
    paymentStatus: booking.payment?.status || "PENDING",
    createdAt: booking.createdAt,
  };
}

export default function BookingPageContent() {
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    error,
  } = useSWR<BookingsResponse>(BOOKINGS_API);

  const bookingList = useMemo(() => {
    if (!data?.success) return [];
    return data.data.map(formatBooking);
  }, [data]);

  const revenue = bookingList
    .filter((booking) => booking.paymentStatus === "PAID")
    .reduce((total, booking) => total + booking.amount, 0);

  const filteredBookings = useMemo(() => {
    return bookingList.filter((booking) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        booking.customerName.toLowerCase().includes(searchValue) ||
        booking.turfName.toLowerCase().includes(searchValue) ||
        booking.customerPhone.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ? true : booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookingList, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  );

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddBooking = async () => {
    setCurrentPage(1);
    await mutate(BOOKINGS_API);
  };

  const handleUpdateBooking = async () => {
    await mutate(BOOKINGS_API);
  };

  const handleDeleteBooking = async () => {
    await mutate(BOOKINGS_API);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  if (isLoading) {
    return <BookingPageSkeleton />;
  }

  if (error || data?.success === false) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[28px] border border-red-100 bg-red-50">
        <p className="text-sm font-bold text-red-500">
          {data?.message || "Failed to load bookings."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BookingStats bookings={bookingList} />

      <div className="grid gap-6 xl:grid-cols-3">
        <BookingRevenueCard revenue={revenue} />

        <div className="xl:col-span-2">
          <BookingAnalyticsCard />
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <BookingFilters
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            statusFilter={statusFilter}
            setStatusFilter={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            onClear={handleClearFilters}
          />

          <BookingViewSwitcher view={view} setView={setView} />
        </div>
      </div>

      {view === "table" ? (
        <>
          <BookingTable
            bookings={paginatedBookings}
            totalBookings={filteredBookings.length}
            onAddBooking={handleAddBooking}
            onUpdateBooking={handleUpdateBooking}
            onDeleteBooking={handleDeleteBooking}
          />

          <BookingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <BookingCalendarView />
      )}

      <BookingActivity />
    </div>
  );
}

function BookingPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[150px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm"
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="h-[260px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm" />
        <div className="h-[260px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm xl:col-span-2" />
      </div>

      <div className="h-[86px] animate-pulse rounded-[28px] border border-slate-200 bg-white shadow-sm" />

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="h-[110px] animate-pulse border-b border-slate-100 bg-white" />

        <div className="p-5 sm:p-6">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <div className="grid grid-cols-7 gap-4 border-b border-slate-100 bg-slate-50 p-5">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 rounded-full bg-slate-200"
                />
              ))}
            </div>

            <div className="divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-4 p-5">
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="h-4 animate-pulse rounded-full bg-slate-100"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}