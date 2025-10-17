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
  let styles;
  if (variant === "with-icon") {
    styles =
      "text-blue-600 hover:scale-[1.1] transition focus-visible:scale-[1.1]";
  } else {
    styles =
      "rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus-visible:bg-blue-700";
  }

  return (
    <Link
      href={`/posts/${slug}`}
      className={`inline-flex items-center justify-self-end text-sm font-medium transition-colors focus-visible:outline-none @max-xs:justify-self-start ${styles}`}
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
