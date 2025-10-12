import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/dbConnect";
import RefreshToken from "@/models/RefreshToken";

export async function POST() {
  try {
    await dbConnect();

    const refreshId = cookies().get("refreshtoken")?.value;
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
