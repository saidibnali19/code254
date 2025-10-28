// app/api/profile/route.ts
import { NextResponse, NextRequest } from "next/server";

import { dbConnect } from "@/lib/dbConnect";
import { verifyJWT } from "@/lib/verifyJWT";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // extract token from cookies
    const token = req.cookies.get("accessToken")?.value;

    // In Next route handlers you can also use req.cookies but above accounts for some environments
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const user = await (User as any)
      .findById(decoded.userId)
      .select("-password")
      .lean();
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Normalize _id to string
    const normalized = {
      ...user,
      id: String((user as any)._id || (user as any).id),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({ ok: true, user: normalized });
  } catch (err: any) {
    console.error("GET /api/profile error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { name, bio, avatar } = body;

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const updated = await (User as any)
      .findByIdAndUpdate(
        decoded.userId,
        {
          name,
          bio: bio ?? "",
          avatar: avatar ?? "",
        },
        { new: true },
      )
      .select("-password")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, user: updated });
  } catch (err: any) {
    console.error("PUT /api/profile error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
