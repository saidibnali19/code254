import { dbConnect } from "@/lib/dbConnect";
import { verifyJWT } from "@/lib/verifyJWT";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find().sort({ createdAt: -1 });
        return NextResponse.json(posts);
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

        const token = req.cookies.get("accessToken")?.value;
        if (!token) {
            return NextResponse.json(
                { ok: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = verifyJWT(token);
        if (!decoded) {
            return NextResponse.json(
                { ok: false, error: "Invalid token" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { title, slug, content, tags, published } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { ok: false, error: "Missing fields" },
                { status: 400 }
            );
        }

        const newPost = await Post.create({
            title,
            slug,
            content,
            tags,
            published,
            author: decoded.userId,
        });

        return NextResponse.json({ ok: true, post: newPost });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
