"use client";

import Link from "next/link";

interface ReadMoreButtonProps {
  slug: string;
  title: string;
  variant: "with-icon" | "no-icon";
}

export default function ReadMoreButton({
  slug,
  title,
  variant = "no-icon",
}: ReadMoreButtonProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={`btn btn-accent inline-flex items-center justify-self-end text-sm font-medium transition-colors @max-xs:justify-self-start`}
    >
      Read {variant === "with-icon" ? "→" : "more"}{" "}
      <span className="sr-only">about {title}</span>
      {variant === "no-icon" && (
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      )}
    </Link>
  );
}
