import { FC } from "react";
import { cn } from "@/libs/style";
import { Button } from "@/components/ui/Button";

export const Hero: FC = () => {
  return (
    <section className={cn("bg-black text-white px-6 py-2 font-Arimo")}>
      <div className={cn("max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center")}>

        {/* Left content */}
        <div className={cn("space-y-6")}>
          <h1 className={cn("text-4xl md:text-5xl font-bold leading-tight")}>
            Smart Asset Lending
          </h1>
          <p className={cn("text-lg text-zinc-400 max-w-md")}>
            Maximize your NFT’s potential with instant loans
          </p>
          <div className={cn("flex gap-4 pt-2")}>
            <Button
              variant="purple"
              className={cn(
                "px-10 py-2 text-base",
                "hover:text-purple-600 ")}
            >
              Lend
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "px-10 py-2 text-base border-2 border-zinc-800",
                "text-zinc-100 hover:text-purple-600")}
            >
              My NFTs
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className={cn("flex justify-center")}>
          <img
            src="src/assets/images/hero.png"
            alt="Astronaut Cat"
            className={cn("rounded-xl w-[300px] md:w-[360px]")}
          />
        </div>
      </div>
    </section>
  );
};
