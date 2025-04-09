import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {cn} from "@/libs/style.ts";

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-[hsl(var(--orange-normal))] text-white hover:bg-[hsl(var(--orange-normal-hover))]',
        pink: 'bg-gradient-to-r from-[#C084FC] to-[#EC4899] text-white hover:brightness-95',
        ghost: 'bg-transparent hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]',
        outline: 'border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--black-11))]',
        secondary: 'bg-[hsl(var(--black-10))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--black-9))]',
        destructive: 'bg-[hsl(var(--red))] text-white hover:brightness-90',
        link: 'text-[hsl(var(--orange-normal))] underline underline-offset-4 hover:text-[hsl(var(--orange-normal-hover))]',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
