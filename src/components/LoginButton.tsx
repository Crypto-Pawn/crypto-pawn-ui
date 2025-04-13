import { Button } from '@/components/ui/Button';
import { Wallet } from 'lucide-react';
import { useAccount, useConnect } from 'wagmi';
import { PROVIDER_CHAIN_ID } from '@/utils/config';
import { formatAddress } from '@/utils';
import { useToast } from '@/components/ui/Toast';
import { useAuthContext } from '@/context/AuthContext';
import { useStoreProvider } from '@/store/StoreProvider';
import { getState } from '@/store/reducer';
import { isMobileDevice, isMetaMaskWebView } from '@/utils/common';
import {cn} from "@/libs/style.ts";

export const LoginButton: React.FC = () => {
  const toast = useToast();
  const isMobile = isMobileDevice();
  const isMetaMaskWV = isMetaMaskWebView();

  const { address, isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { login, isAuthenticated } = useAuthContext();
  const { dispatch } = useStoreProvider();
  const { logout } = useAuthContext();
  const handleLogout = () => {
    logout();
    toast.push('You have been logged out', 'warning');
  };

  const handleLogin = async (connector: any) => {
    try {
      dispatch(getState({ showLoader: true, loaderMessage: 'Connecting wallet...' }));

      const { accounts } = await connectAsync({ connector, chainId: PROVIDER_CHAIN_ID });

      if (!accounts?.[0]) {
        toast.push('Wallet address not found', 'danger');
        connector?.disconnect?.();
        return;
      }

      await login();
      toast.push('Logged in successfully', 'success');
    } catch (error) {
      toast.push('Login failed', 'danger');
      console.error(error);
    } finally {
      dispatch(getState({ showLoader: false }));
    }
  };

  if (isConnected && isAuthenticated) {
    return (
      <>
        <Button variant="secondary" size="lg" className={cn(
          "px-8 py-2 text-base",
          "hover:text-purple-600")}>
          <Wallet />
          <span>{formatAddress(address ?? '')}</span>
        </Button>
        <Button variant="ghost" onClick={handleLogout}>
           Logout
        </Button>
      </>
    );
  }

  return (
    <>
      {!isMobile || (isMobile && isMetaMaskWV) ? (
        connectors
          .filter((c) => c.name === 'MetaMask')
          .map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => handleLogin(connector)}
              variant="purple" size="lg" className={cn(
              "px-8 py-2 text-base",
              "hover:text-purple-600")}
            >
              <Wallet />
              <span>Login</span>
            </Button>
          ))
      ) : (
        <></>
      )}
    </>
  );
};
