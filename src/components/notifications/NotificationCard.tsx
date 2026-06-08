"use client";

import {
  CalendarCheck,
  CreditCard,
  Eye,
  FileText,
  Trash2,
  UserPlus,
  Wrench,
  Check,
} from "lucide-react";

import {
    AppNotification,
    NotificationType,
  } from "../../types/notification";

interface Props {
  notification: AppNotification;
  onView: (item: AppNotification) => void;
  onMarkRead: (id: number) => void;
  onDelete: (id: number) => void;
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

export default function NotificationCard({
  notification,
  onView,
  onMarkRead,
  onDelete,
}: Props) {
  const Icon = iconMap[notification.type];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styleMap[notification.type]}`}
        >
          <Icon size={20} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-black text-slate-950">
              {notification.title}
            </h4>

            {!notification.read && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-700">
                Unread
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {notification.description}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
              {notification.type}
            </span>

            <span className="text-xs font-bold text-slate-400">
              {notification.time}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => onView(notification)}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Eye size={18} />
        </button>

        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
          >
            <Check size={18} />
          </button>
        )}

        <button
          onClick={() => onDelete(notification.id)}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}