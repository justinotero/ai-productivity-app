'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ children, content, side = 'right' }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className="z-50 overflow-hidden rounded-md border border-[--border-color] bg-[--background-app] px-3 py-1.5 text-sm text-[--text-primary] shadow-md animate-in fade-in-0 zoom-in-95"
            sideOffset={8}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[--background-app] stroke-[--border-color]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
} 