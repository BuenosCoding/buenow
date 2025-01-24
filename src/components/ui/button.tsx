import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow hover:from-purple-600 hover:to-indigo-600':
              variant === 'default',
            'border border-purple-200 bg-transparent hover:bg-purple-100':
              variant === 'outline',
            'hover:bg-purple-100': variant === 'ghost',
            'h-9 px-4 py-2': size === 'default',
            'h-8 px-3': size === 'sm',
            'h-10 px-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };