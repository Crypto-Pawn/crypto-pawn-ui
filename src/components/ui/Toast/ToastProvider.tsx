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
          <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
            {messages.map((message) => (
              <Toast
                key={message.id}
                id={message.id}
                message={message.message}
                type={message.type}
                hint={message.hint}
                onDismiss={onItemDismiss}
              />
            ))}
          </div>
        )
      }
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
