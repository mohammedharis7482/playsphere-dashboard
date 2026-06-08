"use client";

import { Ban, Eye, Pencil, Trash2 } from "lucide-react";

import { User } from "@/types/user";
import UserAvatar from "./UserAvatar";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onBlock: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onBlock,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100">
      <table className="w-full min-w-[980px]">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200 text-left">
            {[
              "User",
              "Email",
              "Phone",
              "Role",
              "Bookings",
              "Status",
              "Joined",
              "Actions",
            ].map((head) => (
              <th
                key={head}
                className={`px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500 ${
                  head === "Actions" ? "text-center" : ""
                }`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} />

                    <div>
                      <p className="font-black text-slate-950">
                        {user.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        ID #{user.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5 text-sm font-semibold text-slate-700">
                  {user.email}
                </td>

                <td className="px-5 py-5 text-sm text-slate-600">
                  {user.phone}
                </td>

                <td className="px-5 py-5">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">
                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-5 font-black text-slate-950">
                  {user.bookings}
                </td>

                <td className="px-5 py-5">
                  <UserStatusBadge status={user.status} />
                </td>

                <td className="px-5 py-5 text-sm font-semibold text-slate-600">
                  {user.joinedDate}
                </td>

                <td className="px-5 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(user)}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(user)}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onBlock(user)}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      <Ban size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(user)}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <div className="flex min-h-[260px] flex-col items-center justify-center bg-slate-50 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-2xl">
                    👤
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-950">
                    No users found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}