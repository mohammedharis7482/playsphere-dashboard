import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { updateCustomerSchema } from "@/validations/customer.schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            turf: true,
            payment: true,
          },
        },
        reviews: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("GET_CUSTOMER_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateCustomerSchema.parse(body);

    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        ...validatedData,
        email: validatedData.email || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("UPDATE_CUSTOMER_ERROR", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid customer update data",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update customer" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_CUSTOMER_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete customer" },
      { status: 500 }
    );
  }
}