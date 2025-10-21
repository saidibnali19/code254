// components/comments/CommentForm.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import LoginButton from "@/components/auth/LoginButton";
import SignUpButton from "@/components/auth/SignUpButton";
import { getInitials } from "@/utils/getInitials";

interface CommentFormProps {
  slug: string;
  onCommentAdded?: () => void;
}

export default function CommentForm({
  slug,
  onCommentAdded,
}: CommentFormProps) {
  const { user, loading } = useAuth();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null; // avoid flicker

  if (!user) {
    return (
      <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          ></path>
        </svg>
        <h3 className="text-xl font-bold text-gray-900">Join the Discussion</h3>
        <p className="mb-6 text-gray-600">
          Sign in to share your thoughts and engage with the community.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <LoginButton />
          <SignUpButton />
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter a comment.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to post comment");
      }
      setContent("");
      toast.success("Comment posted!");
      if (onCommentAdded) onCommentAdded();
    } catch (err: any) {
      console.error("Error posting comment:", err);
      toast.error(err?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
        {getInitials(user.name)}
      </div>
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            Be respectful and constructive
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </form>
  );
}
