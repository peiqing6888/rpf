'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CRTEffect } from '@/components/CRTEffect';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ForumPosts } from '@/components/ForumPosts';
import { Board, Post, boardsApi, postsApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function BoardPage() {
  const router = useRouter();
  const params = useParams();
  const boardId = typeof params?.id === 'string' ? params.id : null;
  const { user } = useAuthStore();

  const [board, setBoard] = useState<Board | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!boardId) {
      setError('Invalid board ID');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const [boardData, postsData] = await Promise.all([
        boardsApi.getOne(boardId),
        postsApi.getAll(boardId),
      ]);
      setBoard(boardData);
      setPosts(postsData);
    } catch (err) {
      console.error('Error fetching board data:', err);
      setError('Failed to load board');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [boardId]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !board) {
    return (
      <ErrorMessage
        message={error || 'Board not found'}
        fullScreen
        retry={fetchData}
      />
    );
  }

  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* 板塊頭部 */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={board.icon}
                alt={board.name}
                fill
                className="object-contain pixelated"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-4xl font-pixel text-primary mb-2">
                {board.name}
              </h1>
              <p className="text-gray-400 mb-4">
                {board.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="mr-1">📝</span>
                  {board.postCount} posts
                </div>
                <div className="flex items-center">
                  <span className="mr-1">👥</span>
                  {board.activeUsers} active
                </div>
                {board.settings.requireApproval && (
                  <div className="flex items-center text-primary">
                    <span className="mr-1">🔒</span>
                    Moderated
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 操作欄 */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => fetchData()}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                🔄 Refresh
              </button>
              {user && board.moderators.includes(user.id) && (
                <Link
                  href={`/forum/board/${board.id}/settings`}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  ⚙️ Settings
                </Link>
              )}
            </div>
            {user && (
              <Link
                href={`/forum/post/create?boardId=${board.id}`}
                className="arcade-button"
              >
                Create Post
              </Link>
            )}
          </div>

          {/* 帖子列表 */}
          {posts.length > 0 ? (
            <ForumPosts
              posts={posts}
              onUpdate={fetchData}
            />
          ) : (
            <div className="text-center py-12 border-2 border-primary rounded-lg">
              <p className="text-gray-400 mb-4">
                No posts yet. Be the first to start a discussion!
              </p>
              {user ? (
                <Link
                  href={`/forum/post/create?boardId=${board.id}`}
                  className="arcade-button"
                >
                  Create Post
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-white transition-colors"
                >
                  Sign in to create a post
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </CRTEffect>
  );
} 