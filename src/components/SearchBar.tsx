'use client';

import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ placeholder = 'Search...', value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[--text-secondary]" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-9 pr-4 py-2 w-[280px] rounded-lg border border-[--border-color] bg-[--background-app] text-sm 
        placeholder:text-[--text-secondary] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
} 