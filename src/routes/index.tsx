import { Feature } from '@/components/Feature'
import { Hero } from '@/components/Hero'
import { createFileRoute } from '@tanstack/react-router'

function Index() {
  return (
    <div className="p-2">
      <Hero />
      <Feature />
    </div>
  )
}
export const Route = createFileRoute('/')({
  component: Index,
})