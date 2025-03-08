'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings,
  LayoutGrid
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[--border-color]">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white w-8 h-8 rounded flex items-center justify-center">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="font-semibold">Admin Panel</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    ${isActive 
                      ? 'bg-[--primary-light] text-[--primary]' 
                      : 'text-[--text-secondary] hover:bg-[--background-hover]'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[--border-color]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[--primary-light] flex items-center justify-center">
            <span className="text-[--primary] text-sm font-medium">JS</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-[--text-secondary]">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
} 