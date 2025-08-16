import type { Route } from '../../+types/root'
import { Separator } from '~/components/ui/separator'
import PostList from '~/components/shared/post-list'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'home' }, { name: 'description', content: 'home' }]
}

export default function Home() {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">POSTS</h2>
      <Separator className="my-4" />
      <PostList />
    </>
  )
}
