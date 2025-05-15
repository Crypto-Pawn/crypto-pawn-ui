import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { cryptoPawnTokenAbi, cryptoPawnTokenAddress } from '@/libs/contracts/crypto-pawn-token';
import { cn } from '@/libs/style';

interface TokenBalanceProps {
  className?: string;
}

export const TokenBalance = ({ className }: TokenBalanceProps) => {
  const { address, isConnected } = useAccount();
  const [formattedBalance, setFormattedBalance] = useState<string>('0');

  const { data: balance, refetch } = useReadContract({
    address: cryptoPawnTokenAddress,
    abi: cryptoPawnTokenAbi,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Format the balance with proper decimals
  useEffect(() => {
    if (!balance) return;
    try {
      // Get decimals from the token contract (CPN uses 18 decimals as standard)
      const formattedValue = formatUnits(BigInt(balance.toString()), 18);
      // Format to 2 decimal places for display
      setFormattedBalance(Number(formattedValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    } catch (error) {
      console.error('Error formatting token balance:', error);
      setFormattedBalance('Error');
    }
  }, [balance]);

  // Refresh the balance periodically
  useEffect(() => {
    if (!isConnected || !address) return;
    
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isConnected, address, refetch]);

  return (
    <div className={cn('flex flex-col', className)}>
      <h3 className='text-lg text-zinc-400'>CPN Token Balance</h3>
      <div className='flex items-center gap-2'>
        <span className='text-2xl font-bold'>{formattedBalance}</span>
        <span className='text-sm font-medium text-purple-500'>CPN</span>
      </div>
    </div>
  );
};