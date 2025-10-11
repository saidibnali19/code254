import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            ok: true,
            message: "✅ Connected successfully to local MongoDB!",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            ok: false,
            error: (error as Error).message,
        });
    }
}
