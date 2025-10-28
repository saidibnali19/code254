import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";

export async function GET(req: NextRequest, context: any) {
  try {
    await dbConnect();

    const { slug } = context.params;

    // ✅ Find post by slug
    const post = await (Post as any)
      .findOne({ slug })
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

export async function PUT(req: NextRequest, context: any) {
  try {
    await dbConnect();

    const { slug } = context.params;
    const body = await req.json();

    const { title, content, tags, isFeatured, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { ok: false, error: "Title and content are required" },
        { status: 400 },
      );
    }

    const updatedPost = await (Post as any)
      .findOneAndUpdate(
        { slug },
        {
          title,
          content,
          tags: tags || [],
          isFeatured: Boolean(isFeatured),
          published: Boolean(published),
          updatedAt: new Date(),
        },
        { new: true },
      )
      .populate("author", "name email");

    if (!updatedPost) {
      return NextResponse.json(
        { ok: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    await dbConnect();
    const { slug } = context.params;

    const deletedPost = await (Post as any).findOneAndDelete({ slug });

    if (!deletedPost) {
      return NextResponse.json(
        { ok: false, error: "Post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
