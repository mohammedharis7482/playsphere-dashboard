import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            turf: true,
            customer: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("GET_PAYMENT_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        status: body.status,
        method: body.method,
        transactionId: body.transactionId,
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
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    console.error("UPDATE_PAYMENT_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to update payment" },
      { status: 500 }
    );
  }
}