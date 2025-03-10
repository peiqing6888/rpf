export interface Board {
  id: string;
  name: string;
  description: string;
  icon: string;
  postsCount: number;
  activeUsers: number;
}

export interface Author {
  id: string;
  username: string;
  avatar: string;
  nameplate: string;
}

export interface Reaction {
  type: string;
  count: number;
  reacted: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  repliesCount: number;
  reactions: { [key: string]: Reaction };
  isPinned: boolean;
  boardId: string;
}

export interface Reply {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  reactions: { [key: string]: Reaction };
  postId: string;
  parentId?: string;
}

export const MOCK_BOARDS: Board[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'A place for general discussions and community updates.',
    icon: '/icons/default.svg',
    postsCount: 42,
    activeUsers: 15,
  },
  {
    id: 'introductions',
    name: 'Introductions',
    description: 'New to the community? Introduce yourself here!',
    icon: '/icons/default.svg',
    postsCount: 128,
    activeUsers: 23,
  },
  {
    id: 'support',
    name: 'Support & Resources',
    description: 'Find and share helpful resources and support.',
    icon: '/icons/default.svg',
    postsCount: 89,
    activeUsers: 31,
  },
  {
    id: 'creative',
    name: 'Creative Corner',
    description: 'Share your art, writing, music, and other creative works.',
    icon: '/icons/default.svg',
    postsCount: 156,
    activeUsers: 42,
  },
  {
    id: 'events',
    name: 'Events & Meetups',
    description: 'Organize and discover community events.',
    icon: '/icons/default.svg',
    postsCount: 67,
    activeUsers: 19,
  },
  {
    id: 'gaming',
    name: 'Gaming Zone',
    description: 'Discuss games, find gaming buddies, and share experiences.',
    icon: '/icons/default.svg',
    postsCount: 234,
    activeUsers: 56,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to our community!',
    content: 'Hello everyone! This is our first post in the forum. We\'re excited to build this community together. Please take a moment to read our guidelines and introduce yourself!\n\nSome key points:\n- Be kind and respectful\n- Share your experiences\n- Help others when you can\n- Have fun!',
    author: {
      id: 'user1',
      username: 'Admin',
      avatar: '/icons/default.svg',
      nameplate: 'Administrator',
    },
    createdAt: '2024-03-20T12:00:00Z',
    repliesCount: 2,
    reactions: {
      '❤️': { type: '❤️', count: 42, reacted: false },
      '🌈': { type: '🌈', count: 28, reacted: false },
      '✨': { type: '✨', count: 15, reacted: false },
    },
    isPinned: true,
    boardId: 'general',
  },
  {
    id: '2',
    title: 'Community Guidelines',
    content: 'Please read our community guidelines carefully. We want to ensure this space remains safe and welcoming for everyone.\n\nGuidelines:\n1. No hate speech or discrimination\n2. Respect privacy\n3. Keep discussions constructive\n4. Use content warnings when needed\n5. Report any issues to moderators',
    author: {
      id: 'user1',
      username: 'Admin',
      avatar: '/icons/default.svg',
      nameplate: 'Administrator',
    },
    createdAt: '2024-03-20T12:30:00Z',
    repliesCount: 1,
    reactions: {
      '❤️': { type: '❤️', count: 31, reacted: false },
      '👍': { type: '👍', count: 24, reacted: false },
    },
    isPinned: true,
    boardId: 'general',
  },
  {
    id: '3',
    title: 'My pixel art journey',
    content: 'I wanted to share my experience learning pixel art. It\'s been an amazing journey so far!\n\nI started with simple 16x16 icons and now I\'m working on full character sprites. Here are some tips I\'ve learned:\n\n- Start small\n- Use a limited palette\n- Study other pixel artists\n- Practice daily\n- Don\'t be afraid to experiment',
    author: {
      id: 'user2',
      username: 'PixelArtist',
      avatar: '/icons/default.svg',
      nameplate: 'Artist',
    },
    createdAt: '2024-03-21T15:45:00Z',
    repliesCount: 3,
    reactions: {
      '❤️': { type: '❤️', count: 67, reacted: false },
      '🎨': { type: '🎨', count: 45, reacted: false },
      '✨': { type: '✨', count: 38, reacted: false },
    },
    isPinned: false,
    boardId: 'creative',
  },
];

export const MOCK_REPLIES: Reply[] = [
  {
    id: 'reply1',
    content: 'Welcome everyone! Looking forward to meeting you all!',
    author: {
      id: 'user3',
      username: 'Pixel_Enthusiast',
      avatar: '/icons/default.svg',
      nameplate: 'Member',
    },
    createdAt: '2024-03-20T12:15:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 12, reacted: false },
    },
    postId: '1',
  },
  {
    id: 'reply2',
    content: 'Great to be here! Thanks for creating this space.',
    author: {
      id: 'user4',
      username: 'RetroGamer',
      avatar: '/icons/default.svg',
      nameplate: 'Gamer',
    },
    createdAt: '2024-03-20T12:45:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 8, reacted: false },
      '🎮': { type: '🎮', count: 5, reacted: false },
    },
    postId: '1',
  },
  {
    id: 'reply3',
    content: 'Thank you for the clear guidelines! This will help keep the community healthy.',
    author: {
      id: 'user5',
      username: 'Community_Helper',
      avatar: '/icons/default.svg',
      nameplate: 'Helper',
    },
    createdAt: '2024-03-20T13:00:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 15, reacted: false },
      '👍': { type: '👍', count: 10, reacted: false },
    },
    postId: '2',
  },
  {
    id: 'reply4',
    content: 'Your pixel art is amazing! Thanks for sharing these tips.',
    author: {
      id: 'user6',
      username: 'ArtLover',
      avatar: '/icons/default.svg',
      nameplate: 'Art Fan',
    },
    createdAt: '2024-03-21T16:00:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 20, reacted: false },
      '🎨': { type: '🎨', count: 15, reacted: false },
    },
    postId: '3',
  },
  {
    id: 'reply5',
    content: 'Could you share some of your favorite resources for learning pixel art?',
    author: {
      id: 'user7',
      username: 'Beginner_Artist',
      avatar: '/icons/default.svg',
      nameplate: 'Newbie',
    },
    createdAt: '2024-03-21T16:30:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 8, reacted: false },
    },
    postId: '3',
  },
  {
    id: 'reply6',
    content: 'Here are some great resources:\n- Lospec.com for palettes\n- Pixeljoint.com for inspiration\n- Aseprite for software\n- Pinterest for references',
    author: {
      id: 'user2',
      username: 'PixelArtist',
      avatar: '/icons/default.svg',
      nameplate: 'Artist',
    },
    createdAt: '2024-03-21T17:00:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 25, reacted: false },
      '🙏': { type: '🙏', count: 18, reacted: false },
    },
    postId: '3',
    parentId: 'reply5',
  },
]; 