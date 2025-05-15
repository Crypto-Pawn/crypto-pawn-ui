import {
  createContext,
  useState,
  useContext,
  ReactNode,
  PropsWithChildren,
} from 'react';
import { nanoid } from 'nanoid';
import { ToastMessage, ToastType } from './Toast.tsx';
import { Toast } from './index.ts';

interface State {
  push: (message: string, type?: ToastType, hint?: string | ReactNode) => void;
}

const defaultState: State = {
  push: () => {
    throw new Error('Unimplemented');
  },
};

const ToastContext = createContext<State>(defaultState);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const push = (
    message: string,
    type?: ToastType,
    hint?: string | ReactNode,
  ) => {
    setMessages([...messages, { id: nanoid(), message, type, hint }]);
  };

  const onItemDismiss = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {
        !!messages?.length && (
          <div className="fixed top-0 left-0 flex justify-center w-full z-999">
            <div className="fixed sm:bottom-8 sm:right-6 max-w-screen-sm w-full px-4 bottom-4 right-0 h-fit">
              { messages.map((message) => (
                <Toast
                  key={ message.id }
                  { ...message }
                  className="mt-2"
                  onDismiss={ onItemDismiss }
                />
              )) }
            </div>
          </div>
        )
      }
    </ToastContext.Provider>
  );
};

export const useToast = (): State => {
  const state = useContext(ToastContext);
  if (!state) {
    throw new Error('useToast must be inside a ToastProvider');
  }
  return state;
};
