export const switchOrAddNetwork = async () => {
    const chainIdHex = '0x7A69'; // 31337 in hex

    const hardhatParams = {
        chainId: chainIdHex,
        chainName: 'Hardhat Local',
        nativeCurrency: {
            name: 'Hardhat ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['http://127.0.0.1:8545'],
        blockExplorerUrls: ['http://localhost:8545'],
    };

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
                    params: [hardhatParams],
                });
            } catch (addError) {
                console.warn('Add chain failed:', addError);
            }
        } else {
            console.warn('Switch chain failed:', switchError);
        }
    }
};
