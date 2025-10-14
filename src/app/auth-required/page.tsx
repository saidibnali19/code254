"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthRequiredPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-semibold">You need to sign in first</h2>
      <p className="text-gray-600">
        To create a post, please log in or sign up for a free account.
      </p>
      <div className="mt-4 flex gap-4">
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Log In
        </Link>
        <Link
          href={`/signup?redirect=${encodeURIComponent(redirect)}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
