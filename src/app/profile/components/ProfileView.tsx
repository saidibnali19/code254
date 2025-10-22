// components/ProfileView.tsx
"use client";

import { formatDate } from "@/app/dashboard/utils/formatDate";
import UserAvatar from "@/components/UserAvatar";
import Image from "next/image";
import Link from "next/link";

export default function ProfileView({ user, setEditing, postCount }: any) {
  return (
    <>
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* User avatar or initials fallback */}
          <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-4xl font-bold text-white shadow-lg">
            {user.avatar ? (
              // basic img fallback
              <Image
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <UserAvatar authorName={user.name} size="large" />
            )}
          </div>
          {/* User Info */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="mb-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>
                  {postCount} Post{postCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <article className="bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* Bio Section */}
          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="text-xl font-bold text-gray-900">About</h2>
            {user.bio ? (
              <p className="leading-relaxed text-gray-700">{user.bio}</p>
            ) : (
              <p className="leading-relaxed text-gray-700">
                No bio yet. Tell people about yourself.
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href={"/dashboard"}
                className="block rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 focus-visible:bg-gray-50 focus-visible:text-blue-600 focus-visible:outline-none"
              >
                Dashboard
              </Link>
              <Link
                href={"/posts/new"}
                className="block rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 focus-visible:bg-gray-50 focus-visible:text-blue-600 focus-visible:outline-none"
              >
                Create New Post
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
