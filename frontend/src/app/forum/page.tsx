import { CRTEffect } from '@/components/CRTEffect';
import { ForumBoards } from '@/components/ForumBoards';
import { MOCK_BOARDS } from '@/data/mock';

export default function ForumPage() {
  return (
    <CRTEffect>
      <main className="min-h-screen bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-pixel text-primary mb-4">
              Pixel Forum
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Welcome to our retro-styled safe space. Join the discussion, share your thoughts,
              and connect with others in our pixel-perfect community.
            </p>
          </header>

          <ForumBoards boards={MOCK_BOARDS} />
        </div>
      </main>
    </CRTEffect>
  );
} 