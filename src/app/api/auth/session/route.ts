import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "No token provided" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const user = await (User as any)
      .findById(decoded.userId)
      .select("name email");
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user._id,
        name: user.name, // 👈 this ensures name is returned
        email: user.email,
      },
    });
  } catch (err: any) {
    console.error("Session error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 },
    );
  }
}
