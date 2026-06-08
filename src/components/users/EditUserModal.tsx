"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { User, UserRole, UserStatus } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

export default function EditUserModal({
  open,
  onClose,
  user,
  onUpdateUser,
}: Props) {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  if (!formData) return null;

  const inputClass =
    "w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateUser(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit User">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={inputClass}
            />
          </Field>

          <Field label="Joined Date">
            <input
              type="date"
              value={formData.joinedDate}
              onChange={(e) =>
                setFormData({ ...formData, joinedDate: e.target.value })
              }
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role">
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as UserRole,
                })
              }
              className={inputClass}
            >
              <option value="Customer">Customer</option>
              <option value="Premium">Premium</option>
              <option value="Admin">Admin</option>
            </select>
          </Field>

          <Field label="Status">
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as UserStatus,
                })
              }
              className={inputClass}
            >
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </Field>
        </div>

        <Field label="Bookings">
          <input
            type="number"
            value={formData.bookings}
            onChange={(e) =>
              setFormData({
                ...formData,
                bookings: Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-white transition hover:bg-emerald-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}