"use client";

import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { notifications } from "@/data/notifications";

interface HeaderProps {
  setSidebarOpen: (value: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-[78px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-black text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              open={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 font-black text-white">
                MH
              </div>

              <div className="hidden sm:block">
                <h4 className="text-sm font-black text-slate-950">
                  Mohammed Haris
                </h4>

                <p className="text-xs font-medium text-slate-500">
                  Super Admin
                </p>
              </div>
            </button>

            <UserDropdown open={showUserMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}