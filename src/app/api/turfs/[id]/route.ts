import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { updateTurfSchema } from "@/validations/turf.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const turf = await prisma.turf.findUnique({
      where: { id },
      include: {
        bookings: true,
        reviews: true,
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

    return NextResponse.json({
      success: true,
      data: turf,
    });
  } catch (error) {
    console.error("GET_TURF_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch turf",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateTurfSchema.parse(body);

    const existingTurf = await prisma.turf.findUnique({
      where: { id },
    });

    if (!existingTurf) {
      return NextResponse.json(
        {
          success: false,
          message: "Turf not found",
        },
        { status: 404 }
      );
    }

    const updatedTurf = await prisma.turf.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      message: "Turf updated successfully",
      data: updatedTurf,
    });
  } catch (error) {
    console.error("UPDATE_TURF_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid turf update data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update turf",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const existingTurf = await prisma.turf.findUnique({
      where: { id },
    });

    if (!existingTurf) {
      return NextResponse.json(
        {
          success: false,
          message: "Turf not found",
        },
        { status: 404 }
      );
    }

    await prisma.turf.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Turf deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_TURF_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete turf",
      },
      { status: 500 }
    );
  }
}