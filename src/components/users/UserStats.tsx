import {
  CalendarDays,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

interface Props {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  premiumUsers: number;
  totalBookings: number;
}

export default function UserStats({
  totalUsers,
  activeUsers,
  blockedUsers,
  premiumUsers,
  totalBookings,
}: Props) {
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      growth: "+10.4%",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "bg-emerald-50 text-emerald-600",
      growth: "+8.7%",
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: UserX,
      color: "bg-red-50 text-red-600",
      growth: "-1.2%",
    },
    {
      title: "Premium Users",
      value: premiumUsers,
      icon: ShieldCheck,
      color: "bg-purple-50 text-purple-600",
      growth: "+6.3%",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {item.value}
                </h3>

                <p className="mt-4 text-xs font-black text-emerald-600">
                  {item.growth} this month
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color}`}
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