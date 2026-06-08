"use client";

import {
  CalendarDays,
  Mail,
  Phone,
  Shield,
  Ticket,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import { User } from "@/types/user";
import UserAvatar from "./UserAvatar";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export default function ViewUserModal({
  open,
  onClose,
  user,
}: Props) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} title="User Details">
      <div className="space-y-6">
        <div className="rounded-3xl bg-emerald-50 p-5">
          <div className="flex items-center gap-4">
            <UserAvatar name={user.name} />

            <div>
              <h2 className="text-2xl font-black text-slate-950">
                {user.name}
              </h2>

              <div className="mt-2">
                <UserStatusBadge status={user.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem icon={Mail} label="Email" value={user.email} />
          <InfoItem icon={Phone} label="Phone" value={user.phone} />
          <InfoItem icon={Shield} label="Role" value={user.role} />
          <InfoItem
            icon={Ticket}
            label="Bookings"
            value={user.bookings}
          />
          <InfoItem
            icon={CalendarDays}
            label="Joined Date"
            value={user.joinedDate}
          />
          <InfoItem label="User ID" value={`#${user.id}`} />
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
        {Icon && <Icon size={17} />}
        {label}
      </div>

      <p className="mt-2 font-black text-slate-950">
        {value}
      </p>
    </div>
  );
}