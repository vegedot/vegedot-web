const BASE_URL = 'https://vegedot-web-blog.microcms.io/api/v1'

export interface Post {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
  description?: string
  thumbnail?: {
    url: string
    width: number
    height: number
  }
}

export interface PostsResponse {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}

function getHeaders(): HeadersInit {
  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY as string
  return { 'X-MICROCMS-API-KEY': apiKey }
}

export async function getPosts(limit = 10, offset = 0): Promise<PostsResponse> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) })
  const response = await fetch(`${BASE_URL}/articles?${params}`, {
    headers: getHeaders(),
  })
  if (!response.ok) {
    throw new Error('投稿一覧の取得に失敗しました')
  }
  return response.json()
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: getHeaders(),
  })
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  return response.json()
}
