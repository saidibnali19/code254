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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Edit profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avatar URL
          </label>
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus-visible:border-blue-500 focus-visible:outline-none"
            placeholder="https://..."
            type="url"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
