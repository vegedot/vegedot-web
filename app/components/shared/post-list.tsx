import type { Article } from '~/lib/microcms.server'

interface PostListProps {
  articles: Article[]
}

export default function PostList({ articles }: PostListProps) {
  if (articles.length === 0) {
    return <p className="text-center text-muted-foreground">記事がありません</p>
  }

  return (
    <ul className="space-y-4">
      {articles.map((article) => (
        <li key={article.id} className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p className="mt-2 text-muted-foreground">{article.body}</p>
        </li>
      ))}
    </ul>
  )
}
