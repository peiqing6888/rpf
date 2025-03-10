'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface Author {
  id: string;
  username: string;
  avatar: string;
  nameplate: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  repliesCount: number;
  likesCount: number;
  isPinned: boolean;
}

interface ForumPostsProps {
  posts: Post[];
}

export const ForumPosts: React.FC<ForumPostsProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {/* 置頂帖子 */}
      {posts.filter(post => post.isPinned).map((post) => (
        <Link
          key={post.id}
          href={`/forum/post/${post.id}`}
          className="block bg-primary/5 hover:bg-primary/10 border-2 border-primary rounded-lg p-6 transition-colors relative"
        >
          <div className="absolute -top-3 -right-3 bg-primary text-white text-xs px-2 py-1 rounded">
            📌 Pinned
          </div>
          <div className="flex items-start space-x-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.username}
                fill
                className="rounded-full object-cover pixelated"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-pixel text-primary mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="mr-1">💬</span>
                    {post.repliesCount} replies
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">❤️</span>
                    {post.likesCount} likes
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-pixel text-primary">
                    {post.author.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* 普通帖子 */}
      {posts.filter(post => !post.isPinned).map((post) => (
        <Link
          key={post.id}
          href={`/forum/post/${post.id}`}
          className="block bg-primary/5 hover:bg-primary/10 border-2 border-primary rounded-lg p-6 transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.username}
                fill
                className="rounded-full object-cover pixelated"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-pixel text-primary mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="mr-1">💬</span>
                    {post.repliesCount} replies
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">❤️</span>
                    {post.likesCount} likes
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-pixel text-primary">
                    {post.author.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}; 