import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { keccak256, recoverMessageAddress, toBytes } from 'viem';

// Enhanced types for better type safety
type AuthState = {
  isAuthenticated: boolean;
  lastAuthenticated: number | null;
};

type AuthContextType = {
  login: () => Promise<boolean>;
  logout: (options?: { redirect?: boolean }) => void;
  isAuthenticated: boolean;
  refreshSession: () => void;
};

// Storage keys
const STORAGE_PREFIX = 'crypto-pawn';
const AUTH_KEY = `${STORAGE_PREFIX}-authenticated`;
const AUTH_TIMESTAMP_KEY = `${STORAGE_PREFIX}-auth-timestamp`;
const SESSION_DURATION = 3600000; // 1 hour in milliseconds

const AuthContext = createContext<AuthContextType>({
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  refreshSession: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  // Initialize auth state from storage
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const timestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY);
      return {
        isAuthenticated: 
          localStorage.getItem(AUTH_KEY) === 'true' &&
          !!timestamp &&
          Date.now() - parseInt(timestamp, 10) < SESSION_DURATION,
        lastAuthenticated: timestamp ? parseInt(timestamp, 10) : null
      };
    } catch (error) {
      console.error('Error reading auth state from storage:', error);
      return { isAuthenticated: false, lastAuthenticated: null };
    }
  });
  
  // Helper to update storage and state
  const updateAuthState = useCallback((authenticated: boolean, timestamp: number | null) => {
    try {
      if (authenticated && timestamp) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(AUTH_TIMESTAMP_KEY, timestamp.toString());
      } else {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_TIMESTAMP_KEY);
      }
      
      setAuthState({
        isAuthenticated: authenticated,
        lastAuthenticated: timestamp
      });
    } catch (error) {
      console.error('Error updating auth state:', error);
    }
  }, []);

  // Enhanced login with better error handling and return value
  const login = async (): Promise<boolean> => {
    try {

      const timestamp = Date.now();
      const raw = `${STORAGE_PREFIX}-login:${address}:${timestamp}`;
      const hashedNonce = keccak256(toBytes(raw));
      const nonce = `Login with this signature: ${hashedNonce}`;

      const signature = await signMessageAsync({ message: nonce });
      const recovered = await recoverMessageAddress({ message: nonce, signature });

      if (recovered.toLowerCase() !== address.toLowerCase()) {
        throw new Error('Signature verification failed');
      }

      updateAuthState(true, timestamp);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      updateAuthState(false, null);
      throw error; // Re-throw for handling in UI
    }
  };

  // Enhanced logout with options
  const logout = useCallback(({ redirect = true } = {}) => {
    updateAuthState(false, null);
    if (redirect) {
      window.location.href = '/'; // Redirect to home instead of reload
    }
  }, [updateAuthState]);
  
  // New function to refresh the session
  const refreshSession = useCallback(() => {
    if (authState.isAuthenticated && address) {
      updateAuthState(true, Date.now());
    }
  }, [authState.isAuthenticated, address, updateAuthState]);

  // Clear auth when wallet disconnects
  useEffect(() => {
    if (!address && authState.isAuthenticated) {
      updateAuthState(false, null);
    }
  }, [address, authState.isAuthenticated, updateAuthState]);

  // Session expiry check
  useEffect(() => {
    // Use less frequent checks (every 30s instead of every 1s)
    const interval = setInterval(() => {
      const timestamp = authState.lastAuthenticated;
      if (timestamp && Date.now() - timestamp >= SESSION_DURATION) {
        logout({ redirect: false });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [authState.lastAuthenticated, logout]);

  // Memoized context value
  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated: authState.isAuthenticated,
    refreshSession,
  }), [authState.isAuthenticated, logout, refreshSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);