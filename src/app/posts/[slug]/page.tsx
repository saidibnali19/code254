import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import CommentsSection from "../components/CommentsSection";
import { getInitials } from "@/utils/getInitials";

interface PostPageProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug;
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/posts" className="transition-colors hover:text-blue-600">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900">
            Building Scalable React Applications
          </span>
        </nav>
        <article className="space-y-4">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
            {post.title}
          </h1>
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-semibold text-white">
                {getInitials(post.author.name)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>

            {/* Share button */}
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
              Share
            </button>
          </div>

          <div
            className="prose prose-gray max-w-none text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <CommentsSection slug={slug} />
      </div>
    </>
  );
}
