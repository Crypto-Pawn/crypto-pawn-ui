import { FC } from 'react';
import { cn } from '@/libs/style';
interface Props {
  className?: string;
}

export const Close: FC<Props> = ({ className }) => {
  return (
    <svg
      className={cn('color-dark w-4 h-4 fill-white', className)}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="CloseRoundedIcon"
    >
      <path d="M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
    </svg>
  );
};
