// components/comments/CommentsSection.tsx
"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsSection({ slug }: { slug: string }) {
  // bump value to force CommentList to refetch after new comment
  const [signal, setSignal] = useState<number>(0);

  const onCommentAdded = () => setSignal((s) => s + 1);

  return (
    <article className="mx-auto max-w-5xl space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Comments</h2>

      <CommentForm slug={slug} onCommentAdded={onCommentAdded} />

      <CommentList slug={slug} refreshSignal={signal} />
    </article>
  );
}
