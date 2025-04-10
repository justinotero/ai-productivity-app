'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/Sidebar';
import { OrderProvider } from '@/context/OrderContext';
import { ProductProvider } from '@/context/ProductContext';
import { CustomerProvider } from '@/context/CustomerContext';
import { DialogProvider } from '@/services/DialogService';
import { useState } from 'react';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DialogProvider>
          <OrderProvider>
            <ProductProvider>
              <CustomerProvider>
                <div className="flex min-h-screen bg-[--background]">
                  <Sidebar onExpandedChange={setIsSidebarExpanded} />
                  <motion.main 
                    className="flex-1 p-6"
                    animate={{ 
                      marginLeft: isSidebarExpanded ? '16rem' : '4rem'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.main>
                </div>
              </CustomerProvider>
            </ProductProvider>
          </OrderProvider>
        </DialogProvider>
      </body>
    </html>
  );
}
