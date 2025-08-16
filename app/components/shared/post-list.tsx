import { usePosts } from "../../hooks/use-posts";

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error.message}</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}