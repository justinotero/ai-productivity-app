export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orders: number;
  lastOrder: Date;
} 