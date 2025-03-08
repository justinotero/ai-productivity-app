'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Tabs } from '@/components/Tabs';
import { Pagination } from '@/components/Pagination';
import { useProducts } from '@/context/ProductContext';
import { usePagination } from '@/hooks/usePagination';
import { useDelete } from '@/hooks/useDelete';
import { DeleteButton } from '@/components/DeleteButton';
import { ProductFilter } from '@/types/product';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All products' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'archived', label: 'Archived' },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ProductsPage() {
  const { products, deleteProducts } = useProducts();
  const [activeTab, setActiveTab] = useState<ProductFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    selectedIds: selectedProductIds,
    toggleSelection: toggleProductSelection,
    handleDelete,
    clearSelection,
  } = useDelete({
    onDelete: deleteProducts,
    itemName: 'product'
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply tab filters
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(product => product.status === 'Active');
        break;
      case 'draft':
        filtered = filtered.filter(product => product.status === 'Draft');
        break;
      case 'archived':
        filtered = filtered.filter(product => product.status === 'Archived');
        break;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery, products]);

  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedProducts, 
    totalItems 
  } = usePagination({
    items: filteredProducts,
    dependencies: [activeTab, searchQuery],
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as ProductFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (productId: string) => {
    toggleProductSelection(productId);
  };

  return (
    <div className="space-y-6 pb-20">
      <Breadcrumb />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-[--text-secondary] mt-1">
            Manage your products and view their sales performance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Export</Button>
          <Button className="flex items-center">
            <PlusIcon className="w-4 h-4 mr-2" strokeWidth={2} />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs 
          tabs={tabs}
          defaultTab="all"
          onTabChange={handleTabChange}
        />
        <SearchBar 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-[--border-color] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[--background-hover] border-b border-[--border-color]">
            <tr>
              <th className="w-4 p-4"></th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Product</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">SKU</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Price</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Stock</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-color]">
            {paginatedProducts.map((product) => (
              <tr 
                key={product.id} 
                className="hover:bg-[--background-hover] cursor-pointer"
                onClick={() => handleRowClick(product.id)}
              >
                <td className="w-4 p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-[--border-color] cursor-pointer" 
                    checked={selectedProductIds.has(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{product.sku}</td>
                <td className="px-6 py-4 text-sm">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4 text-sm">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Active' ? 'bg-green-100 text-green-700' :
                    product.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <DeleteButton
        selectedCount={selectedProductIds.size}
        onDelete={handleDelete}
        itemName="product"
      />
    </div>
  );
} 