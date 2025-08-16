import { useState, useEffect } from "react";

// APIから取得する投稿の型定義
export interface Post {
  id: string;
  title: string;
  body: string;
}

// APIエンドポイント（仮）
const POSTS_API_URL = "https://vegedot-web-blog.microcms.io/api/v1/articles";

/**
 * 投稿一覧を取得するためのカスタムフック
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // 内部APIをコール
        const response = await fetch(POSTS_API_URL, {
          headers: {
            "X-MICROCMS-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error("投稿の取得に失敗しました");
        }
        const data = await response.json();
        setPosts(data.contents);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
  }, []); // コンポーネントのマウント時に一度だけ実行

  return { posts, isLoading, error };
};