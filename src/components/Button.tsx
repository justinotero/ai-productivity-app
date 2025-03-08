import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  children, 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        variant === 'default' && 'bg-[--text-primary] text-white hover:opacity-90',
        variant === 'outline' && 'border border-[--border-color] hover:bg-[--background-hover]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 