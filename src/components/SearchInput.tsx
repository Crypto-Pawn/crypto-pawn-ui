import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/libs/style.ts';
import { Input } from './ui/Input';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  error?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, wrapperClassName, error, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', wrapperClassName)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          ref={ref}
          className={cn('pl-10 bg-[#1E2329] border-[#282D36] text-white rounded-lg focus:border-blue-500', className)}
          error={error}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };