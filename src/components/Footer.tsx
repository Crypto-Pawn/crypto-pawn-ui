import { cn } from "@/libs/style";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className={cn("bg-black border-zinc-800 px-6 py-10")}>
      <div className={cn("max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-Arimo")}>

        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold mb-2">CRYPTO PAWN</h3>
          <p className={cn("text-zinc-400 leading-relaxed")}>
            The world’s first and largest digital marketplace<br />
            for crypto collectibles and non-fungible tokens (NFTs).<br />
            Lend others and receive interest instantly after payback day.
          </p>
        </div>

        {/* Center */}
        <div>
          <h3 className="text-lg font-semibold mb-2">JOIN THE COMMUNITY</h3>
          <div className="flex gap-4 items-center">
            <img src="/icons/twitter.svg" alt="Twitter" className="h-6" />
            <img src="/icons/discord.svg" alt="Discord" className="h-6" />
            <img src="/icons/youtube.svg" alt="YouTube" className="h-6" />
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-lg font-semibold mb-2">NEED HELP?</h3>
          <button className={cn(
            "flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-md text-white hover:bg-zinc-700 transition"
          )}>
            📩 Contact Support
          </button>
        </div>

      </div>
    </footer>
  );
};
