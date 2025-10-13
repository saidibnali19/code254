"use client";

import { PostData } from "@/types/types";

import Link from "next/link";

export default function Post({
  title,
  slug,
  content,
  author,
  createdAt,
  tags,
}: PostData) {
  return (
    <article className="mx-auto grid max-w-7xl gap-4 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-wrap gap-2">
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
      <p className="leading-relaxed text-gray-600">{content}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gray-200 pt-4">
        <div className="grid gap-2">
          <p className="text-sm font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">
            Published on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link
          href={`posts/${slug}`}
          className="inline-flex items-center justify-self-end rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:bg-blue-700"
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
    </article>
  );
}
