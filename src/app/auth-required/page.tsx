"use client";

import LoginButton from "@/components/auth/LoginButton";
import SignUpButton from "@/components/auth/SignUpButton";
import { useSearchParams } from "next/navigation";

export default function AuthRequiredPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const logInHref = `/login?redirect=${encodeURIComponent(redirect)}`;
  const signUpHref = `/signup?redirect=${encodeURIComponent(redirect)}`;
  return (
    <div className="bg-base-300 text-base-400 flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-semibold">You need to sign in first</h2>
      <p>
        Please <LoginButton href={logInHref} variant="link" /> or{" "}
        <SignUpButton href={signUpHref} variant="link" /> for a free account.
      </p>
      <div className="mt-4 flex gap-4"></div>
    </div>
  );
}
