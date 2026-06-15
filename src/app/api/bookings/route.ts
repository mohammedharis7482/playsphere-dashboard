import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/validations/booking.schema";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        turf: true,
        customer: true,
        payment: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("GET_BOOKINGS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = bookingSchema.parse(body);

    const turf = await prisma.turf.findUnique({
      where: {
        id: validatedData.turfId,
      },
    });

    if (!turf) {
      return NextResponse.json(
        {
          success: false,
          message: "Turf not found",
        },
        { status: 404 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: validatedData.customerId,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        turfId: validatedData.turfId,
        status: {
          not: "CANCELLED",
        },
        startTime: {
          lt: validatedData.endTime,
        },
        endTime: {
          gt: validatedData.startTime,
        },
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "This time slot is already booked",
        },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        turfId: validatedData.turfId,
        customerId: validatedData.customerId,
        bookingDate: validatedData.bookingDate,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        amount: validatedData.amount,
        status: validatedData.status || "PENDING",
        payment: {
          create: {
            amount: validatedData.amount,
            method: "CASH",
            status: "PENDING",
          },
        },
      },
      include: {
        turf: true,
        customer: true,
        payment: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_BOOKING_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 }
    );
  }
}