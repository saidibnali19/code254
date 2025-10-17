"use client";

import { useEffect, useState } from "react";

import { PostData } from "@/types/types";
import Post from "./Post";

export default function LatestArticles() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/posts?limit=3");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Failed to fetch latest articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading)
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-semibold">Latest Articles</h2>
        <p className="text-gray-500">Loading...</p>
      </section>
    );

  if (!posts.length)
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-semibold">Latest Articles</h2>
        <p className="text-gray-500">No recent articles available.</p>
      </section>
    );

  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <p className="text-gray-600">
          Stay updated with our newest content and insights
        </p>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] grid-rows-[auto_auto_1fr_auto] gap-8">
        {posts.map((post) => (
          <li key={post._id} className="row-span-4 grid grid-rows-subgrid">
            <Post
              title={post.title}
              content={post.content}
              author={post.author}
              isFeatured={post.isFeatured}
              createdAt={post.createdAt}
              tags={post.tags}
              slug={post.slug}
              variant="gray"
              buttonVariant="with-icon"
              published={post.published}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
