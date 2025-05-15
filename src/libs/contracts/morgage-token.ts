// Import the ABI from the JSON file
import mortgageJson from './abis/MortgageToken.json';

interface MortgageTokenContract {
  address: string;
  abi: any[];
}

const mortgageToken: MortgageTokenContract = {
  address: mortgageJson.address,
  abi: mortgageJson.abi
};

// Export the ABI and address separately
export const mortgageTokenAbi = mortgageToken.abi;
export const mortgageTokenAddress = mortgageToken.address as `0x${string}`;

// Export the entire token info as default
export default mortgageToken;