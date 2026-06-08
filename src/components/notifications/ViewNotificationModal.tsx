"use client";

import {
  CalendarCheck,
  CreditCard,
  FileText,
  UserPlus,
  Wrench,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import {
    AppNotification,
    NotificationType,
  } from "../../types/notification";

interface Props {
  open: boolean;
  onClose: () => void;
  notification: AppNotification | null;
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

export default function ViewNotificationModal({
  open,
  onClose,
  notification,
}: Props) {
  if (!notification) return null;

  const Icon = iconMap[notification.type];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Notification Details"
    >
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${styleMap[notification.type]}`}
          >
            <Icon size={24} />
          </div>

          <h3 className="text-2xl font-black text-slate-950">
            {notification.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {notification.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
              {notification.type}
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
              {notification.time}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                notification.read
                  ? "bg-slate-100 text-slate-600"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {notification.read ? "Read" : "Unread"}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}