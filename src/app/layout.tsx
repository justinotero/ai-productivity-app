import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/Sidebar';
import { OrderProvider } from '@/context/OrderContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider>
          <div className="flex min-h-screen bg-[--background]">
            <div className="fixed inset-y-0 z-10 w-64 border-r border-[--border-color] bg-white">
              <Sidebar />
            </div>
            <div className="ml-64 flex-1">
              <main className="p-6 w-full">
                {children}
              </main>
            </div>
          </div>
        </OrderProvider>
      </body>
    </html>
  );
}
