"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(true);

  // 🔹 Auto-generate slug from title
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generated);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent, publishStatus = true) => {
    e.preventDefault();
    setLoading(true);

    const newPost = {
      title,
      slug,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      isFeatured,
      published: publishStatus,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          publishStatus
            ? "✅ Post published successfully!"
            : "💾 Draft saved successfully!",
        );

        setTitle("");
        setSlug("");
        setContent("");
        setTags("");
        setIsFeatured(false);

        // 🔹 Delay redirect slightly so the toast is visible
        setTimeout(() => router.push("/"), 1200);
      } else {
        toast.error(data.error || "❌ Failed to create post.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, true)}
      className="mx-auto max-w-3xl space-y-4 rounded-2xl bg-white p-8 shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
          required
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content (Markdown supported later)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
          rows={8}
          required
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

      {/* Featured checkbox */}
      <div className="flex items-center gap-2">
        <input
          id="isFeatured"
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus-visible:ring-blue-500 focus-visible:outline-blue-500"
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
          {loading ? "Creating..." : "Publish Post"}
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e as any, false)}
          disabled={loading}
          className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save as Draft"}
        </button>
      </div>
    </form>
  );
}
