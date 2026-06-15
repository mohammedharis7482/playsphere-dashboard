"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Turfs",
    href: "/dashboard/turfs",
    icon: Trophy,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-[270px]
          border-r border-slate-200 bg-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-7">
            <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
              <h1 className="text-[34px] font-black leading-none tracking-[-0.04em] text-slate-950">
                PlaySphere
              </h1>

              <p className="mt-3 text-sm font-medium text-slate-500">
                Turf Booking Admin
              </p>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      group flex items-center gap-3 rounded-2xl px-4 py-3.5
                      text-sm font-bold transition-all duration-200
                      ${
                        isActive
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex h-9 w-9 items-center justify-center rounded-xl transition
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-emerald-600"
                        }
                      `}
                    >
                      <Icon size={18} />
                    </span>

                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-black text-white shadow-lg shadow-emerald-500/20">
                  MH
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-black text-slate-950">
                    Mohammed Haris
                  </h4>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Super Admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}