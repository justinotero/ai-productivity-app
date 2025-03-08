'use client';

import { useState, useMemo, useEffect } from 'react';
import { ITEMS_PER_PAGE } from '@/config/constants';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  initialPage?: number;
  dependencies?: any[];
}

interface UsePaginationResult<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  paginatedItems: T[];
  totalPages: number;
  totalItems: number;
}

export function usePagination<T>({
  items,
  itemsPerPage = ITEMS_PER_PAGE,
  initialPage = 1,
  dependencies = [],
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Reset to first page when dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);
  
  // Calculate pagination
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);
  
  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    totalPages,
    totalItems,
  };
} 