"use client";

import { Ban, CheckCircle } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { User } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
}

export default function BlockUserModal({
  open,
  onClose,
  onConfirm,
  user,
}: Props) {
  if (!user) return null;

  const isActive = user.status === "Active";
  const action = isActive ? "Block" : "Unblock";
  const Icon = isActive ? Ban : CheckCircle;

  return (
    <Modal open={open} onClose={onClose} title={`${action} User`}>
      <div className="space-y-6 text-center">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl ${
            isActive
              ? "bg-orange-50 text-orange-500"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          <Icon size={30} />
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-950">
            {action} {user.name}?
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {isActive
              ? "This user will be restricted from normal platform actions."
              : "This user will regain access to normal platform actions."}
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-2xl px-5 py-3 font-bold text-white transition ${
              isActive
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {action}
          </button>
        </div>
      </div>
    </Modal>
  );
}