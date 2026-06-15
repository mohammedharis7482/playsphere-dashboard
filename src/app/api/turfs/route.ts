import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { turfSchema } from "@/validations/turf.schema";

export async function GET() {
  try {
    const turfs = await prisma.turf.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: turfs,
    });
  } catch (error) {
    console.error("GET_TURFS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch turfs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = turfSchema.parse(body);

    const turf = await prisma.turf.create({
      data: {
        name: validatedData.name,
        location: validatedData.location,
        city: validatedData.city,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl,
        price: validatedData.price,
        status: validatedData.status || "ACTIVE",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Turf created successfully",
        data: turf,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_TURF_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid turf data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create turf",
      },
      { status: 500 }
    );
  }
}