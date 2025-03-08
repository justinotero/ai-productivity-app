'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  className?: string;
}

interface PillDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  variant?: 'fulfillment' | 'status';
}

const getColorClasses = (value: string, variant: 'fulfillment' | 'status' = 'status') => {
  if (variant === 'fulfillment') {
    switch (value) {
      case 'Fulfilled':
        return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
      case 'Unfulfilled':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'Pending Receipt':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  } else {
    switch (value) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
      case 'Authorized':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  }
};

const getMenuItemClasses = (isSelected: boolean, value: string, variant: 'fulfillment' | 'status') => {
  const baseClasses = 'w-full text-left px-4 py-2 text-sm transition-colors duration-150';
  const colorClasses = getColorClasses(value, variant);
  const selectedClasses = isSelected ? 'opacity-100' : 'opacity-75 hover:opacity-100';
  
  return `${baseClasses} ${colorClasses} ${selectedClasses}`;
};

export function PillDropdown({ value, options, onChange, variant = 'status' }: PillDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full
          transition-all duration-200 shadow-sm
          ${getColorClasses(value, variant)}
          ${isOpen ? 'ring-2 ring-black/5' : ''}
        `}
      >
        {value}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={getMenuItemClasses(option.value === value, option.value, variant)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 