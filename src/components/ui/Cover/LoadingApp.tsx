import cx from 'clsx';
import { ReactNode } from 'react';
import { Loader } from '@/components/icons';

interface Props {
  visible?: boolean;
  message?: string | ReactNode;
  title?: string | ReactNode;
  footer?: string | ReactNode;
  icon?: ReactNode;
}

export const LoadingApp: React.FC<Props> = ({
  visible = true,
  message = 'Please wait a minute...',
  title = '',
  footer,
  icon = <Loader className="!w-32 !h-32" />,
}) => {
  if (!visible) return <></>;
  return (
    <>
      <div
        className={cx(
          'fixed w-screen h-screen bg-hex-0e0e0e9e top-0 left-0 z-999',
        )}
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="w-full h-1/2 max-w-610px min-w-xs max-h-400px min-h-320px rounded-ml p-4 text-center aspect-6/4 ">
            <div className="flex w-full h-full items-center justify-center bg-white rounded-ml shadow-dao-wi relative">
              <div className="absolute top-4 font-bold text-xl">{title}</div>
              <div className="flex flex-col ">
                {icon}
                <h4>{message}</h4>
              </div>
              <div className="absolute bottom-4 w-full">{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
