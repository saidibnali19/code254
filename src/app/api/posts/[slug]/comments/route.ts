import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { verifyJWT } from "@/lib/verifyJWT";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();
    const { slug } = params;

    const post = await Post.findOne({ slug }).lean();
    if (!post) {
      return NextResponse.json(
        { ok: false, error: "Post not found" },
        { status: 404 },
      );
    }

    // Get comments for this post, populate author name
    const comments = await Comment.find({ post: post._id })
      .sort({ createdAt: 1 }) // chronological
      .populate("author", "name")
      .lean();

    // Normalize populated author
    const formatted = comments.map((c: any) => ({
      _id: String(c._id),
      post: String(c.post),
      content: c.content,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      author: c.author
        ? {
            id: String((c.author as any)._id),
            name: (c.author as any).name || "Unknown",
          }
        : { id: "", name: "Unknown" },
    }));

    return NextResponse.json({ ok: true, comments: formatted });
  } catch (err: any) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();
    const { slug } = params;

    // Authenticate user via cookie
    const token = req.cookies.get("accessToken")?.value;
    if (!token)
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    const user = await User.findById(decoded.userId).select("name email");
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    const post = await Post.findOne({ slug }).lean();
    if (!post) {
      return NextResponse.json(
        { ok: false, error: "Post not found" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { content } = body || {};

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { ok: false, error: "Content is required" },
        { status: 400 },
      );
    }

    const newComment = await Comment.create({
      post: post._id,
      author: user._id,
      content: content.trim(),
    });

    // populate author name
    const populated =
      (await newComment.populate("author", "name").execPopulate?.()) ??
      (await Comment.findById(newComment._id)
        .populate("author", "name")
        .lean());

    const responseComment = {
      _id: String(newComment._id),
      post: String(post._id),
      content: newComment.content,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
      author:
        populated && (populated as any).author
          ? {
              id: String((populated as any).author._id),
              name: (populated as any).author.name || user.name,
            }
          : { id: String(user._id), name: user.name },
    };

    return NextResponse.json(
      { ok: true, comment: responseComment },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
