// components/NewPostForm.tsx
"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PostForm from "./PostForm";
import { useState } from "react";
import { PostData } from "@/types/types";

export default function NewPostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (postData: PostData, publishStatus: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...postData, published: publishStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(publishStatus ? "Post published!" : "Draft saved!");
        setTimeout(() => router.push("/"), 1200);
      } else toast.error(data.error || "Failed to save post.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostForm
      onSubmit={handleSubmit}
      loading={loading}
      buttonText="Publish Post"
    />
  );
}
