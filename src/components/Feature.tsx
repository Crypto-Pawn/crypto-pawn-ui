import { FC } from "react";
import { cn } from "@/libs/style";

export const Feature: FC = () => {
  const logos = [
    { src: "metamask.png", alt: "Metamask" },
    { src: "binance.png", alt: "Binance" },
    { src: "meta.png", alt: "Meta" },
    { src: "opensea.png", alt: "OpenSea" },
  ];

  return (
    <section className={cn("bg-black text-white px-6 py-2 ")}>
      <div className={cn("max-w-screen-xl mx-auto")}>
        <h2 className={cn("text-lg font-semibold mb-6")}>FEATURE ON</h2>
        <div
          className={cn(
            "bg-zinc-900 p-6 rounded-xl flex flex-wrap gap-6",
            "justify-center md:justify-between items-center"
          )}
        >
          {logos.map(({ src, alt }) => (
            <img
              key={alt}
              src={`src/assets/images/${src}`}
              alt={alt}
              className={cn("h-10 object-contain")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
