'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings,
  Menu
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  onExpandedChange?: (expanded: boolean) => void;
}

export function Sidebar({ onExpandedChange }: SidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  return (
    <motion.div 
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r border-[--border-color] bg-[--background-card]`}
      animate={{ width: isExpanded ? '16rem' : '4rem' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 border-b border-[--border-color]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-[--background-hover] text-[--text-primary]"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>
          {isExpanded && (
            <motion.span 
              className="font-semibold text-[--text-primary]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Admin Panel
            </motion.span>
          )}
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                    ${isActive 
                      ? 'bg-[--primary-light] text-[--primary]' 
                      : 'text-[--text-secondary] hover:bg-[--background-hover] hover:text-[--text-primary]'
                    }
                  `}
                  title={!isExpanded ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 min-w-5" />
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
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
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm font-medium text-[--text-primary]">John Smith</p>
              <p className="text-xs text-[--text-secondary]">Admin</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 