"use client";

import {
  CalendarDays,
  CheckCircle,
  Clock3,
  IndianRupee,
} from "lucide-react";

import { Booking } from "@/types/booking";

interface Props {
  bookings: Booking[];
}

export default function BookingStats({ bookings }: Props) {
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const pending = bookings.filter((b) => b.status === "Pending").length;

  const revenue = bookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    {
      title: "Total Bookings",
      value: total,
      icon: CalendarDays,
      growth: "+12.4%",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: CheckCircle,
      growth: "+8.2%",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      growth: "-2.1%",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Revenue",
      value: `₹${revenue.toLocaleString()}`,
      icon: IndianRupee,
      growth: "+12.5%",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </h3>

                <p className="mt-4 text-xs font-black text-emerald-600">
                  {stat.growth} this month
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}