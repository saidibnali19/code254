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
      .populate("author", "name email")
      .lean()) as PostData | null;

    if (!post) {
      return NextResponse.json(
        { ok: false, error: "No featured post found" },
        { status: 404 },
      );
    }
    const normalizedAuthor =
      post.author && typeof post.author === "object"
        ? {
            _id: String((post.author as any)._id || (post.author as any).id),
            name: (post.author as any).name || "",
            email: (post.author as any).email || "",
          }
        : { _id: "", name: "Unknown", email: "" };

    const formattedPost = {
      _id: String(post._id),
      title: post.title,
      slug: post.slug,
      content: post.content,
      tags: post.tags || [],
      isFeatured: Boolean(post.isFeatured),
      published: Boolean(post.published),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: normalizedAuthor,
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
