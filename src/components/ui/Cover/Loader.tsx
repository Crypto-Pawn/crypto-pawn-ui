import { ReactNode } from 'react';
import { cn } from '@/libs/style.ts';
import { Loader as Loading } from '@/components/icons';


interface Props {
  visible?: boolean;
  message?: string | ReactNode;
  title?: string | ReactNode;
  overideContent?: ReactNode;
}

export const Loader: React.FC<Props> = ({
  visible = true,
  message = '',
  title = '',
  overideContent,
}) => {
  if (!visible) return <></>;

  return (
    <>
      <div
        className={cn(
          'fixed w-screen h-screen bg-hex-0e0e0e9e top-0 left-0 z-999 backdrop-filter backdrop-blur-sm <sm:(px-4)',
        )}
      >
        <div className="flex w-full h-full items-center justify-center ">
          <div className="w-full h-1/3 max-w-610px min-w-xs max-h-400px min-h-200px rounded-ml text-center aspect-6/4 ">
            {overideContent ?? (
              <div className="block min-w-200 mt-20 bg-slate-800 rounded-xl p-5 m-auto w-max h-max items-center justify-center rounded-ml shadow-default text-white">
                <div className="w-full font-bold text-sm">{title}</div>
                <div className="flex mt-5 flex-col ">
                  <Loading className="w-14 h-14" />
                  <h4 className="mt-5 text-sm">
                    {message ? message : 'Loading...'}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
