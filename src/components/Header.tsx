import { FC } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/libs/style';
import { Button } from './ui/Button';
import { Input } from '@/components/ui/Input.tsx';
import {useNavigate} from '@tanstack/react-router';
import {LoginButton} from '@/components/LoginButton.tsx';

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className={cn('bg-black text-white py-5')}>
      <div className={cn('max-w-screen-xl mx-auto grid grid-cols-5 items-center px-6 font-Arimo gap-4')}>

        {/* Column 1: Logo + Brand */}
        <button className={cn('flex items-center gap-3 col-span-1')} onClick={() => {
          navigate({ to: '/' });
        }}>
          <img src="/src/assets/images/cryptoPawn.png" alt="Crypto Pawn" className="h-7 w-auto" />
          <span className="text-xl font-bold tracking-wide">CRYPTO PAWN</span>
        </button>

        {/* Column 2 + 3: Navigation (centered in grid) */}
        <div className="col-span-2 flex justify-center gap-6">
          <Button
            variant="ghost"
            className={cn(
              'px-5 py-2 text-base',
              'text-zinc-400 hover:text-purple-600'
            )}
            onClick={() => {
              navigate({ to: '/explore' });
            }}
          >
            EXPLORE
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'px-5 py-2 text-base',
              'text-zinc-400 hover:text-purple-600'
            )}
            onClick={() => {
              navigate({ to: '/profile' });
            }}
          >
            PROFILE
          </Button>
        </div>

        {/* Column 4 + 5: Search + Wallet */}
        <div className="col-span-2 flex justify-end items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              placeholder="Search Transaction ID"
              className={cn(
                'pl-12 pr-5 py-6 rounded-full border border-zinc-700',
                'bg-black text-white placeholder:text-zinc-400',
                'w-[220px] sm:w-[260px] text-base'
              )}
            />
          </div>
          <LoginButton/>
        </div>
      </div>
    </header>
  );
};
