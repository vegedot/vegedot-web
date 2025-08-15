import { Separator } from '~/components/ui/separator'
import type { Route } from '../../+types/root'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'home' }, { name: 'description', content: 'home' }]
}

export default function Home() {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">POSTS</h2>
      <Separator className="my-4" />
    </>
  )
}
