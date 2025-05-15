import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@/libs/style.ts';
import { AuthGuard } from '@/components/AuthGuard';
import { TokenBalance } from '@/components/TokenBalance';
import { useAccount, useBalance } from 'wagmi';
import { formatAddress2 } from '@/utils';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { address } = useAccount();
  const [formattedEthBalance, setFormattedEthBalance] = useState<string>('0');
  
  // Get ETH balance using wagmi's useBalance hook
  const { data: ethBalance } = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: !!address,
    }
  });
  
  // Format ETH balance
  useEffect(() => {
    if (!ethBalance) return;
    try {
      const formattedValue = Number(formatUnits(ethBalance.value, ethBalance.decimals));
      setFormattedEthBalance(formattedValue.toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }));
    } catch (error) {
      console.error('Error formatting ETH balance:', error);
      setFormattedEthBalance('Error');
    }
  }, [ethBalance]);
  
  return (
    <AuthGuard>
      <section className={cn('bg-black text-white px-6 py-12 font-sans')}>
        <div className="max-w-screen-xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <p className="text-zinc-400 text-lg">
            View your wallet, NFTs, and loan history.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Wallet Information */}
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">Wallet Info</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-zinc-400">Address</h3>
                  <p className="text-xl font-mono">{formatAddress2(address || '')}</p>
                </div>
                
                {/* ETH Balance */}
                <div className="flex flex-col">
                  <h3 className="text-lg text-zinc-400">ETH Balance</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{formattedEthBalance}</span>
                    <span className="text-sm font-medium text-blue-500">ETH</span>
                  </div>
                </div>
                
                <TokenBalance className="mt-6" />
              </div>
            </div>
            
            {/* Placeholder for future content */}
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-2xl font-bold mb-4">Loan Activity</h2>
              <div className="border border-dashed border-zinc-700 p-8 text-center rounded-xl text-zinc-500">
                No loan activity yet
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}
