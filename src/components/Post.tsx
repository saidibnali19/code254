"use client";

import { PostData } from "@/types/types";

import Link from "next/link";

interface PostProps extends PostData {
  variant?: "white" | "gray"; // Add a variant prop to manage styles
}

export default function Post({
  title,
  slug,
  content,
  author,
  createdAt,
  tags,
  variant = "white",
}: PostProps) {
  const firsrtFewWords = content.split(" ").slice(0, 12).join(" ");

  // Safely get the author name (whether populated or not)
  const authorName =
    typeof author === "object" && author !== null && "name" in author
      ? author.name
      : "Unknown Author";

  // Generate initials safely
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  // Determine the background color based on the variant prop
  const bgColor = variant === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <article
      className={`row-span-4 mx-auto grid max-w-7xl grid-rows-subgrid gap-4 rounded-2xl ${bgColor} p-6 shadow-md transition-shadow duration-300 hover:shadow-lg`}
    >
      <div className="flex flex-wrap items-start gap-2">
        {tags &&
          tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
      </div>
      <h2 className="text-2xl leading-tight font-bold text-gray-900">
        {title}
      </h2>
      <p className="leading-relaxed text-gray-600">
        {firsrtFewWords}
        {content.split(" ").length > 6 ? "..." : ""}
      </p>
      <div className="@container grid border-t border-gray-200 pt-4">
        <div className="grid gap-x-4 gap-y-2 @xs:grid-cols-2">
          <div className="flex gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-semibold text-white">
              {getInitials(authorName)}
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-semibold text-gray-900">
                {authorName}
              </p>
              <p className="text-sm text-gray-500">
                Published on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link
            href={`posts/${slug}`}
            className="inline-flex items-center justify-self-end rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:bg-blue-700 @max-xs:justify-self-start"
          >
            Read more <span className="sr-only">about {title}</span>
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
          </Link>
        </div>
      </div>
    </article>
  );
}
