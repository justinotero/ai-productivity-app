'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'h-9 px-4',
          {
            'bg-[--primary] text-white hover:bg-[--primary-hover]': variant === 'default',
            'border border-[--border-color] bg-transparent hover:bg-[--background-hover]': variant === 'outline',
            'hover:bg-[--background-hover]': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
); 