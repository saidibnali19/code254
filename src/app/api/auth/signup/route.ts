import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "All fields required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "Email already registered" },
        { status: 400 },
      );
    }

    const newUser = await User.create({ name, email, password });

    // Create token
    const accesstoken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    const refreshtoken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    return NextResponse.json({
      ok: true,
      user: { name: newUser.name, email: newUser.email },
      accessToken: accesstoken,
      refreshToken: refreshtoken,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
