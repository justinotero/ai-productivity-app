'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { orders as initialOrders } from '@/data/orders';
import { Order, FulfillmentStatus, OrderStatus } from '@/types/order';

interface OrderContextType {
  orders: Order[];
  updateOrderFulfillment: (orderId: string, fulfillment: FulfillmentStatus) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  orderStats: {
    active: number;
    unfulfilled: number;
    pendingReceipt: number;
    fulfilled: number;
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
  };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [orderStats, setOrderStats] = useState({
    active: 0,
    unfulfilled: 0,
    pendingReceipt: 0,
    fulfilled: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  // Calculate order stats whenever orders change
  useEffect(() => {
    // Get unique customers (actual count from our data)
    const uniqueCustomers = new Set(orders.map(order => order.customer.name));
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    const stats = {
      active: orders.filter(order => order.status === 'Authorized').length,
      unfulfilled: orders.filter(order => order.fulfillment === 'Unfulfilled').length,
      pendingReceipt: orders.filter(order => order.fulfillment === 'Pending Receipt').length,
      fulfilled: orders.filter(order => order.fulfillment === 'Fulfilled').length,
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: uniqueCustomers.size, // This will be 7 based on our data
    };
    
    setOrderStats(stats);
  }, [orders]);

  const updateOrderFulfillment = (orderId: string, fulfillment: FulfillmentStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              fulfillment,
              updated: 'Today'
            }
          : order
      )
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { 
              ...order, 
              status,
              updated: 'Today'
            }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      updateOrderFulfillment, 
      updateOrderStatus,
      orderStats
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
} 