import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { updateBookingSchema } from "@/validations/booking.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        turf: true,
        customer: true,
        payment: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("GET_BOOKING_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateBookingSchema.parse(body);

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
      include: {
        payment: true,
      },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    if (validatedData.turfId) {
      const turf = await prisma.turf.findUnique({
        where: {
          id: validatedData.turfId,
        },
      });

      if (!turf) {
        return NextResponse.json(
          { success: false, message: "Selected turf not found" },
          { status: 404 }
        );
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        turfId: validatedData.turfId ?? existingBooking.turfId,
        bookingDate:
          validatedData.bookingDate ?? existingBooking.bookingDate,
        startTime: validatedData.startTime ?? existingBooking.startTime,
        endTime: validatedData.endTime ?? existingBooking.endTime,
        amount: validatedData.amount ?? existingBooking.amount,
        status: validatedData.status ?? existingBooking.status,
      },
      include: {
        turf: true,
        customer: true,
        payment: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("UPDATE_BOOKING_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking update data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_BOOKING_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete booking" },
      { status: 500 }
    );
  }
}