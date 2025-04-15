'use client';

import { useState, useMemo, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Tabs } from '@/components/Tabs';
import { PillDropdown } from '@/components/PillDropdown';
import { Pagination } from '@/components/Pagination';
import { useOrders } from '@/context/OrderContext';
import { usePagination } from '@/hooks/usePagination';
import { OrderFilter } from '@/types/order';
import { BarChart3 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useDelete } from '@/hooks/useDelete';
import { DeleteButton } from '@/components/DeleteButton';

const tabs = [
  { id: 'all', label: 'All orders' },
  { id: 'active', label: 'Active' },
  { id: 'unpaid', label: 'Unpaid' },
  { id: 'unfulfilled', label: 'Unfulfilled' },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(date: Date | string): string {
  if (typeof date === 'string') return date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

const fulfillmentOptions = [
  { value: 'Fulfilled', label: 'Fulfilled' },
  { value: 'Unfulfilled', label: 'Unfulfilled' },
  { value: 'Pending Receipt', label: 'Pending Receipt' },
];

const statusOptions = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Authorized', label: 'Authorized' },
];

export default function OrdersPage() {
  console.log('OrdersPage rendering');
  
  const { orders, updateOrderFulfillment, updateOrderStatus, orderStats, deleteOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<OrderFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    selectedIds: selectedOrderIds,
    toggleSelection: toggleOrderSelection,
    handleDelete,
    clearSelection,
  } = useDelete({
    onDelete: deleteOrders,
    itemName: 'order'
  });

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Apply tab filters
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(order => order.status === 'Authorized');
        break;
      case 'unpaid':
        filtered = filtered.filter(order => order.status !== 'Paid');
        break;
      case 'unfulfilled':
        filtered = filtered.filter(order => order.fulfillment === 'Unfulfilled');
        break;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery, orders]);

  // Use the pagination hook
  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedOrders, 
    totalItems 
  } = usePagination({
    items: filteredOrders,
    dependencies: [activeTab, searchQuery],
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as OrderFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (orderId: string) => {
    toggleOrderSelection(orderId);
  };

  return (
    <>
      <div className="space-y-6 pb-20 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Orders</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border border-[--border-color] p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[--text-secondary]">Active Orders</span>
              <BarChart3 className="w-4 h-4 text-[--primary]" />
            </div>
            <p className="text-2xl font-semibold">{orderStats.active}</p>
          </div>
          <div className="rounded-lg border border-[--border-color] p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[--text-secondary]">Unfulfilled</span>
              <BarChart3 className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-semibold">{orderStats.unfulfilled}</p>
          </div>
          <div className="rounded-lg border border-[--border-color] p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[--text-secondary]">Pending Receipt</span>
              <BarChart3 className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-semibold">{orderStats.pendingReceipt}</p>
          </div>
          <div className="rounded-lg border border-[--border-color] p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[--text-secondary]">Fulfilled</span>
              <BarChart3 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold">{orderStats.fulfilled}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tabs 
            tabs={tabs}
            defaultTab="all"
            onTabChange={handleTabChange}
          />
          <SearchBar 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-lg border border-[--border-color] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[--background-hover] border-b border-[--border-color]">
              <tr>
                <th className="w-4 p-4"></th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Order ID</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Created</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Customer</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Fulfillment</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Total</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Profit</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Status</th>
                <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[--border-color]">
              {paginatedOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-[--background-hover] cursor-pointer"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className="w-4 p-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-[--border-color] cursor-pointer" 
                      checked={selectedOrderIds.has(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-[--primary]">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm">{formatDate(order.created)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{order.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <PillDropdown
                      value={order.fulfillment}
                      options={fulfillmentOptions}
                      onChange={(value) => updateOrderFulfillment(order.id, value as any)}
                      variant="fulfillment"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4 text-sm">{formatCurrency(order.profit)}</td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <PillDropdown
                      value={order.status}
                      options={statusOptions}
                      onChange={(value) => updateOrderStatus(order.id, value as any)}
                      variant="status"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{formatDate(order.updated)}</td>
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
      </div>

      <DeleteButton
        selectedCount={selectedOrderIds.size}
        onDelete={handleDelete}
        itemName="order"
      />
    </>
  );
} 