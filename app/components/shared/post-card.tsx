import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Link } from 'react-router'
import type { Post } from '~/lib/microcms'
import { Card, CardContent, CardHeader } from '~/components/ui/card'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        {post.thumbnail && (
          <div className="aspect-video w-full overflow-hidden rounded-t-xl">
            <img
              src={post.thumbnail.url}
              alt={post.title}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <p className="text-muted-foreground text-xs">
            {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
          </p>
          <h3 className="font-bold leading-snug">{post.title}</h3>
        </CardHeader>
        {post.description && (
          <CardContent>
            <p className="text-muted-foreground line-clamp-3 text-sm">{post.description}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
