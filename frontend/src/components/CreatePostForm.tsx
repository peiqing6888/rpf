import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postsApi } from '@/lib/api';

interface CreatePostFormProps {
  boardId: string;
  onCancel?: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  boardId,
  onCancel,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const post = await postsApi.create({
        title: title.trim(),
        content: content.trim(),
        boardId,
      });
      router.push(`/forum/post/${post.id}`);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-pixel text-sm text-primary mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ddos-input pl-8"
          placeholder="Enter post title..."
          disabled={isSubmitting}
          maxLength={100}
          required
        />
      </div>

      <div>
        <label className="block font-pixel text-sm text-primary mb-2">
          Content
        </label>
        <div className="ddos-input">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent border-none outline-none resize-none font-mono text-primary min-h-[200px] p-4"
            placeholder="Write your post..."
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-primary transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="arcade-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}; 