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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/board/${board.id}`}
          className="block group"
        >
          <div className="relative bg-secondary p-6 rounded-lg border-4 border-primary transform transition-all duration-200 hover:scale-105 hover:shadow-glow">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white overflow-hidden">
              <Image
                src={board.icon}
                alt={board.name}
                width={32}
                height={32}
                className="pixelated"
              />
            </div>
            
            <div className="ml-8 mt-2">
              <h3 className="text-xl font-pixel text-primary mb-2">
                {board.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {board.description}
              </p>
              
              <div className="flex justify-between text-xs text-gray-400">
                <span>
                  {board.postsCount} posts
                </span>
                <span>
                  {board.activeUsers} active users
                </span>
              </div>
            </div>
            
            <div className="absolute -bottom-3 right-6 transform rotate-3">
              <button className="arcade-button text-xs px-4 py-2">
                Enter Board
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}; 