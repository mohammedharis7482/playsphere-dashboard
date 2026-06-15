import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PaymentAmount = {
  amount: number;
};

type TurfWithBookings = {
  id: string;
  name: string;
  bookings: unknown[];
};

export async function GET() {
  try {
    const [
      totalCustomers,
      totalBookings,
      activeTurfs,
      payments,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      turfs,
    ] = await Promise.all([
      prisma.customer.count(),

      prisma.booking.count(),

      prisma.turf.count({
        where: {
          status: "ACTIVE",
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

      prisma.turf.findMany({
        select: {
          id: true,
          name: true,
          bookings: {
            select: {
              id: true,
            },
          },
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

    const topTurfs = (turfs as TurfWithBookings[])
      .map((turf) => ({
        id: turf.id,
        name: turf.name,
        bookings: turf.bookings.length,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    return NextResponse.json({
      success: true,

      stats: {
        totalRevenue,
        totalBookings,
        totalCustomers,
        activeTurfs,
      },

      bookingStatusSummary,

      topTurfs,
    });
  } catch (error) {
    console.error("ANALYTICS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch analytics",
      },
      { status: 500 }
    );
  }
}