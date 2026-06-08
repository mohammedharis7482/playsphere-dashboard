"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { notifications as initialNotifications } from "../../data/notifications";
import { AppNotification } from "../../types/notification";

import NotificationStats from "./NotificationStats";
import NotificationFeed from "./NotificationFeed";
import NotificationSummary from "./NotificationSummary";
import ViewNotificationModal from "./ViewNotificationModal";

export default function NotificationPageContent() {
  const [notificationList, setNotificationList] =
    useState<AppNotification[]>(initialNotifications);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedNotification, setSelectedNotification] =
    useState<AppNotification | null>(null);

  const [viewModal, setViewModal] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notificationList.filter((item: AppNotification) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "All" ? true : item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Unread"
          ? !item.read
          : item.read;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [notificationList, search, typeFilter, statusFilter]);

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
  };

  const hasFilters =
    search || typeFilter !== "All" || statusFilter !== "All";

  return (
    <div className="space-y-8">
      <NotificationStats notifications={notificationList} />

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Notification Feed
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredNotifications.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {notificationList.length}
                </span>{" "}
                notifications
              </p>
            </div>

            <button
              onClick={markAllAsRead}
              className="h-12 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
            >
              Mark All Read
            </button>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(260px,1fr)_150px_150px_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="All">All Types</option>
              <option value="Booking">Booking</option>
              <option value="Payment">Payment</option>
              <option value="User">User</option>
              <option value="Turf">Turf</option>
              <option value="System">System</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="All">All Status</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[1fr,360px]">
          <NotificationFeed
            notifications={filteredNotifications}
            onView={(item: AppNotification) => {
              setSelectedNotification(item);
              setViewModal(true);
            }}
            onMarkRead={markAsRead}
            onDelete={deleteNotification}
          />

          <NotificationSummary notifications={notificationList} />
        </div>
      </section>

      <ViewNotificationModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        notification={selectedNotification}
      />
    </div>
  );
}