import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/style.ts';

const badgeVariants = cva(
  'inline-flex items-center px-2 py-1 text-xs rounded-md border',
  {
    variants: {
      variant: {
        default: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
        primary: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        success: 'bg-green-500/10 text-green-500 border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        danger: 'bg-red-500/10 text-red-500 border-red-500/20',
        info: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span 
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };