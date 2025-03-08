export type ProductStatus = 'Active' | 'Draft' | 'Archived';
export type ProductFilter = 'all' | 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
} 