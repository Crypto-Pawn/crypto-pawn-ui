import { defineChain, http } from 'viem';
import { createConfig } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { bscTestnet } from 'wagmi/chains';
import { 
  HARDHAT_CHAIN, 
  BSC_TESTNET_CHAIN,
  PROVIDER_CHAIN_ID, 
  PROVIDER_POLLING_INTERVAL,

} from '@/utils/config';

// Localhost Hardhat Chain - using our centralized config
export const hardhatChain = defineChain({
  id: HARDHAT_CHAIN.id,
  name: HARDHAT_CHAIN.name,
  nativeCurrency: {
    name: HARDHAT_CHAIN.currency.name,
    symbol: HARDHAT_CHAIN.currency.symbol,
    decimals: HARDHAT_CHAIN.currency.decimals,
  },
  rpcUrls: {
    default: { http: HARDHAT_CHAIN.rpcUrls },
  },
  blockExplorers: {
    default: { 
      name: 'Local Explorer', 
      url: HARDHAT_CHAIN.blockExplorerUrls[0] 
    },
  },
});

// BSC Testnet - using our centralized config
export const bscTestnetChain = defineChain({
  ...bscTestnet,
  rpcUrls: {
    default: {
      http: BSC_TESTNET_CHAIN.rpcUrls,
    },
  },
});

const chains = [hardhatChain, bscTestnetChain];
const activeChain = chains.find(chain => chain.id === PROVIDER_CHAIN_ID) || hardhatChain;

// Create transports with correct typing for all supported chains
const transports = {
  [31337]: http(HARDHAT_CHAIN.rpcUrls[0]),
  [97]: http(BSC_TESTNET_CHAIN.rpcUrls[0]),
} as const;

export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors: [metaMask()],
  transports,
  pollingInterval: PROVIDER_POLLING_INTERVAL,
  ssr: false,
});
