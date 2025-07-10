// in app/api/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      companyName,
      companyWebsite,
      phone
    } = body;

    if (!email || !password || !firstName || !lastName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const fullName = `${firstName} ${lastName}`;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
        companyName,
        companyWebsite,
        phone,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    // Gérer le cas où l'email existe déjà
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
         return new NextResponse("User with this email already exists", { status: 409 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}