import Link from "next/link";
import { formatDate } from "../utils/formatDate";
import { PostData } from "@/types/types";

interface PostsTableProps {
  posts: PostData[];
}

export default function PostsTable({ posts }: PostsTableProps) {
  if (!posts.length)
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
        No posts found.
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-left text-gray-700">
          <tr className="border-b border-gray-200 bg-gray-100">
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
              Title
            </th>
            <th className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase md:table-cell">
              Status
            </th>
            <th className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase md:table-cell">
              Created
            </th>
            <th className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase md:table-cell">
              Updated
            </th>
            <th className="hidden px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase md:table-cell">
              Views
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="space-y-1 px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
                <div className="space-x-2">
                  {post.tags.map((tag) => (
                    <span className="text-xs text-gray-500" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="hidden px-6 py-4 md:table-cell">
                {post.published ? (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
                    Draft
                  </span>
                )}
              </td>
              <td className="hidden px-6 py-4 text-gray-600 md:table-cell">
                {formatDate(post.createdAt)}
              </td>
              <td className="hidden px-6 py-4 text-gray-600 md:table-cell">
                {formatDate(post.updatedAt)}
              </td>
              <td className="hidden px-6 py-4 text-gray-600 md:table-cell">
                10 views
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    View
                  </Link>
                  <Link
                    href={`/posts/${post.slug}/edit`}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    Edit
                  </Link>
                  <button className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
