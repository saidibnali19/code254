import Post from "./Post";

export default async function FeaturedPost() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/featured`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch featured post");
    return (
      <article className="mx-auto max-w-7xl px-4 py-10 text-center text-gray-600">
        <h1 className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
          Featured Post
        </h1>
        <p>No featured post available.</p>
      </article>
    );
  }

  const data = await res.json();

  const post = data.post;

  return (
    <>
      <article className="mx-auto min-h-[calc(100vh-7rem)] max-w-7xl space-y-4 bg-gray-100 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h1 className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
          Featured Post
        </h1>

        <Post
          title={post.title}
          content={post.content}
          author={post.author.name}
          createdAt={new Date(post.createdAt)}
          isFeatured={post.isFeatured}
          slug={post.slug}
          tags={post.tags}
        />
      </article>
    </>
  );
}
