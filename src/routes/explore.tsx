import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import MortgageTokenABI from '@/libs/contracts/abis/MortgageToken.json';
import { cn } from '@/libs/style';
import { createFileRoute } from '@tanstack/react-router';
import { Clock, ArrowUpDown, RefreshCcw } from 'lucide-react';
import { formatAddress } from '@/utils';

// Import components from the main components folder 
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/SearchInput';
import { Select } from '@/components/Select';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { SkeletonCard } from '@/components/SkeletonCard';
import { EmptyState } from '@/components/EmptyState';

// Helper function to safely convert BigInt values
const formatBigInt = (value: unknown): number | string => {
  if (typeof value === 'bigint') {
    // Check if the BigInt can be safely converted to a number
    if (value <= BigInt(Number.MAX_SAFE_INTEGER) && value >= BigInt(Number.MIN_SAFE_INTEGER)) {
      return Number(value);
    }
    // If too large, return as string
    return value.toString();
  }
  return Number(value) || 0; // Default to 0 if conversion fails
};

// Updated Mortgage type to correctly handle both string and number types
type Mortgage = {
  id: string | number;
  nftTokenId: string | number;
  principal: string | number;
  interest: string | number;
  duration: string | number;
  startTime: string | number;
  lender: string;
  borrower: string;
  nftContract: string;
  state: number;
};

export const Route = createFileRoute('/explore')({
  component: Explore,
});

function Explore() {
  const [mortgages, setMortgages] = useState<Mortgage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'principal'>('newest');

  const { data: mortgageData, isSuccess, refetch } = useReadContract({
    address: MortgageTokenABI.address as `0x${string}`,
    abi: MortgageTokenABI.abi,
    functionName: 'getAllMortgages',
    query: {
      enabled: true,
    },
  });

  useEffect(() => {
    if (isSuccess && mortgageData) {
      try {
        // Process the mortgage data to handle BigInt values
        const processedData = (mortgageData as any[]).map(mortgage => ({
          id: formatBigInt(mortgage.id),
          nftTokenId: formatBigInt(mortgage.nftTokenId),
          principal: formatBigInt(mortgage.principal),
          interest: formatBigInt(mortgage.interest),
          duration: formatBigInt(mortgage.duration),
          startTime: formatBigInt(mortgage.startTime),
          lender: mortgage.lender,
          borrower: mortgage.borrower,
          nftContract: mortgage.nftContract,
          state: Number(mortgage.state), // Enum states are small numbers, safe to convert
        }));
        
        setMortgages(processedData);
      } catch (error) {
        console.error('Error processing mortgage data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mortgageData, isSuccess]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleRefresh = () => {
    setIsLoading(true);
    refetch().finally(() => {
      setIsLoading(false);
    });
  };

  const getStateLabel = (state: number): string => {
    const stateLabels = ['PENDING', 'CANCELLED', 'SUPPLIED', 'REPAID', 'FORECLOSED'];
    return stateLabels[state] || 'UNKNOWN';
  };

  const getStateBadgeVariant = (state: number): "default" | "primary" | "success" | "warning" | "danger" | "info" => {
    const variantMap = [
      'warning', // PENDING
      'danger',  // CANCELLED
      'success', // SUPPLIED
      'primary', // REPAID
      'info'     // FORECLOSED
    ];
    return (variantMap[state] || 'default') as any;
  };

  // Generate a placeholder image for the NFT based on its ID
  const getNftImage = (id: string | number, tokenId: string | number): string => {
    return `https://source.unsplash.com/random/300x300/?nft,art,${Number(id) + Number(tokenId)}`;
  };

  // Apply search and sorting only (filtering removed)
  const filteredMortgages = mortgages.filter(mortgage => {
    // Filter by search query (ID, borrower, lender)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return String(mortgage.id).includes(query) || 
             mortgage.borrower.toLowerCase().includes(query) ||
             (mortgage.lender && mortgage.lender.toLowerCase().includes(query));
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return Number(b.id) - Number(a.id);
    } else {
      // Convert to numbers for comparison, or use 0 if conversion fails
      const principalA = typeof a.principal === 'string' ? parseFloat(a.principal) || 0 : a.principal;
      const principalB = typeof b.principal === 'string' ? parseFloat(b.principal) || 0 : b.principal;
      return principalB - principalA;
    }
  });

  return (
    <section className="min-h-screen bg-[#0F1318] text-white px-6 py-12">
      <div className="max-w-screen-xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold">Explore NFT Loans</h1>
            <p className="text-gray-400 mt-2">
              Browse available loan listings for NFT-backed mortgages
            </p>
          </div>
          <Button 
            onClick={handleRefresh}
            className={cn(
              'flex items-center gap-2 bg-[#1E2329] hover:bg-[#2B3139] text-white border border-[#282D36]',
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            )}
            disabled={isLoading}
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Search and sorting only */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchInput
            placeholder="Search by ID, borrower or lender..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            wrapperClassName="w-full sm:max-w-xs"
          />
          
          <Select
            icon={<ArrowUpDown className="w-4 h-4" />}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'principal')}
            wrapperClassName="w-full sm:w-auto"
          >
            <option value="newest">Newest first</option>
            <option value="principal">Highest amount</option>
          </Select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-gray-400 border-b border-[#282D36] pb-2">
          <span>{filteredMortgages.length} results</span>
          {isLoading && <span>Loading...</span>}
        </div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredMortgages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredMortgages.map((mortgage) => (
              <Card key={mortgage.id} className="hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <CardHeader>
                  <img 
                    src={getNftImage(mortgage.id, mortgage.nftTokenId)} 
                    alt={`NFT #${mortgage.nftTokenId}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant={getStateBadgeVariant(mortgage.state)}>
                      {getStateLabel(mortgage.state)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <CardTitle>
                      Loan #{mortgage.id}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{mortgage.duration} days</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Principal:</span>
                      <span className="text-white font-semibold">{mortgage.principal} CPT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Interest:</span>
                      <span className="text-white font-semibold">{mortgage.interest}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Borrower:</span>
                      <span className="text-blue-400">{formatAddress(mortgage.borrower)}</span>
                    </div>
                  </div>

                  <CardFooter>
                    {mortgage.state === 0 ? (
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
                      >
                        Lend Now
                      </Button>
                    ) : (
                      <div 
                        className="w-full py-2 rounded-lg bg-[#282D36] text-center text-sm text-gray-400"
                      >
                        {mortgage.state === 1 && 'Loan Cancelled'}
                        {mortgage.state === 2 && `Lent by ${formatAddress(mortgage.lender)}`}
                        {mortgage.state === 3 && 'Loan Repaid'}
                        {mortgage.state === 4 && 'Loan Foreclosed'}
                      </div>
                    )}
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No loans found"
            message={searchQuery 
              ? 'Try adjusting your search query' 
              : 'There are currently no active loan listings. Check back later or create a loan yourself.'}
          />
        )}
      </div>
    </section>
  );
}

export default Explore;
