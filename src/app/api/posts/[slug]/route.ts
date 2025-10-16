import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();

    const { slug } = params;

    // ✅ Find post by slug
    const post = await Post.findOne({ slug })
      .populate("author", "name email")
      .lean();

    if (!post) {
      return NextResponse.json(
        { ok: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, post });
  } catch (err: any) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
