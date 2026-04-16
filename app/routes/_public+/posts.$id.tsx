import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Link, useLoaderData } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { getPost } from '~/lib/microcms'
import { Separator } from '~/components/ui/separator'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id
  if (!id) throw new Response('Not Found', { status: 404 })
  const post = await getPost(id)
  return { post }
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> | undefined }) {
  const title = data?.post.title ?? '記事'
  return [
    { title: `${title} — vegedot` },
    { name: 'description', content: data?.post.description ?? '' },
  ]
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <article className="mx-auto max-w-2xl">
      <nav className="mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
          ← 一覧へ戻る
        </Link>
      </nav>

      <header className="mb-8">
        <p className="text-muted-foreground mb-2 text-sm">
          {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
        </p>
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
        {post.description && (
          <p className="text-muted-foreground mt-3 text-base">{post.description}</p>
        )}
      </header>

      {post.thumbnail && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={post.thumbnail.url}
            alt={post.title}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            className="w-full object-cover"
          />
        </div>
      )}

      <Separator className="mb-8" />

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  )
}
