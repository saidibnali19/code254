// components/comments/CommentList.tsx
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CommentData } from "@/types/types";
import { formatDate } from "@/app/dashboard/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import { timeAgo } from "@/utils/timeAgo";

interface CommentListProps {
  slug: string;
  refreshSignal?: number; // optional signal to refetch (e.g. bump on new comment)
}

export default function CommentList({ slug, refreshSignal }: CommentListProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${slug}/comments`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to load comments");
      }
      setComments(data.comments || []);
    } catch (err: any) {
      console.error("Failed to fetch comments:", err);
      toast.error("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, refreshSignal]);

  if (loading)
    return <div className="text-sm text-gray-500">Loading comments…</div>;

  if (!comments.length)
    return (
      <div className="text-sm text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );

  return (
    <ul className="relative mt-4 space-y-4 before:mt-8 before:mb-4 before:block before:h-[1px] before:bg-gray-200">
      {comments.length && (
        <p className="text-sm text-gray-600">
          {comments.length} comment{comments.length !== 1 ? "s" : ""}
        </p>
      )}
      {comments.map((c) => (
        <li
          key={c._id}
          className="rounded-lg border border-gray-100 bg-white p-4"
        >
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
              {getInitials(c.author?.name)}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {c.author.name}
                </span>
                <span className="text-xs text-gray-500">
                  {timeAgo(new Date(c.createdAt))}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {c.content}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
