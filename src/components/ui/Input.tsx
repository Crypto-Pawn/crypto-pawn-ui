import * as React from 'react';
import { cn } from '@/libs/style.ts';
import { useRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, type, wrapperClassName, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onFocus = () => {
      if (type === 'number' && inputRef?.current?.value?.startsWith('0')) {
        inputRef?.current?.select?.();
      }
    };

    return (
      <div ref={ref} className={wrapperClassName}>
        <input
          type={type}
          className={cn(
            'block h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500 focus:border-red-500' : '',
            className,
          )}
          ref={inputRef}
          onFocus={onFocus}
          {...props}
        />
        {error && <span className="text-xs italic text-destructive">{error}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
