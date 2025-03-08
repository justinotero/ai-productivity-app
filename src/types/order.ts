export type OrderStatus = 'Authorized' | 'Paid';
export type FulfillmentStatus = 'Unfulfilled' | 'Pending Receipt' | 'Fulfilled';

export interface Order {
  id: string;
  orderId: string;
  created: Date;
  customer: {
    name: string;
    avatar: string;
  };
  fulfillment: FulfillmentStatus;
  total: number;
  profit: number;
  status: OrderStatus;
  updated: Date | 'Today' | 'Yesterday';
}

export type OrderFilter = 'all' | 'active' | 'unpaid' | 'unfulfilled'; 