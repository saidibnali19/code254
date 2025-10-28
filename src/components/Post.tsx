"use client";

import { PostData } from "@/types/types";

import ReadMoreButton from "./ReadMoreButton";
import UserAvatar from "./UserAvatar";
import { getExcerptFromHTML } from "@/utils/getExcerpt";

interface PostProps extends PostData {
  variant?: "primary" | "secondary";
  buttonVariant?: "no-icon" | "with-icon";
}

export default function Post({
  title,
  slug,
  content,
  author,
  createdAt,
  tags,
  variant = "primary",
  buttonVariant = "no-icon",
}: PostProps) {
  const excerpt = getExcerptFromHTML(content, 10);

  // Safely get the author name (whether populated or not)
  const authorName =
    typeof author === "object" && author !== null && "name" in author
      ? author.name
      : "Unknown Author";

  // Determine the background color based on the variant prop
  let bgColor;

  if (variant === "primary") {
    bgColor = "bg-primary";
  } else {
    bgColor = "bg-secondary";
  }

  return (
    <article
      className={`row-span-4 mx-auto grid max-w-7xl grid-rows-subgrid gap-4 rounded-2xl ${bgColor} text-base-400 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg`}
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
      <h2 className="text-2xl leading-tight font-bold">{title}</h2>
      <p className="leading-relaxed">{excerpt}</p>
      <div className="@container grid border-t border-gray-200 pt-4">
        <div className="grid gap-x-4 gap-y-2 @xs:grid-cols-2">
          <div className="flex gap-2">
            <UserAvatar authorName={authorName} />
            <div className="grid gap-2">
              <p className="text-sm font-semibold">{authorName}</p>
              <p className="text-sm">
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
