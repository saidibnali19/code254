import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { ok: false, error: "All fields required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { ok: false, error: "Email already registered" },
                { status: 400 }
            );
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        return NextResponse.json({
            ok: true,
            message: "User registered successfully!",
        });
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    } finally {
        await mongoose.disconnect();
    }
}
