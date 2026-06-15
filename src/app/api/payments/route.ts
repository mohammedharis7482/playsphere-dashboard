import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        booking: {
          include: {
            turf: true,
            customer: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("GET_PAYMENTS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch payments",
      },
      { status: 500 }
    );
  }
}