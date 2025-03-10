'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Reply } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { postsApi } from '@/lib/api';

interface ReplyListProps {
  replies: Reply[];
  onReactionUpdate?: () => void;
}

interface ReplyItemProps {
  reply: Reply;
  children?: React.ReactNode;
  onReactionUpdate?: () => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply, children, onReactionUpdate }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReaction = async (type: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      await postsApi.toggleReaction(reply.id, type);
      onReactionUpdate?.();
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async () => {
    if (!user || !replyContent.trim()) return;

    try {
      setIsLoading(true);
      await postsApi.createReply(reply.postId, {
        content: replyContent,
        parentId: reply.id,
      });
      setReplyContent('');
      setIsReplying(false);
      onReactionUpdate?.();
    } catch (error) {
      console.error('Failed to create reply:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary/5 border-2 border-primary rounded-lg p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12">
            <Image
              src={reply.author.avatar}
              alt={reply.author.username}
              fill
              className="rounded-lg object-cover pixelated"
            />
          </div>
          <div className="mt-1">
            <div className="bg-primary px-2 py-0.5 rounded text-[10px] text-white text-center">
              {reply.author.nameplate}
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/profile/${reply.author.id}`}
              className="font-pixel text-primary hover:text-primary/80 transition-colors"
            >
              {reply.author.username}
            </Link>
            <span className="text-gray-400">•</span>
            <time className="text-sm text-gray-400" dateTime={reply.createdAt}>
              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
            </time>
          </div>

          <div className="font-mono text-gray-200 whitespace-pre-wrap mb-4">
            {reply.content}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {Object.entries(reply.reactions).map(([type, count]) => (
                <button
                  key={type}
                  onClick={() => handleReaction(type)}
                  disabled={isLoading || !user}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-sm transition-colors ${
                    user
                      ? 'hover:bg-primary/10 text-gray-400 hover:text-primary'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span>{type}</span>
                  <span>{count}</span>
                </button>
              ))}
            </div>

            {user && (
              <button
                className="text-sm text-gray-400 hover:text-primary transition-colors"
                onClick={() => setIsReplying(!isReplying)}
                disabled={isLoading}
              >
                {isReplying ? 'Cancel' : 'Reply'}
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-4">
              <div className="ddos-input">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[80px] p-4"
                  placeholder="Write your reply..."
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="arcade-button text-xs px-4 py-2"
                  onClick={handleReply}
                  disabled={isLoading || !replyContent.trim()}
                >
                  {isLoading ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {children && (
        <div className="mt-4 ml-16 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const ReplyList: React.FC<ReplyListProps> = ({ replies, onReactionUpdate }) => {
  // 組織回覆樹
  const replyMap = new Map<string, Reply[]>();
  const topLevelReplies: Reply[] = [];

  replies.forEach(reply => {
    if (reply.parentId) {
      const children = replyMap.get(reply.parentId) || [];
      children.push(reply);
      replyMap.set(reply.parentId, children);
    } else {
      topLevelReplies.push(reply);
    }
  });

  // 遞歸渲染回覆樹
  const renderReplyTree = (reply: Reply) => {
    const children = replyMap.get(reply.id);
    return (
      <ReplyItem key={reply.id} reply={reply} onReactionUpdate={onReactionUpdate}>
        {children?.map(child => renderReplyTree(child))}
      </ReplyItem>
    );
  };

  return (
    <div className="space-y-4">
      {topLevelReplies.map(reply => renderReplyTree(reply))}
    </div>
  );
}; 