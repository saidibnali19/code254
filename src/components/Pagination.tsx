"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    if (search) params.set("search", search);
    router.push(`/posts?${params.toString()}`);
  };

  const pagesToShow = 6; // max visible page numbers
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= pagesToShow) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    // Always show first and last pages with ellipses if needed
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    pageNumbers.push(1);

    if (left > 2) pageNumbers.push("…");

    for (let i = left; i <= right; i++) pageNumbers.push(i);

    if (right < totalPages - 1) pageNumbers.push("…");

    pageNumbers.push(totalPages);
  }

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-10">
      {/* First */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className="btn btn-inverted p-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-inverted p-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`btn px-3 py-1 ${
              page === currentPage ? "btn-primary" : "btn-inverted"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-inverted p-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Last */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="btn btn-inverted p-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
}
