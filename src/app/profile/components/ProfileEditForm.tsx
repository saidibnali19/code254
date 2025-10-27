// components/ProfileEditForm.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  initial: any;
  onSaved: (user: any) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({ initial, onSaved, onCancel }: Props) {
  const [name, setName] = useState(initial.name || "");
  const [bio, setBio] = useState(initial.bio || "");
  const [avatar, setAvatar] = useState(initial.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatar }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to update profile");
      }
      onSaved(data.user);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-base-400 text-base-400 space-y-4 rounded-lg border border-gray-200 px-4 py-10 shadow sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h2 className="mb-4 text-xl font-semibold">Edit profile</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="name">
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input bg-base-300 w-full border-gray-700"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="form-input bg-base-300 w-full border-gray-700 sm:min-w-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Avatar URL</label>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="form-input bg-base-300 w-full border-gray-700"
              placeholder="https://..."
              type="url"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onCancel}
              disabled={loading}
              className="btn btn-inverted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
