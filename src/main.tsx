import { scan } from 'react-scan';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import {StoreProvider} from "./store";
import {queryClient} from "./libs/query.ts";
import {ToastProvider} from "@/components/ui/Toast";

scan({ enabled: false });

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ToastProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StoreProvider>
      </ToastProvider>
    </StrictMode>
  );
}
