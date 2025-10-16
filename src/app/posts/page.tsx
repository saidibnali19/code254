import Post from "@/components/Post";
import SearchForm from "@/components/SearchForm";
import { PostData } from "@/types/types";

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const query = searchParams?.search || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${
      query ? `?search=${encodeURIComponent(query)}` : ""
    }`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch posts");
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 text-center text-gray-600">
        <h1 className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
          Blog
        </h1>
        <p>Could not load posts. Please try again later.</p>
      </section>
    );
  }

  const posts = await res.json();

  if (posts.length === 0) {
    return (
      <article className="mx-auto max-w-7xl space-y-4 px-4 py-10 text-center text-gray-600 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h1 className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
          Blog
        </h1>
        <SearchForm />
        <p>No posts found {query ? `for “${query}”` : ""}.</p>
      </article>
    );
  }

  return (
    <article className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">Blog</h1>
          <p className="text-lg text-gray-600">
            Explore articles on web development, programming, and modern
            technology practices.
          </p>
        </div>
        <SearchForm />
      </div>

      <ul className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] grid-rows-[auto_auto_1fr_auto] gap-8 bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {posts.map((post: PostData) => (
          <li key={post._id} className="row-span-4 grid grid-rows-subgrid">
            <Post
              title={post.title}
              content={post.content}
              author={post.author}
              createdAt={new Date(post.createdAt)}
              isFeatured={post.isFeatured}
              slug={post.slug}
              tags={post.tags}
              published={post.published}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
