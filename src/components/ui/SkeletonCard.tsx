import * as React from 'react';
import { cn } from '@/libs/style.ts';

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-[#1E2329] border border-[#282D36] rounded-xl overflow-hidden animate-pulse",
        className
      )}
      {...props}
    >
      <div className="h-48 bg-[#282D36]"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-[#282D36] rounded w-1/2"></div>
        <div className="h-4 bg-[#282D36] rounded w-3/4"></div>
        <div className="h-4 bg-[#282D36] rounded w-2/3"></div>
        <div className="h-8 bg-[#282D36] rounded w-full mt-4"></div>
      </div>
    </div>
  )
);
SkeletonCard.displayName = 'SkeletonCard';

export { SkeletonCard };