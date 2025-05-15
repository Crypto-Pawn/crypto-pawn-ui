import * as React from 'react';
import { cn } from '@/libs/style.ts';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
  icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, icon, children, ...props }, ref) => {
    return (
      <div className={cn('flex items-center gap-2 bg-[#1E2329] border border-[#282D36] rounded-lg p-2', wrapperClassName)}>
        {icon && <div className="flex-shrink-0 text-gray-400">{icon}</div>}
        <select
          ref={ref}
          className={cn(
            'bg-transparent text-gray-200 outline-none w-full',
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };