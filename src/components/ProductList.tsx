'use client';

import { useMemo } from 'react';
import { products } from '@/data/products';
import { ProductFilter } from '@/types/product';
import { Pagination } from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface ProductListProps {
  filter?: ProductFilter;
  searchQuery?: string;
}

export function ProductList({ filter = 'all', searchQuery = '' }: ProductListProps) {
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(product => product.status === filter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [filter, searchQuery]);

  // Use the pagination hook
  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedProducts, 
    totalItems 
  } = usePagination({
    items: filteredProducts,
    dependencies: [filter, searchQuery],
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  return (
    <div className="rounded-lg border border-[--border-color] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[--background-hover] border-b border-[--border-color]">
          <tr>
            <th className="w-4 p-4">
              <input type="checkbox" className="rounded border-[--border-color]" />
            </th>
            <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Product</th>
            <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Status</th>
            <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Price</th>
            <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Total Sales</th>
            <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Added</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[--border-color]">
          {paginatedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-[--background-hover] cursor-pointer">
              <td className="w-4 p-4">
                <input type="checkbox" className="rounded border-[--border-color]" />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[--background-hover] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`
                  px-2 py-1 text-xs rounded-full
                  ${product.status === 'active' && 'bg-green-100 text-green-700'}
                  ${product.status === 'draft' && 'bg-gray-100 text-gray-700'}
                  ${product.status === 'archived' && 'bg-red-100 text-red-700'}
                `}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{formatCurrency(product.price)}</td>
              <td className="px-6 py-4 text-sm">{formatCurrency(product.totalSales)}</td>
              <td className="px-6 py-4 text-sm">{formatDate(product.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 