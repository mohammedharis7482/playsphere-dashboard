"use client";

import { BellOff } from "lucide-react";

import { AppNotification } from "../../types/notification";
import NotificationCard from "./NotificationCard";

interface Props {
  notifications: AppNotification[];
  onView: (item: AppNotification) => void;
  onMarkRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function NotificationFeed({
  notifications,
  onView,
  onMarkRead,
  onDelete,
}: Props) {
  if (notifications.length === 0) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl bg-slate-50 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
          <BellOff size={28} />
        </div>

        <h3 className="mt-5 text-xl font-black text-slate-950">
          No notifications found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onView={onView}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}