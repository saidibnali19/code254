import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { verifyJWT } from "@/lib/verifyJWT";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // ✅ Extract JWT from cookies
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // ✅ Verify JWT
    const decoded = verifyJWT(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { ok: false, error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // ✅ Ensure user exists
    const user = await User.findById(decoded.userId).select("_id name email");
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    // ✅ Extract optional published filter
    const { searchParams } = new URL(req.url);
    const publishedParam = searchParams.get("published");

    let filter: any = { author: user._id };
    if (publishedParam === "true") filter.published = true;
    else if (publishedParam === "false") filter.published = false;

    // ✅ Query posts by author (optionally filtered)
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "name email")
      .lean();

    return NextResponse.json({ ok: true, posts });
  } catch (err: any) {
    console.error("Error fetching user posts:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
