import {createFileRoute} from '@tanstack/react-router';
import { cn } from '@/libs/style';

const Explore = () => {
  return (
    <section className={cn("h-full bg-black text-white px-6 font-Arimo")}>
      <div className="max-w-screen-xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Explore NFTs</h1>
        <p className="text-zinc-400 text-lg">Browse available NFT loan listings.</p>
        <div className="border border-dashed border-zinc-700 p-12 text-center rounded-xl text-zinc-500">
          NFT listing grid coming soon...
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute('/explore')({
  component: Explore,
});
