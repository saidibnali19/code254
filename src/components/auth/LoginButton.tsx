"use client";

import { LoginButtonProps } from "@/types/types";
import Link from "next/link";

export default function LoginButton({
  href = "/login",
  variant = "button",
}: LoginButtonProps) {
  let styles;
  if (variant === "button") {
    styles = "btn btn-secondary";
  } else {
    styles =
      "hover:underline text-secondary hover:decoration-2 focus-visible:underline focus-visible:decoration-2";
  }
  return (
    <Link href={href} className={`${styles}`}>
      Log In
    </Link>
  );
}
