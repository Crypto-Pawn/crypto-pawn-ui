import { FC } from 'react';
import {cn} from '@/libs/style.ts';
import {Button} from '@/components/ui/Button.tsx';

export const Footer: FC = () => {
  return (
    <footer className={cn('bg-black text-white px-6 py-4')}>
      <div className={cn('max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-base font-Arimo')}>

        {/* Left */}
        <div>
          <h3 className="text-xl font-bold mb-3">CRYPTO PAWN</h3>
          <p className="text-zinc-400 leading-relaxed">
            The world’s first and largest digital marketplace<br />
            for crypto collectibles and non-fungible tokens (NFTs).<br />
            Lend others and receive interest instantly after payback day.
          </p>
        </div>

        {/* Middle */}
        <div>
          <h3 className="text-xl font-bold mb-3">JOIN THE COMMUNITY</h3>
          <div className="flex gap-5 items-center">
            <img src="src/assets/images/twitter.png" alt="Twitter" className="h-7 " />
            <img src="src/assets/images/discord.png" alt="Discord" className="h-7" />
            <img src="src/assets/images/X.png" alt="X" className="h-7 bg-amber-50" />
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-xl font-bold mb-3">NEED HELP?</h3>
          <Button className={cn(
            'flex items-center gap-3 px-5 py-3 rounded-md',
            'bg-zinc-800 text-white hover:bg-zinc-700 text-base font-medium'
          )}>
            📩 Contact Support
          </Button>
        </div>

      </div>
    </footer>
  );
};
