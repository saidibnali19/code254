// components/PostForm.tsx
"use client";

import { PostData } from "@/types/types";
import { useEffect, useState } from "react";

interface PostFormProps {
  onSubmit: (postData: PostData, publishStatus: boolean) => Promise<void>;
  defaultValues?: {
    title?: string;
    content?: string;
    tags?: string[];
    isFeatured?: boolean;
  };
  loading?: boolean;
  buttonText?: string;
}

export default function PostForm({
  onSubmit,
  defaultValues = {},
  loading = false,
  buttonText = "Publish Post",
}: PostFormProps) {
  const [title, setTitle] = useState(defaultValues.title || "");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState(defaultValues.content || "");
  const [tags, setTags] = useState(defaultValues.tags?.join(", ") || "");
  const [isFeatured, setIsFeatured] = useState(
    defaultValues.isFeatured || false,
  );

  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generated);
  }, [title]);

  const handleSubmit = (e: React.FormEvent, publishStatus: boolean) => {
    e.preventDefault();
    const postData = {
      title,
      slug,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      isFeatured,
    };
    onSubmit(postData, publishStatus);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, true)}
      className="mx-auto max-w-3xl space-y-4 rounded-2xl bg-white p-8 shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-900">
        {buttonText.includes("Update") ? "Edit Post" : "Create New Post"}
      </h1>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
          className="w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          id="isFeatured"
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus-visible:ring-blue-500"
        />
        <label htmlFor="isFeatured" className="text-sm text-gray-700">
          Mark as Featured
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : buttonText}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e as any, false)}
          disabled={loading}
          className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
        >
          Save as Draft
        </button>
      </div>
    </form>
  );
}
