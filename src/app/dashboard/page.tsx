"use client";

import Tabs, { TabPanel } from "./components/Tabs";
import PostsTable from "./components/PostsTable";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useState } from "react";
import { PostData } from "@/types/types";

export default function DashboardPage() {
  const [publishedPosts, setPublishedPosts] = useState<PostData[]>([]);
  const [drafts, setDrafts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const [postsRes, draftsRes] = await Promise.all([
          fetch(`/api/posts/user?published=true`, { credentials: "include" }),
          fetch(`/api/posts/user?published=false`, { credentials: "include" }),
        ]);

        if (!postsRes.ok || !draftsRes.ok) {
          throw new Error("Failed to fetch posts");
        }

        const publishedData = await postsRes.json();
        const draftsData = await draftsRes.json();

        if (!publishedData.ok || !draftsData.ok) {
          throw new Error("Invalid response from server");
        }

        setPublishedPosts(publishedData.posts);
        setDrafts(draftsData.posts);

        const firstPost = publishedData.posts[0] || draftsData.posts[0];
        if (firstPost?.author?.name) {
          setAuthorName(firstPost.author.name);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            {authorName && (
              <p className="text-gray-600">
                Welcome back, {authorName}! Manage your posts and drafts here.
              </p>
            )}
          </div>

          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            New Post
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading your posts...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <Tabs
            tabs={[
              {
                label: "My Posts",
                value: "posts",
                count: publishedPosts.length,
              },
              { label: "My Drafts", value: "drafts", count: drafts.length },
            ]}
          >
            <TabPanel value="posts">
              <PostsTable posts={publishedPosts} />
            </TabPanel>

            <TabPanel value="drafts">
              <PostsTable posts={drafts} />
            </TabPanel>
          </Tabs>
        )}
      </div>
    </ProtectedRoute>
  );
}
