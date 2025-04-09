import { FC } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/Input";
import { cn } from "@/libs/style";
import {Button} from "@/components/ui/Button.tsx";

export const Header: FC = () => {
  return (
    <header className={cn("bg-black border-zinc-800 py-4")}>
      <div className={cn("max-w-screen-xl mx-auto grid grid-cols-3 items-center px-6 font-Arimo")}>
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <img src="/cryptoPawn.png" alt="Crypto Pawn" className="h-6" />
          <span className="text-lg font-bold tracking-wide">CRYPTO PAWN</span>
        </div>

        {/* Middle: Navigation */}
        <nav className="flex justify-center gap-4">
          <button
            className={cn(
              "px-4 py-1 text-sm font-medium rounded-full transition-all",
              "text-zinc-400 hover:text-purple-600 hover:bg-zinc-800"
            )}
          >
            EXPLORE
          </button>
          <button
            className={cn(
              "px-4 py-1 text-sm font-medium rounded-full transition-all",
              "text-zinc-400 hover:text-purple-600 hover:bg-zinc-800"
            )}
          >
            PROFILE
          </button>
        </nav>

        {/* Right: Search + Wallet */}
        <div className="flex justify-end gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search..."
              className={cn(
                "pl-9 pr-4 py-2 rounded-full border border-zinc-700",
                "bg-black text-white placeholder:text-zinc-400 w-[180px] sm:w-[200px]"
              )}
            />
          </div>
          <Button variant="pink" size="sm">Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
};
