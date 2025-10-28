import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import RefreshToken from "@/models/RefreshToken";
import { getCookie } from "@/lib/jwt";

export async function POST() {
  try {
    await dbConnect();

    const refreshId = await getCookie("refreshToken");

    if (refreshId) {
      await RefreshToken.deleteOne({ tokenId: refreshId });
    }

    const res = NextResponse.json({ ok: true, message: "Logged out" });
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 },
    );
  }
}
