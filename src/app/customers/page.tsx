'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { BarChart3 } from 'lucide-react';
import { useDelete } from '@/hooks/useDelete';
import { DeleteButton } from '@/components/DeleteButton';
import { useCustomers } from '@/context/CustomerContext';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
}

export default function CustomersPage() {
  const { customers, deleteCustomers } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    selectedIds: selectedCustomerIds,
    toggleSelection: toggleCustomerSelection,
    handleDelete,
    clearSelection,
  } = useDelete({
    onDelete: deleteCustomers,
    itemName: 'customer'
  });

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  });

  // Use the pagination hook
  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedCustomers, 
    totalItems 
  } = usePagination({
    items: filteredCustomers,
    dependencies: [searchQuery],
  });

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (customerId: string) => {
    toggleCustomerSelection(customerId);
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-[--border-color] p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[--text-secondary]">Total Customers</span>
            <BarChart3 className="w-4 h-4 text-[--primary]" />
          </div>
          <p className="text-2xl font-semibold">{customers.length}</p>
        </div>
        <div className="rounded-lg border border-[--border-color] p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[--text-secondary]">Total Spent</span>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-semibold">
            {formatCurrency(customers.reduce((sum, customer) => sum + customer.totalSpent, 0))}
          </p>
        </div>
        <div className="rounded-lg border border-[--border-color] p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[--text-secondary]">Total Orders</span>
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold">
            {customers.reduce((sum, customer) => sum + customer.orders, 0)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-full max-w-sm">
          <SearchBar 
            placeholder="Search customers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-[--border-color] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[--background-hover] border-b border-[--border-color]">
            <tr>
              <th className="w-4 p-4"></th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Customer</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Email</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Total Spent</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Orders</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Last Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-color]">
            {paginatedCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="hover:bg-[--background-hover] cursor-pointer"
                onClick={() => handleRowClick(customer.id)}
              >
                <td className="w-4 p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-[--border-color] cursor-pointer" 
                    checked={selectedCustomerIds.has(customer.id)}
                    onChange={() => toggleCustomerSelection(customer.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[--text-secondary]">{customer.email}</td>
                <td className="px-6 py-4 text-sm">{formatCurrency(customer.totalSpent)}</td>
                <td className="px-6 py-4 text-sm">{customer.orders}</td>
                <td className="px-6 py-4 text-sm">{formatDate(customer.lastOrder)}</td>
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

      <DeleteButton
        selectedCount={selectedCustomerIds.size}
        onDelete={handleDelete}
        itemName="customer"
      />
    </div>
  );
} 