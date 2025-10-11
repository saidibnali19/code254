import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { signToken } from "@/lib/jwt";

import RefreshToken from "@/models/RefreshToken";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { ok: false, error: "Email and password required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { ok: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { ok: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create access + refresh tokens
        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: (user as any).role,
        });

        const tokenId = uuidv4();
        const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await RefreshToken.create({
            userId: user._id,
            tokenId,
            expiresAt: refreshExpires,
        });

        // Store both cookies
        const res = NextResponse.json({
            ok: true,
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
        });

        res.cookies.set("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 15 * 60, // 15 min
        });

        res.cookies.set("refreshToken", tokenId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return res;
    } catch (err: any) {
        console.error("Login error:", err);
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
