"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import LoginButton from "./auth/LoginButton";
import SignUpButton from "./auth/SignUpButton";
import LogOutButton from "./auth/LogOutButton";

export default function Navbar() {
  const { user, setUser, loading } = useAuth();

  if (loading) return null; // avoid flicker on first load

  return (
    <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 bg-white px-8 py-4 shadow-sm">
      <Link
        href="/"
        className="text-2xl font-bold text-gray-900 focus-visible:outline-blue-600"
      >
        Code<span className="text-blue-600">254</span>
      </Link>

      <ul className="flex gap-4">
        <li>
          <Link href="/posts" className="text-gray-700 hover:text-blue-600">
            All Posts
          </Link>
        </li>
        <li>
          <Link
            href={"/posts/new"}
            className="text-gray-700 hover:text-blue-600"
          >
            Create New Post
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <LogOutButton setUser={setUser} />
          </>
        ) : (
          <>
            <LoginButton />
            <SignUpButton />
          </>
        )}
      </div>
    </nav>
  );
}
