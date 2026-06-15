import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCustomers,
      totalBookings,
      activeTurfs,
      payments,
      bookingStatuses,
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
      }),

      prisma.booking.groupBy({
        by: ["status"],
        _count: true,
      }),

      prisma.turf.findMany({
        include: {
          bookings: true,
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

    const topTurfs = turfs
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