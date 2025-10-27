"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginButton from "./auth/LoginButton";
import SignUpButton from "./auth/SignUpButton";
import LogOutButton from "./auth/LogOutButton";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const { user, setUser, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null; // avoid flicker on first load

  const linkBase = "underline font-medium  ";
  const inactiveLink =
    "text-accent  hover:text-white focus-visible:text-white focus-visible:outline-white ";
  const activeLink = "text-white";

  return (
    <nav className="bg-base-400 text-base-400 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-8 py-4 shadow-sm">
      <Link
        href="/"
        className="text-2xl font-bold focus-visible:outline-purple-100"
      >
        Code<span className="text-blue-600">254</span>
      </Link>

      <ul className="flex gap-4">
        <li>
          <Link
            href="/posts"
            className={`${linkBase} ${
              pathname === "/posts" ? activeLink : inactiveLink
            }`}
          >
            All Posts
          </Link>
        </li>
        <li>
          <Link
            href={"/posts/new"}
            className={`${linkBase} ${
              pathname === "/posts/new" ? activeLink : inactiveLink
            }`}
          >
            Create New Post
          </Link>
        </li>
        {user ? (
          <li>
            <Link
              href="/dashboard"
              className={`${linkBase} ${
                pathname === "/dashboard" ? activeLink : inactiveLink
              }`}
            >
              Dashboard
            </Link>
          </li>
        ) : null}
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              href="/profile"
              className="outline-offset-2 transition hover:scale-110 focus-visible:scale-110 focus-visible:outline-none"
            >
              <UserAvatar authorName={user.name} />
            </Link>

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
