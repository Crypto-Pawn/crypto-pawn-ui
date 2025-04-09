import { createFileRoute } from '@tanstack/react-router'
import {cn} from "@/libs/style.ts";

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <section className={cn("bg-black text-white px-6 py-12 font-Arimo")}>
    <div className="max-w-screen-xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">My Profile</h1>
      <p className="text-zinc-400 text-lg">View your wallet, NFTs, and loan history.</p>
      <div className="border border-dashed border-zinc-700 p-12 text-center rounded-xl text-zinc-500">
        Profile details coming soon...
      </div>
    </div>
  </section>
}
