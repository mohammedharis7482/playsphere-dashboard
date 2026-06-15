import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: {
      email: "admin@playsphere.com",
    },
  });

  if (!user) {
    return NextResponse.json({
      userFound: false,
      passwordMatch: false,
    });
  }

  const passwordMatch = await bcrypt.compare("admin123", user.password || "");

  return NextResponse.json({
    userFound: true,
    email: user.email,
    role: user.role,
    hasPassword: Boolean(user.password),
    passwordMatch,
  });
}