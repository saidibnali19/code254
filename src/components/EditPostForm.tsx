"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PostForm from "./PostForm";
import { PostData } from "@/types/types";

interface EditPostFormProps {
  slug: string;
}

export default function EditPostForm({ slug }: EditPostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
        toast.error("⚠️ Failed to load post data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // 🔹 Handle form submission
  const handleSubmit = async (updatedData: any, publishStatus: boolean) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedData, published: publishStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          publishStatus
            ? "✅ Post updated successfully!"
            : "💾 Changes saved as draft.",
        );
        setTimeout(() => router.push(`/posts/${post?.slug}`), 1200);
      } else {
        toast.error(data.error || "❌ Failed to update post.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center text-gray-600">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center text-gray-600">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <PostForm
      onSubmit={handleSubmit}
      defaultValues={{
        title: post.title,
        content: post.content,
        tags: post.tags,
        isFeatured: post.isFeatured,
      }}
      loading={saving}
      buttonText="Update Post"
    />
  );
}
