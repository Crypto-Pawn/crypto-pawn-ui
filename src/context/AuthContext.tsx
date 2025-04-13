import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import {keccak256, recoverMessageAddress, toBytes} from 'viem';

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

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const login = async () => {
    if (!address) throw new Error('Wallet not connected');

    const timestamp = Date.now();
    const raw = `crypto-pawn-login:${address}:${timestamp}`;
    const hashedNonce = keccak256(toBytes(raw));
    const nonce = `Login with this signature: ${hashedNonce}`;

    const signature = await signMessageAsync({ message: nonce });
    const recovered = await recoverMessageAddress({ message: nonce, signature });

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new Error('Signature mismatch');
    }

    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);

    // Force reload so wagmi re-checks connection
    window.location.reload();
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
