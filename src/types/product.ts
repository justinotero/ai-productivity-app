export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  name: string;
  image: string;
  status: ProductStatus;
  price: number;
  totalSales: number;
  createdAt: Date;
}

export type ProductFilter = 'all' | ProductStatus; 