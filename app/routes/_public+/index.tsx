import type { Route } from '../../+types/root'
import { microcms } from '~/lib/microcms.server'
import type { Article } from '~/lib/microcms.server'
import { Separator } from '~/components/ui/separator'
import PostList from '~/components/shared/post-list'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'home' }, { name: 'description', content: 'home' }]
}

export async function loader(): Promise<{ articles: Article[] }> {
  const data = await microcms.getList<Article>({
    endpoint: 'articles',
  })
  return { articles: data.contents }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">POSTS</h2>
      <Separator className="my-4" />
      <PostList articles={loaderData.articles} />
    </>
  )
}
