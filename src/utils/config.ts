// Type definitions for better chain handling
export type SupportedChainId = 31337 | 97; // Hardhat and BSC Testnet IDs

export interface ChainConfig {
  id: SupportedChainId;
  name: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  testnet: boolean;
}

// Hardhat Chain Configuration
export const HARDHAT_CHAIN: ChainConfig = {
  id: 31337,
  name: 'Hardhat Local Testnet',
  currency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['http://127.0.0.1:8545'],
  blockExplorerUrls: ['http://localhost:8545'],
  testnet: true,
};

// BSC Testnet Configuration
export const BSC_TESTNET_CHAIN: ChainConfig = {
  id: 97,
  name: 'BSC Testnet',
  currency: {
    name: 'Binance Coin',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: [
    'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    'https://bsc-testnet.bnbchain.org',
  ],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
  testnet: true,
};

// Map of all supported chains with explicit type annotation
export const CHAIN_CONFIGS: Record<SupportedChainId, ChainConfig> = {
  31337: HARDHAT_CHAIN,
  97: BSC_TESTNET_CHAIN
};

// Environment variables with better type safety and defaults
export const env = {
  providerChainId: parseInt(import.meta.env.VITE_PROVIDER_CHAIN_ID || '31337') as SupportedChainId,
  providerPollingInterval: parseInt(import.meta.env.VITE_PROVIDER_POLLING_INTERVAL || '4000'),
  isDevelopment: import.meta.env.DEV === true,
  isProduction: import.meta.env.PROD === true,
};

// Legacy exports for backward compatibility
export const PROVIDER_CHAIN_ID = env.providerChainId;
export const PROVIDER_POLLING_INTERVAL = env.providerPollingInterval;
