import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import SearchForm from "@/components/SearchForm";
import { PostData } from "@/types/types";

export default async function AllPostsPage(context: any) {
  const query = context.searchParams?.search || "";
  const page = context.searchParams?.page || "1";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?limit=6&page=${page}${
      query ? `&search=${encodeURIComponent(query)}` : ""
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

  const { posts, totalPages, currentPage } = await res.json();

  if (!posts || posts.length === 0) {
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
    <article>
      <div className="bg-base-300 mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="text-base-400 space-y-4">
          <h1 className="text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="text-lg">
            Explore articles on web development, programming, and modern
            technology practices.
          </p>
        </div>
        <SearchForm />
      </div>

      <ul className="bg-base-400 mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] grid-rows-[auto_auto_1fr_auto] gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
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

      <div className="bg-base-300">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </article>
  );
}
