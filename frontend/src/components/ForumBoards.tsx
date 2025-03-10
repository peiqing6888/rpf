'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Board {
  id: string;
  name: string;
  description: string;
  icon: string;
  postsCount: number;
  activeUsers: number;
}

interface ForumBoardsProps {
  boards: Board[];
}

export const ForumBoards: React.FC<ForumBoardsProps> = ({ boards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/forum/board/${board.id}`}
          className="block bg-primary/10 hover:bg-primary/20 border-2 border-primary rounded-lg p-6 transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={board.icon}
                alt={board.name}
                fill
                className="object-contain pixelated"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-pixel text-primary mb-2">
                {board.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {board.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <span className="mr-1">📝</span>
                  {board.postsCount} posts
                </div>
                <div className="flex items-center">
                  <span className="mr-1">👥</span>
                  {board.activeUsers} active
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}; 