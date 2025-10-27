// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import toast from "react-hot-toast";
import ProfileView from "./components/ProfileView";
import ProfileEditForm from "./components/ProfileEditForm";

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const [postCount, setPostCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Failed to load profile");
        }
        if (mounted) setUser(data.user);

        // ✅ Fetch user’s posts (published)
        const postsRes = await fetch("/api/posts/user?published=true", {
          credentials: "include",
        });
        const postsData = await postsRes.json();

        if (mounted) setPostCount(postsData.posts.length);
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdated = (updatedUser: any) => {
    setUser(updatedUser);
    setEditing(false);
    toast.success("Profile updated");
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-4xl p-8 text-center text-gray-600">
          Loading profile...
        </div>
      </ProtectedRoute>
    );
  }

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-4xl p-8 text-center text-gray-600">
          Profile not found.
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="bg-base-300 text-base-400">
        {!editing ? (
          <>
            <ProfileView
              user={user}
              postCount={postCount}
              setEditing={setEditing}
            />
          </>
        ) : (
          <ProfileEditForm
            initial={user}
            onSaved={handleUpdated}
            onCancel={() => setEditing(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
