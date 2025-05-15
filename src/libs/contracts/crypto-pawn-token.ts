// Import the ABI from the JSON file
import tokenJson from './abis/CryptoPawnToken.json';

interface CryptoPawnTokenContract {
  address: string;
  abi: any[];
}

const cryptoPawnToken: CryptoPawnTokenContract = {
  address: tokenJson.address,
  abi: tokenJson.abi
};

// Export the ABI and address separately
export const cryptoPawnTokenAbi = cryptoPawnToken.abi;
export const cryptoPawnTokenAddress = cryptoPawnToken.address as `0x${string}`;

// Export the entire token info as default
export default cryptoPawnToken;