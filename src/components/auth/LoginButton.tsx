"use client";

import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white focus-visible:outline-none"
    >
      Log In
    </Link>
  );
}
