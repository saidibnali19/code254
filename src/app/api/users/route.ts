import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const users = await (User as any).find();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    const newUser = await (User as any).create({ name, email, password });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
