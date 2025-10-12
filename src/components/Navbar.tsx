"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { User } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, setUser, loading } = useAuth();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("accesstoken");
    setUser(null);
  };

  if (loading) return null; // avoid flicker on first load

  return (
    <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 bg-white px-8 py-4 shadow-sm">
      <Link
        href="/"
        className="text-2xl font-semibold text-blue-600 focus-visible:outline-blue-600"
      >
        Code254
      </Link>

      {/* Navigation actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white focus-visible:bg-red-600 focus-visible:text-white focus-visible:outline-none"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white focus-visible:outline-none"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:outline-none"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
