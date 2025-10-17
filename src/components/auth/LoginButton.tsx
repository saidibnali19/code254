"use client";

import { LoginButtonProps } from "@/types/types";
import Link from "next/link";

export default function LoginButton({
  href = "/login",
  variant = "button",
}: LoginButtonProps) {
  let styles;
  if (variant === "button") {
    styles =
      "rounded-lg border border-blue-600 px-4 py-2 transition hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white ";
  } else {
    styles =
      "hover:underline hover:decoration-2 focus-visible:underline focus-visible:decoration-2";
  }
  return (
    <Link
      href={href}
      className={`text-blue-600 focus-visible:outline-none ${styles}`}
    >
      Log In
    </Link>
  );
}
