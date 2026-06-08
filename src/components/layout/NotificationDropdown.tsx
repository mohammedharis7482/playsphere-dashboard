"use client";

import Link from "next/link";
import {
  Bell,
  CalendarCheck,
  CreditCard,
  UserPlus,
  Wrench,
  FileText,
} from "lucide-react";

import { notifications } from "@/data/notifications";
import { NotificationType } from "@/types/notification";

interface Props {
  open: boolean;
  onClose?: () => void;
}

const iconMap: Record<NotificationType, React.ElementType> = {
  Booking: CalendarCheck,
  Payment: CreditCard,
  User: UserPlus,
  Turf: Wrench,
  System: FileText,
};

const styleMap: Record<NotificationType, string> = {
  Booking: "bg-emerald-50 text-emerald-600",
  Payment: "bg-blue-50 text-blue-600",
  User: "bg-purple-50 text-purple-600",
  Turf: "bg-orange-50 text-orange-600",
  System: "bg-slate-100 text-slate-600",
};

export default function NotificationDropdown({ open, onClose }: Props) {
  if (!open) return null;

  const latest = notifications.slice(0, 5);
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="absolute right-0 top-14 z-50 w-[360px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Notifications
          </h3>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {unreadCount} unread alerts
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Bell size={20} />
        </div>
      </div>

      <div className="max-h-[380px] overflow-y-auto p-3">
        {latest.map((item) => {
          const Icon = iconMap[item.type];

          return (
            <div
              key={item.id}
              className="flex gap-3 rounded-3xl p-3 transition hover:bg-slate-50"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styleMap[item.type]}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-950">
                    {item.title}
                  </h4>

                  {!item.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  )}
                </div>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>

                <p className="mt-1 text-xs font-bold text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-3">
        <Link
          href="/dashboard/notifications"
          onClick={onClose}
          className="flex h-12 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white transition hover:bg-emerald-600"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
}