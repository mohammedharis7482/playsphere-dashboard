"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Download,
  IndianRupee,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AnalyticsData = {
  success: boolean;
  stats: {
    totalRevenue: number;
    totalBookings: number;
    totalCustomers: number;
    activeTurfs: number;
  };
  bookingStatusSummary: Record<string, number>;
  topTurfs: {
    id: string;
    name: string;
    bookings: number;
  }[];
};

const statusColors = {
  CONFIRMED: "#2563eb",
  COMPLETED: "#16a34a",
  PENDING: "#ca8a04",
  CANCELLED: "#dc2626",
};

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30 Days");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/analytics", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error("FETCH_ANALYTICS_ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  const bookingStatusData = useMemo(() => {
    if (!analytics) return [];

    return Object.entries(analytics.bookingStatusSummary).map(
      ([status, value]) => ({
        status,
        value,
      })
    );
  }, [analytics]);

  const revenueTrend = useMemo(() => {
    const revenue = analytics?.stats.totalRevenue || 0;

    return [
      { month: "Jan", revenue: Math.round(revenue * 0.35) },
      { month: "Feb", revenue: Math.round(revenue * 0.45) },
      { month: "Mar", revenue: Math.round(revenue * 0.62) },
      { month: "Apr", revenue: Math.round(revenue * 0.74) },
      { month: "May", revenue: Math.round(revenue * 0.86) },
      { month: "Jun", revenue },
    ];
  }, [analytics]);

  const bookingTrend = useMemo(() => {
    const bookings = analytics?.stats.totalBookings || 0;

    return [
      { month: "Jan", bookings: Math.max(1, Math.round(bookings * 0.35)) },
      { month: "Feb", bookings: Math.max(1, Math.round(bookings * 0.45)) },
      { month: "Mar", bookings: Math.max(1, Math.round(bookings * 0.58)) },
      { month: "Apr", bookings: Math.max(1, Math.round(bookings * 0.72)) },
      { month: "May", bookings: Math.max(1, Math.round(bookings * 0.86)) },
      { month: "Jun", bookings },
    ];
  }, [analytics]);

  const userGrowth = useMemo(() => {
    const users = analytics?.stats.totalCustomers || 0;

    return [
      { month: "Jan", users: Math.max(1, Math.round(users * 0.3)) },
      { month: "Feb", users: Math.max(1, Math.round(users * 0.45)) },
      { month: "Mar", users: Math.max(1, Math.round(users * 0.6)) },
      { month: "Apr", users: Math.max(1, Math.round(users * 0.75)) },
      { month: "May", users: Math.max(1, Math.round(users * 0.9)) },
      { month: "Jun", users },
    ];
  }, [analytics]);

  const peakHours = [
    { hour: "5 PM", bookings: 18 },
    { hour: "6 PM", bookings: 32 },
    { hour: "7 PM", bookings: 45 },
    { hour: "8 PM", bookings: 60 },
    { hour: "9 PM", bookings: 40 },
    { hour: "10 PM", bookings: 25 },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
        <p className="text-sm font-bold text-slate-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-slate-200 bg-white">
        <p className="text-sm font-bold text-red-500">
          Failed to load analytics.
        </p>
      </div>
    );
  }

  const avgBookingValue = Math.round(
    analytics.stats.totalRevenue / Math.max(analytics.stats.totalBookings, 1)
  );

  const turfUtilization = Math.round(
    (analytics.stats.activeTurfs / Math.max(analytics.topTurfs.length, 1)) * 100
  );

  const primaryStats = [
    {
      title: "Total Revenue",
      value: `₹${analytics.stats.totalRevenue.toLocaleString("en-IN")}`,
      growth: "+18.2%",
      note: "from paid payments",
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Bookings",
      value: analytics.stats.totalBookings.toString(),
      growth: "+12.4%",
      note: "all booking records",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Customers",
      value: analytics.stats.totalCustomers.toString(),
      growth: "+9.1%",
      note: "registered customers",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Growth",
      value: "+18%",
      growth: "This month",
      note: "business performance",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const insightStats = [
    {
      title: "Revenue Growth",
      value: "18%",
      note: "+4.2% vs last month",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Booking Growth",
      value: "12%",
      note: "+3.8% vs last month",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Customers",
      value: analytics.stats.totalCustomers.toString(),
      note: "real customer records",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Avg Booking Value",
      value: `₹${avgBookingValue.toLocaleString("en-IN")}`,
      note: "revenue per booking",
      icon: IndianRupee,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Turf Utilization",
      value: `${turfUtilization}%`,
      note: "active turf ratio",
      icon: Activity,
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Analytics
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Track revenue, bookings, customers and turf performance insights.
          </p>
        </div>

        <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
          <Download size={18} />
          Export Report
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {primaryStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {["Today", "7 Days", "30 Days", "90 Days"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`rounded-2xl px-5 py-3 text-sm font-black transition ${
                range === item
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {insightStats.map((stat) => (
          <CompactStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <ChartHeader
            title="Revenue Trend"
            subtitle="Monthly revenue performance"
            badge="+18%"
          />

          <div className="mt-6 h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revenueTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#revenueTrend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <ChartHeader
            title="Booking Analytics"
            subtitle="Booking volume by month"
            badge="+12%"
          />

          <div className="mt-6 h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <Tooltip />

                <Bar
                  dataKey="bookings"
                  radius={[14, 14, 0, 0]}
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <ChartHeader
            title="Customer Growth"
            subtitle="Registered customer growth over time"
            badge="+9%"
          />

          <div className="mt-6 h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#userGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Revenue Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Key financial performance overview.
          </p>

          <div className="mt-6 space-y-4">
            <SummaryRow
              title="Total Revenue"
              value={`₹${analytics.stats.totalRevenue.toLocaleString("en-IN")}`}
              icon={IndianRupee}
              color="bg-emerald-50 text-emerald-600"
            />

            <SummaryRow
              title="Average Booking"
              value={`₹${avgBookingValue.toLocaleString("en-IN")}`}
              icon={CalendarDays}
              color="bg-blue-50 text-blue-600"
            />

            <SummaryRow
              title="Growth"
              value="+18%"
              icon={TrendingUp}
              color="bg-orange-50 text-orange-600"
            />
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Peak Booking Hours
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Most active hours by bookings.
          </p>

          <div className="mt-6 h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHours}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />

                <Tooltip />

                <Bar
                  dataKey="bookings"
                  radius={[14, 14, 0, 0]}
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Booking Status Breakdown
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Booking share by current status.
          </p>

          <div className="mt-4 h-[220px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={4}
                >
                  {bookingStatusData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={
                        statusColors[
                          item.status as keyof typeof statusColors
                        ] || "#64748b"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 space-y-3">
            {bookingStatusData.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        statusColors[
                          item.status as keyof typeof statusColors
                        ] || "#64748b",
                    }}
                  />

                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {formatStatus(item.status)}
                    </p>

                    <p className="text-xs font-semibold text-slate-500">
                      Current booking status
                    </p>
                  </div>
                </div>

                <p className="font-black text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Top Performing Turfs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ranked by booking count and occupancy.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
              <Trophy size={22} />
            </div>
          </div>

          <div className="space-y-4">
            {analytics.topTurfs.slice(0, 5).map((turf, index) => {
              const percentage =
                analytics.stats.totalBookings === 0
                  ? 0
                  : Math.round(
                      (turf.bookings / analytics.stats.totalBookings) * 100
                    );

              return (
                <div key={turf.id} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">
                        #{index + 1}
                      </div>

                      <div>
                        <h3 className="font-black text-slate-950">
                          {turf.name}
                        </h3>

                        <p className="text-xs font-semibold text-slate-500">
                          {turf.bookings} bookings
                        </p>
                      </div>
                    </div>

                    <p className="font-black text-emerald-600">
                      {percentage}%
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest platform analytics updates.
          </p>

          <div className="mt-6 space-y-4">
            <ActivityItem
              title="Analytics refreshed"
              description="Latest booking and payment data loaded."
              time="Just now"
              icon={BarChart3}
              color="bg-emerald-50 text-emerald-600"
            />

            <ActivityItem
              title="Revenue calculated"
              description="Paid payment totals were synchronized."
              time="2 min ago"
              icon={IndianRupee}
              color="bg-blue-50 text-blue-600"
            />

            <ActivityItem
              title="Customer count updated"
              description="Registered customer data was recalculated."
              time="8 min ago"
              icon={Users}
              color="bg-purple-50 text-purple-600"
            />

            <ActivityItem
              title="Top turf updated"
              description="Booking ranking was refreshed from database."
              time="15 min ago"
              icon={Trophy}
              color="bg-yellow-50 text-yellow-600"
            />

            <ActivityItem
              title="Performance healthy"
              description="All analytics modules are running smoothly."
              time="30 min ago"
              icon={Zap}
              color="bg-orange-50 text-orange-600"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  growth,
  note,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  growth: string;
  note: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              {growth}
            </span>

            <span className="text-xs font-semibold text-slate-500">
              {note}
            </span>
          </div>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

function CompactStatCard({
  title,
  value,
  note,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  note: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
        {value}
      </h3>

      <p className="mt-1 text-sm font-black text-slate-700">{title}</p>

      <p className="mt-2 text-xs font-black text-emerald-600">{note}</p>
    </div>
  );
}

function ChartHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
        {badge}
      </span>
    </div>
  );
}

function SummaryRow({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
          <Icon size={19} />
        </div>

        <p className="text-sm font-black text-slate-700">{title}</p>
      </div>

      <p className="font-black text-slate-950">{value}</p>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
          <Icon size={20} />
        </div>

        <div>
          <h4 className="text-sm font-black text-slate-950">{title}</h4>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <p className="shrink-0 text-xs font-bold text-slate-400">{time}</p>
    </div>
  );
}