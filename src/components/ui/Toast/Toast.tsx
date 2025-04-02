import { useMemo, useEffect, ReactNode } from 'react';
import { Close } from '@/components/icons/Close.tsx';
import { cn } from '@/libs/style.ts';
export type ToastType = 'warning' | 'success' | 'danger';

export interface ToastMessage {
  id: string;
  message: string;
  type?: ToastType;
  hint?: string | ReactNode;
}
interface Props extends ToastMessage {
  className?: string;
  onDismiss: (id: string) => void;
}

export const Toast: React.FunctionComponent<Props> = ({
  id,
  message,
  type,
  hint,
  className,
  onDismiss,
}) => {
  const bgColor = useMemo<string>(() => {
    switch (type) {
      case 'danger':
        return 'bg-red-900';
      case 'success':
        return 'bg-greenNormal';
      case 'warning':
        return 'bg-amber-900';
      default:
        return 'bg-gray-600';
    }
  }, [type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDismiss(id);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      className={cn(
        bgColor,
        'rounded-md min-w-64 w-full p-4 flex flex-row items-center justify-between text-white shadow-sm transform-gpu translate-y-0 relative transition-all duration-500 ease-in-out',
        className,
      )}
    >
      <div className="w-max flex flex-row items-baseline ">
        {message}
        {hint}
      </div>
      <i onClick={() => onDismiss(id)} className={'cursor-pointer'}>
        <Close className="color-white" />
      </i>
    </div>
  );
};
