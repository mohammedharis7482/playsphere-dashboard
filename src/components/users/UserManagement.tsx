"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { User } from "@/types/user";
import { users as initialUsers } from "@/data/users";

import UserStats from "./UserStats";
import UserTable from "./UserTable";
import ViewUserModal from "./ViewUserModal";
import DeleteUserModal from "./DeleteUserModal";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import BlockUserModal from "./BlockUserModal";

const userGrowthData = [
  { month: "Jan", users: 18 },
  { month: "Feb", users: 24 },
  { month: "Mar", users: 31 },
  { month: "Apr", users: 39 },
  { month: "May", users: 48 },
  { month: "Jun", users: 62 },
];

export default function UserManagement() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);

  const totalUsers = userList.length;

  const activeUsers = userList.filter(
    (user) => user.status === "Active"
  ).length;

  const blockedUsers = userList.filter(
    (user) => user.status === "Blocked"
  ).length;

  const premiumUsers = userList.filter(
    (user) => user.role === "Premium"
  ).length;

  const totalBookings = userList.reduce(
    (sum, user) => sum + user.bookings,
    0
  );

  const activeRate = totalUsers
    ? Math.round((activeUsers / totalUsers) * 100)
    : 0;

  const averageBookings = totalUsers
    ? Math.round(totalBookings / totalUsers)
    : 0;

  const filteredUsers = useMemo(() => {
    return userList.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.phone.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ? true : user.status === statusFilter;

      const matchesRole =
        roleFilter === "All" ? true : user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [userList, search, statusFilter, roleFilter]);

  const handleAddUser = (user: User) => {
    setUserList((prev) => [user, ...prev]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUserList((prev) =>
      prev.filter((user) => user.id !== selectedUser.id)
    );

    setDeleteModal(false);
    setSelectedUser(null);
  };

  const handleBlockUser = () => {
    if (!selectedUser) return;

    setUserList((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );

    setBlockModal(false);
    setSelectedUser(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setRoleFilter("All");
  };

  const hasFilters =
    search || statusFilter !== "All" || roleFilter !== "All";

  return (
    <div className="space-y-8">
      <UserStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        blockedUsers={blockedUsers}
        premiumUsers={premiumUsers}
        totalBookings={totalBookings}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                User Overview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {activeUsers} active users have made {totalBookings} total
                bookings.
              </p>
            </div>

            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              +18.6% Growth
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-700">
                Active Rate
              </p>

              <h4 className="mt-2 text-2xl font-black text-slate-950">
                {activeRate}%
              </h4>
            </div>

            <div className="rounded-3xl bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-700">
                Avg Bookings
              </p>

              <h4 className="mt-2 text-2xl font-black text-slate-950">
                {averageBookings}
              </h4>
            </div>

            <div className="rounded-3xl bg-purple-50 p-4">
              <p className="text-sm font-bold text-purple-700">
                Premium Users
              </p>

              <h4 className="mt-2 text-2xl font-black text-slate-950">
                {premiumUsers}
              </h4>
            </div>
          </div>

          <div className="mt-6 h-[230px] rounded-3xl bg-slate-50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userGrowthData}
                margin={{
                  top: 10,
                  right: 12,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="userGrowthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#0ACF65"
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="95%"
                      stopColor="#0ACF65"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748B",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#94A3B8",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: "#0ACF65",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                  }}
                  formatter={(value) => [`${value} users`, "Users"]}
                  labelStyle={{
                    color: "#0F172A",
                    fontWeight: 800,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#0ACF65"
                  strokeWidth={4}
                  fill="url(#userGrowthGradient)"
                  activeDot={{
                    r: 7,
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    fill: "#0ACF65",
                  }}
                  dot={{
                    r: 4,
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    fill: "#0ACF65",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-slate-950">
            Quick Action
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create a new customer account.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-500">
                Active Users
              </span>

              <span className="font-black text-slate-950">
                {activeUsers}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-500">
                Premium Users
              </span>

              <span className="font-black text-slate-950">
                {premiumUsers}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-bold text-slate-500">
                Blocked Users
              </span>

              <span className="font-black text-red-500">
                {blockedUsers}
              </span>
            </div>
          </div>

          <button
            onClick={() => setAddModal(true)}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                User Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {totalUsers}
                </span>{" "}
                users
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-400">
                Last updated: Today
              </p>
            </div>

            <div className="grid w-full gap-3 xl:max-w-[850px] lg:grid-cols-[minmax(260px,1fr)_150px_150px_auto]">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email or phone..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="All">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Premium">Premium</option>
                <option value="Admin">Admin</option>
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
        </div>

        <div className="p-5 sm:p-6">
          <UserTable
            users={filteredUsers}
            onView={(user) => {
              setSelectedUser(user);
              setViewModal(true);
            }}
            onEdit={(user) => {
              setSelectedUser(user);
              setEditModal(true);
            }}
            onBlock={(user) => {
              setSelectedUser(user);
              setBlockModal(true);
            }}
            onDelete={(user) => {
              setSelectedUser(user);
              setDeleteModal(true);
            }}
          />
        </div>
      </section>

      <AddUserModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onAddUser={handleAddUser}
      />

      <EditUserModal
        open={editModal}
        onClose={() => setEditModal(false)}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />

      <ViewUserModal
        open={viewModal}
        onClose={() => setViewModal(false)}
        user={selectedUser}
      />

      <BlockUserModal
        open={blockModal}
        onClose={() => setBlockModal(false)}
        onConfirm={handleBlockUser}
        user={selectedUser}
      />

      <DeleteUserModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}