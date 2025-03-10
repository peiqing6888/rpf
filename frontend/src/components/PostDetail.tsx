import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { postsApi } from '@/lib/api';

interface User {
  id: string;
  user_metadata?: {
    roles?: string[];
  };
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
}

interface PostDetailProps {
  post: Post;
  onReactionUpdate?: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onReactionUpdate }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleReaction = async (type: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await postsApi.toggleReaction(post.id, type);
      onReactionUpdate?.();
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="bg-primary/5 border-2 border-primary rounded-lg p-6">
      {/* 帖子頭部 */}
      <header className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16">
            <Image
              src={post.author.avatar}
              alt={post.author.username}
              fill
              className="rounded-lg object-cover pixelated"
            />
          </div>
          <div className="mt-2">
            <div className="bg-primary px-2 py-1 rounded text-xs text-white text-center">
              {post.author.nameplate}
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <h1 className="text-2xl font-pixel text-primary mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/profile/${post.author.id}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {post.author.username}
            </Link>
            <span className="text-gray-400">•</span>
            <time className="text-gray-400" dateTime={post.createdAt}>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </time>
            {post.isPinned && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-primary">📌 Pinned</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 帖子內容 */}
      <div className="font-mono text-gray-200 whitespace-pre-wrap mb-6">
        {post.content}
      </div>

      {/* 帖子底部 */}
      <footer className="flex items-center justify-between">
        <div className="flex gap-2">
          {Object.entries(post.reactions).map(([type, count]) => (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              disabled={isLoading || !user}
              className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                user
                  ? 'hover:bg-primary/10 text-gray-400 hover:text-primary'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-lg">{type}</span>
              <span className="text-sm">{count}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span>💬</span>
            {post.replyCount} replies
          </div>
          {user && (
            <>
              <button className="hover:text-primary transition-colors">
                Share
              </button>
              {(user.id === post.author.id || user.user_metadata?.roles?.includes('admin')) && (
                <button className="hover:text-primary transition-colors">
                  Edit
                </button>
              )}
              <button className="hover:text-primary transition-colors">
                Report
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
}; 