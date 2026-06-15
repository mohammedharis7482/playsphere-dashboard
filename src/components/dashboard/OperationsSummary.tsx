"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CalendarCheck,
  CreditCard,
  Trophy,
} from "lucide-react";

type Operations = {
  bookingsToday: number;
  pendingPayments: number;
  availableTurfs: number;
  unreadAlerts: number;
};

type DashboardResponse = {
  success: boolean;
  operations: Operations;
};

const icons = [CalendarCheck, CreditCard, Trophy, Bell];

const items = [
  {
    title: "Bookings Today",
    key: "bookingsToday",
    note: "total booking records",
  },
  {
    title: "Pending Payments",
    key: "pendingPayments",
    note: "needs confirmation",
  },
  {
    title: "Available Turfs",
    key: "availableTurfs",
    note: "ready for booking",
  },
  {
    title: "Unread Alerts",
    key: "unreadAlerts",
    note: "check notifications",
  },
] as const;

export default function OperationsSummary() {
  const [operations, setOperations] = useState<Operations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOperations() {
      try {
        const response = await fetch("/api/dashboard", {
          credentials: "include",
        });

        const data: DashboardResponse = await response.json();

        if (data.success) {
          setOperations(data.operations);
        }
      } catch (error) {
        console.error("FAILED_TO_FETCH_OPERATIONS", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOperations();
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        Today’s Operations
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Live business activity summary.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {loading
          ? [1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[132px] animate-pulse rounded-3xl bg-slate-100"
              />
            ))
          : items.map((item, index) => {
              const Icon = icons[index];
              const value = operations ? operations[item.key] : 0;

              return (
                <div key={item.title} className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-700">
                      {item.title}
                    </p>

                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-3xl font-black text-slate-950">
                    {value}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {item.note}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}