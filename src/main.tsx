import {scan} from 'react-scan';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './libs/query.ts';
import {ToastProvider} from '@/components/ui/Toast';
import {AuthProvider} from './context/AuthContext.tsx';
import {WagmiProvider} from 'wagmi';
import {wagmiConfig} from '@/config/wagmi.ts';
import {StoreProvider} from './store/StoreProvider.tsx';

scan({enabled: false});

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ToastProvider>
        <WagmiProvider config={wagmiConfig}>
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <App/>
              </AuthProvider>
            </QueryClientProvider>
          </StoreProvider>
        </WagmiProvider>
      </ToastProvider>
    </StrictMode>
  );
}
