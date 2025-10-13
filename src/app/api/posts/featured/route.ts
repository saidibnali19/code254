import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";
import { PostData } from "@/types/types";

export async function GET() {
  try {
    await dbConnect();

    // ✅ Fetch the first featured post
    const post = (await Post.findOne({ isFeatured: true })
      .sort({ createdAt: -1 })
      .lean()) as PostData | null;

    if (!post) {
      return NextResponse.json(
        { ok: false, error: "No featured post found" },
        { status: 404 },
      );
    }

    const formattedPost: PostData = {
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      tags: post.tags,
      isFeatured: post.isFeatured,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    return NextResponse.json({ ok: true, post: formattedPost }); // ✅ cleaner
  } catch (error: any) {
    console.error("Error fetching featured post:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
