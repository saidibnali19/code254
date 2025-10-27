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
      className="bg-base-400 text-base-400 mx-auto max-w-3xl space-y-4 rounded-2xl p-8 shadow-md"
    >
      <h1 className="text-2xl font-bold">
        {buttonText.includes("Update") ? "Edit Post" : "Create New Post"}
      </h1>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input bg-base-300 w-full border-gray-700"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
          className="form-input bg-base-300 w-full border-gray-700"
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="tags">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-input bg-base-300 w-full border-gray-700"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          id="isFeatured"
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 rounded"
        />
        <label htmlFor="isFeatured" className="text-sm">
          Mark as Featured
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : buttonText}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e as any, false)}
          disabled={loading}
          className="btn btn-inverted flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save as Draft
        </button>
      </div>
    </form>
  );
}
