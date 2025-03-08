'use client';

import { ITEMS_PER_PAGE } from '@/config/constants';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage = ITEMS_PER_PAGE,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Calculate range of items being displayed
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[--border-color]">
      <div className="text-sm text-[--text-secondary]">
        Showing {firstItem} to {lastItem} of {totalItems} results
      </div>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm text-[--text-secondary] hover:text-[--text-primary] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="First page"
        >
          «
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm text-[--text-secondary] hover:text-[--text-primary] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          ‹
        </button>
        
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1 text-sm rounded-md
              ${currentPage === page 
                ? 'bg-blue-600 text-white font-medium' 
                : 'text-[--text-secondary] hover:bg-[--background-hover] hover:text-[--text-primary]'
              }
            `}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm text-[--text-secondary] hover:text-[--text-primary] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          ›
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm text-[--text-secondary] hover:text-[--text-primary] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
} 