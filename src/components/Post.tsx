"use client";

import { PostData } from "@/types/types";

import ReadMoreButton from "./ReadMoreButton";
import UserAvatar from "./UserAvatar";

interface PostProps extends PostData {
  variant?: "white" | "gray";
  buttonVariant?: "no-icon" | "with-icon";
}

export default function Post({
  title,
  slug,
  content,
  author,
  createdAt,
  tags,
  variant = "white",
  buttonVariant = "no-icon",
}: PostProps) {
  const firsrtFewWords = content.split(" ").slice(0, 12).join(" ");

  // Safely get the author name (whether populated or not)
  const authorName =
    typeof author === "object" && author !== null && "name" in author
      ? author.name
      : "Unknown Author";

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
            <UserAvatar authorName={authorName} />
            <div className="grid gap-2">
              <p className="text-sm font-semibold text-gray-900">
                {authorName}
              </p>
              <p className="text-sm text-gray-500">
                Published on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <ReadMoreButton slug={slug} title={title} variant={buttonVariant} />
        </div>
      </div>
    </article>
  );
}
