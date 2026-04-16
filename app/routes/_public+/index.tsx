import type { LoaderFunctionArgs } from 'react-router'
import { useLoaderData } from 'react-router'
import { getPosts } from '~/lib/microcms'
import { Separator } from '~/components/ui/separator'
import PostCard from '~/components/shared/post-card'

export async function loader({}: LoaderFunctionArgs) {
  const data = await getPosts()
  return { posts: data.contents }
}

export function meta() {
  return [{ title: 'vegedot — blog' }, { name: 'description', content: '個人ブログ' }]
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <>
      <h2 className="text-center text-2xl font-bold">POSTS</h2>
      <Separator className="my-4" />
      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">投稿がありません</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
