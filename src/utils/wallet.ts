import { CHAIN_CONFIGS } from '@/utils/config';
import { env } from '@/utils/config';

// Type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isMetaMask?: boolean;
    };
  }
}

export const switchOrAddNetwork = async (chainId = env.providerChainId) => {
    if (!window.ethereum) {
        throw new Error('MetaMask not installed');
    }
    
    const chainConfig = CHAIN_CONFIGS[chainId];
    if (!chainConfig) {
        throw new Error(`Chain configuration not found for ID: ${chainId}`);
    }

    const chainIdHex = `0x${chainId.toString(16)}`;

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }],
        });
    } catch (switchError: any) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: chainIdHex,
                        chainName: chainConfig.name,
                        nativeCurrency: chainConfig.currency,
                        rpcUrls: chainConfig.rpcUrls,
                        blockExplorerUrls: chainConfig.blockExplorerUrls,
                    }],
                });
            } catch (addError) {
                console.warn('Add chain failed:', addError);
            }
        } else {
            console.warn('Switch chain failed:', switchError);
        }
    }
};

// Export useful helper functions
export const isMetaMaskInstalled = (): boolean => {
    return window.ethereum?.isMetaMask === true;
};
