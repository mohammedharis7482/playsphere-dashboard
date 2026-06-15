import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { customerSchema } from "@/validations/customer.schema";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        bookings: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("GET_CUSTOMERS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = customerSchema.parse(body);

    const customer = await prisma.customer.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Customer created successfully",
        data: customer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_CUSTOMER_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid customer data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create customer",
      },
      { status: 500 }
    );
  }
}