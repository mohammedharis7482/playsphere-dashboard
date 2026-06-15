import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/require-auth";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET() {
  try {
    const session = await requireAuth();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const [
      totalCustomers,
      totalBookings,
      totalTurfs,
      recentBookings,
      payments,
      bookingStatuses,
      paidPayments,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.booking.count(),
      prisma.turf.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.booking.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          customer: true,
          turf: true,
          payment: true,
        },
      }),

      prisma.payment.findMany({
        where: {
          status: "PAID",
        },
      }),

      prisma.booking.groupBy({
        by: ["status"],
        _count: true,
      }),

      prisma.payment.findMany({
        where: {
          status: "PAID",
        },
        select: {
          amount: true,
          createdAt: true,
        },
      }),
    ]);

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const bookingStatusSummary = bookingStatuses.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<string, number>
    );

    const revenueChart = dayNames.map((day) => ({
      day,
      revenue: 0,
    }));

    paidPayments.forEach((payment) => {
      const dayIndex = new Date(payment.createdAt).getDay();
      revenueChart[dayIndex].revenue += payment.amount;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalBookings,
        totalCustomers,
        activeTurfs: totalTurfs,
      },
      operations: {
        bookingsToday: totalBookings,
        pendingPayments: await prisma.payment.count({
          where: {
            status: "PENDING",
          },
        }),
        availableTurfs: totalTurfs,
        unreadAlerts: await prisma.notification.count({
          where: {
            isRead: false,
          },
        }),
      },
      bookingStatusSummary,
      revenueChart,
      recentBookings,
    });
  } catch (error) {
    console.error("DASHBOARD_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}