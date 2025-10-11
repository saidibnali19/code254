import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/dbConnect";
import RefreshToken from "@/models/RefreshToken";
import { signToken } from "@/lib/jwt";

export async function POST() {
    try {
        await dbConnect();

        const refreshId = cookies().get("refreshToken")?.value;
        if (!refreshId)
            return NextResponse.json(
                { ok: false, error: "No refresh token" },
                { status: 401 }
            );

        const tokenDoc = await RefreshToken.findOne({ tokenId: refreshId });
        if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
            return NextResponse.json(
                { ok: false, error: "Invalid or expired refresh token" },
                { status: 401 }
            );
        }

        // create new access token
        const accessToken = signToken({ userId: tokenDoc.userId });

        const res = NextResponse.json({ ok: true, message: "Token refreshed" });
        res.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 15 * 60,
        });

        return res;
    } catch (err: any) {
        console.error("Refresh error:", err);
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
