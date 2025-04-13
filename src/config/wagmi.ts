import { defineChain, http } from 'viem';
import { createConfig } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { bscTestnet } from 'wagmi/chains';
import { PROVIDER_CHAIN_ID, PROVIDER_POLLING_INTERVAL } from '@/utils/config';


// Localhost Hardhat Chain
export const hardhatChain = defineChain({
  id: 31337,
  name: 'Hardhat Local Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://localhost:8545' },
  },
});

// TODO:Extend BSC testnet
export const bscTestnetChain = defineChain({
  ...bscTestnet,
  rpcUrls: {
    default: {
      http: [
        'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
        'https://bsc-testnet.bnbchain.org',
        ...bscTestnet.rpcUrls.default.http,
      ],
    },
  },
});

const chains = [hardhatChain, bscTestnetChain];
const activeChain = chains.find(chain => chain.id === PROVIDER_CHAIN_ID) || hardhatChain;

export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors: [metaMask()],
  transports: {
    [hardhatChain.id]: http(),
    // [bscTestnetChain.id]: http(),
  },
  pollingInterval: PROVIDER_POLLING_INTERVAL,
  ssr: false,
});
