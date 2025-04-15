'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { customers as initialCustomers } from '@/data/customers';
import { Customer } from '@/types/customer';

interface CustomerContextType {
  customers: Customer[];
  deleteCustomers: (ids: string[]) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize customers on the client side
    setCustomers(initialCustomers.map(customer => ({
      ...customer,
      lastOrder: new Date(customer.lastOrder)
    })));
    setIsLoading(false);
  }, []);

  const deleteCustomers = (ids: string[]) => {
    setCustomers(prevCustomers => 
      prevCustomers.filter(customer => !ids.includes(customer.id))
    );
  };

  // Don't render children until data is loaded
  if (isLoading) {
    return null;
  }

  return (
    <CustomerContext.Provider value={{ customers, deleteCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
} 