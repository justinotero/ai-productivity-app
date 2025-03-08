'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ProductFilter } from '@/types/product';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0].id);

  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="border-b border-[--border-color]">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              py-3 px-1 text-sm font-medium border-b-2 -mb-px
              ${activeTab === tab.id
                ? 'border-[--primary] text-[--primary]'
                : 'border-transparent text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-color]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 