import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/require-auth";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type PaymentAmount = {
  amount: number;
};

type PaidPayment = {
  amount: number;
  createdAt: Date;
};

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
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      paidPayments,
      pendingPayments,
      unreadAlerts,
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
        select: {
          amount: true,
        },
      }),

      prisma.booking.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.booking.count({
        where: {
          status: "CONFIRMED",
        },
      }),

      prisma.booking.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.booking.count({
        where: {
          status: "CANCELLED",
        },
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

      prisma.payment.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.notification.count({
        where: {
          isRead: false,
        },
      }),
    ]);

    const totalRevenue = (payments as PaymentAmount[]).reduce(
      (sum: number, payment: PaymentAmount) => sum + payment.amount,
      0
    );

    const bookingStatusSummary: Record<string, number> = {
      PENDING: pendingBookings,
      CONFIRMED: confirmedBookings,
      COMPLETED: completedBookings,
      CANCELLED: cancelledBookings,
    };

    const revenueChart = dayNames.map((day) => ({
      day,
      revenue: 0,
    }));

    (paidPayments as PaidPayment[]).forEach((payment: PaidPayment) => {
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
        pendingPayments,
        availableTurfs: totalTurfs,
        unreadAlerts,
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