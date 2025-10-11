import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Post";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();

        const { slug } = params;
        const post = await Post.findOne({ slug }).populate("author", "email");

        if (!post) {
            return NextResponse.json(
                { ok: false, error: "Post not found" },
                { status: 404 }
            );
        }

        // Only show unpublished posts if you’re the author (we’ll handle that later)
        if (!post.published) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized to view this post" },
                { status: 401 }
            );
        }

        return NextResponse.json({ ok: true, post });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
