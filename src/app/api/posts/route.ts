import { dbConnect } from "@/lib/dbConnect";
import { verifyJWT } from "@/lib/verifyJWT";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Allow limit param e.g. /api/posts?limit=3
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const pageParam = searchParams.get("page");
    const search = searchParams.get("search");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const skip = (page - 1) * limit;

    // ✅ Search filter: if search exists, match by title or tags
    const filter = search
      ? {
          published: true,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : { published: true };

    // ✅ Count total posts for pagination
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email")
      .lean();
    return NextResponse.json({
      ok: true,
      posts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: (error as Error).message,
    });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    // ✅ Extract token from cookies
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // ✅ Verify JWT
    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json(
        { ok: false, error: "Invalid token" },
        { status: 401 },
      );
    }

    // ✅ Get user info from DB
    const user = await User.findById(decoded.userId).select("name email");
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 },
      );
    }

    // ✅ Parse request body
    const body = await req.json();
    const { title, slug, content, tags, isFeatured, published = true } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const newPost = await Post.create({
      title,
      slug,
      content,
      tags,
      isFeatured: Boolean(isFeatured),
      published: Boolean(published),
      author: user._id,
    });

    const populatedPost = await newPost.populate("author", "name email");

    return NextResponse.json({ ok: true, post: populatedPost });
  } catch (err: any) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
