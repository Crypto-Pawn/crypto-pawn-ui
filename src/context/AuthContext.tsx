import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { recoverMessageAddress } from 'viem';

type AuthContextType = {
  login: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

const AUTH_KEY = 'crypto-pawn-authenticated';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = async () => {
    const nonce = `Sign this message to login: ${Math.floor(Math.random() * 1_000_000)}`;
    const signature = await signMessageAsync({ message: nonce });
    const recovered = await recoverMessageAddress({ message: nonce, signature });

    if (recovered.toLowerCase() === address?.toLowerCase()) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      setIsAuthenticated(false);
      throw new Error('Signature mismatch');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    disconnect();
  };

  useEffect(() => {
    if (!address) {
      setIsAuthenticated(false);
      localStorage.removeItem(AUTH_KEY);
    }
  }, [address]);

  const value = useMemo(() => ({ login, logout, isAuthenticated }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
