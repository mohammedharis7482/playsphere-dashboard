import Link from "next/link";
import {
  CalendarPlus,
  CreditCard,
  FileText,
  PlusCircle,
  Star,
} from "lucide-react";

const actions = [
  {
    title: "Create Booking",
    href: "/dashboard/bookings",
    icon: CalendarPlus,
  },
  {
    title: "Add Turf",
    href: "/dashboard/turfs",
    icon: PlusCircle,
  },
  {
    title: "View Payments",
    href: "/dashboard/bookings/payments",
    icon: CreditCard,
  },
  {
    title: "Generate Report",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "View Reviews",
    href: "/dashboard/reviews",
    icon: Star,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Frequently used admin shortcuts.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex min-h-[128px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                <Icon size={22} />
              </div>

              <p className="mt-4 text-sm font-black text-slate-800">
                {action.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}