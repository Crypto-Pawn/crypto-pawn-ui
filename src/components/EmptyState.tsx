import * as React from 'react';
import { cn } from '@/libs/style.ts';
import { Tag } from 'lucide-react';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title = 'No data found', message = 'There is no data available to display.', icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className
      )}
      {...props}
    >
      {icon || <Tag className="w-16 h-16 text-gray-500 mb-4" />}
      <h3 className="text-2xl font-bold text-gray-200">{title}</h3>
      <p className="text-gray-400 max-w-md mt-2">{message}</p>
    </div>
  )
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };