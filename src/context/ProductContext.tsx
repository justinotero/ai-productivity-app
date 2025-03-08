'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types/product';

interface ProductContextType {
  products: Product[];
  deleteProducts: (ids: string[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const deleteProducts = (ids: string[]) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => !ids.includes(product.id))
    );
  };

  return (
    <ProductContext.Provider value={{ products, deleteProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
} 