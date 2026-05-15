'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  category?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  category,
}: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    if (category) {
      params.set('category', category);
    }
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 flex-wrap px-2 sm:px-0">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg font-medium text-xs sm:text-sm bg-surface-raised hover:bg-border border border-border transition-colors whitespace-nowrap"
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">&lt;</span>
        </Link>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Link
                key={page}
                href={getPageUrl(page)}
                className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-accent text-background'
                    : 'bg-surface-raised hover:bg-border border border-border'
                }`}
              >
                {page}
              </Link>
            );
          }

          if (
            (page === 2 && currentPage > 3) ||
            (page === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            return (
              <span
                key={`ellipsis-${page}`}
                className="px-2 py-1 text-text-muted"
              >
                ...
              </span>
            );
          }

          return null;
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg font-medium text-xs sm:text-sm bg-surface-raised hover:bg-border border border-border transition-colors whitespace-nowrap"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">&gt;</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      )}
    </div>
  );
}
