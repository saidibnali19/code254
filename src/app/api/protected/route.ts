import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) throw new Error("No token");

    const decoded = verifyToken<{ userId: string }>(token);
    return NextResponse.json({
      ok: true,
      message: "Access granted",
      user: decoded,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }
}
