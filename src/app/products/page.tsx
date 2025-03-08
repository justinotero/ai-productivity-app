'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Tabs } from '@/components/Tabs';
import { ProductList } from '@/components/ProductList';
import { Button } from '@/components/Button';
import { PlusIcon } from 'lucide-react';
import { ProductFilter } from '@/types/product';
import { Breadcrumb } from '@/components/Breadcrumb';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft' },
  { id: 'archived', label: 'Archived' },
] as const;

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
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
          onTabChange={setActiveTab}
        />
        <SearchBar 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ProductList filter={activeTab} searchQuery={searchQuery} />
    </div>
  );
} 