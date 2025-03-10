import React, { useState } from 'react';
import Image from 'next/image';

interface ForumPostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    nameplate: string;
  };
  content: string;
  timestamp: string;
  reactions: {
    [key: string]: number;
  };
  onReact: (postId: string, reaction: string) => void;
}

const REACTIONS = [
  { emoji: '❤️', pixel: '/emojis/heart.png' },
  { emoji: '🌈', pixel: '/emojis/rainbow.png' },
  { emoji: '✨', pixel: '/emojis/sparkles.png' },
  { emoji: '🎮', pixel: '/emojis/gamepad.png' },
];

export const ForumPost: React.FC<ForumPostProps> = ({
  id,
  author,
  content,
  timestamp,
  reactions,
  onReact,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    // TODO: Implement reply functionality
    console.log('Reply:', replyContent);
    setReplyContent('');
    setIsReplying(false);
  };

  return (
    <div className="bg-secondary p-4 rounded-lg mb-4 border-2 border-primary">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-lg pixelated"
          />
          <div className="mt-1 text-xs text-center bg-primary px-2 py-1 rounded">
            {author.nameplate}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-pixel text-primary">{author.name}</span>
            <span className="text-xs text-gray-400">{timestamp}</span>
          </div>
          <div className="font-mono text-white mb-4 whitespace-pre-wrap">
            {content}
          </div>
          <div className="flex gap-2">
            {REACTIONS.map(({ emoji, pixel }) => (
              <button
                key={emoji}
                className="group relative"
                onClick={() => onReact(id, emoji)}
              >
                <div className="pixel-reaction">
                  <Image
                    src={pixel}
                    alt={emoji}
                    width={16}
                    height={16}
                    className="pixelated"
                  />
                </div>
                <span className="ml-1 text-xs">
                  {reactions[emoji] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          className="text-primary text-sm hover:text-white transition-colors"
          onClick={() => setIsReplying(!isReplying)}
        >
          {isReplying ? 'Cancel Reply' : 'Reply'}
        </button>
        
        {isReplying && (
          <div className="mt-2">
            <div className="ddos-input">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary"
                rows={3}
                placeholder="Type your reply..."
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="arcade-button text-xs px-4 py-2"
                onClick={handleReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 