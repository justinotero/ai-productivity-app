'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { customers as initialCustomers } from '@/data/customers';
import { Customer } from '@/types/customer';

interface CustomerContextType {
  customers: Customer[];
  deleteCustomers: (ids: string[]) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(() => 
    initialCustomers.map(customer => ({
      ...customer,
      lastOrder: new Date(customer.lastOrder)
    }))
  );

  const deleteCustomers = (ids: string[]) => {
    setCustomers(prevCustomers => 
      prevCustomers.filter(customer => !ids.includes(customer.id))
    );
  };

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