"use client";

import { useMemo, useState } from "react";

import { Booking } from "@/types/booking";
import { bookings as initialBookings } from "@/data/bookings";

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

export default function BookingPageContent() {
  const [bookingList, setBookingList] = useState<Booking[]>(initialBookings);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const revenue = bookingList
    .filter((booking) => booking.paymentStatus === "Paid")
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

  const handleAddBooking = (booking: Booking) => {
    setBookingList((prev) => [booking, ...prev]);
    setCurrentPage(1);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookingList((prev) =>
      prev.filter((booking) => booking.id !== bookingId)
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

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