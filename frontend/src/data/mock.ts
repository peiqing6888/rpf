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

// 模擬數據
export const MOCK_BOARDS: Board[] = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'A place for general discussions about anything and everything.',
    icon: '/icons/general.png',
    postsCount: 150,
    activeUsers: 42,
  },
  {
    id: '2',
    name: 'Support & Resources',
    description: 'Find support and share helpful resources with the community.',
    icon: '/icons/support.png',
    postsCount: 89,
    activeUsers: 23,
  },
  {
    id: '3',
    name: 'Creative Corner',
    description: 'Share your art, music, writing, and other creative works.',
    icon: '/icons/creative.png',
    postsCount: 67,
    activeUsers: 15,
  },
  {
    id: '4',
    name: 'Events & Meetups',
    description: 'Organize and discover local and online community events.',
    icon: '/icons/events.png',
    postsCount: 34,
    activeUsers: 8,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to our Pixel Forum!',
    content: 'Hello everyone! This is our first post in the Pixel Forum. Feel free to introduce yourself and share your thoughts.',
    author: {
      id: '1',
      username: 'PixelMod',
      avatar: '/avatars/mod.png',
      nameplate: 'Moderator',
    },
    createdAt: '2024-03-10T08:00:00Z',
    repliesCount: 5,
    reactions: {
      '❤️': { type: '❤️', count: 10, reacted: false },
      '🌈': { type: '🌈', count: 8, reacted: true },
      '✨': { type: '✨', count: 6, reacted: false },
    },
    isPinned: true,
    boardId: '1',
  },
  {
    id: '2',
    title: 'Looking for pixel art resources',
    content: 'Hi everyone! I\'m new to pixel art and looking for some good tutorials and resources. Any recommendations?',
    author: {
      id: '2',
      username: 'ArtSeeker',
      avatar: '/avatars/user1.png',
      nameplate: 'New Member',
    },
    createdAt: '2024-03-10T09:30:00Z',
    repliesCount: 3,
    reactions: {
      '❤️': { type: '❤️', count: 4, reacted: false },
      '✨': { type: '✨', count: 2, reacted: false },
    },
    isPinned: false,
    boardId: '3',
  },
];

export const MOCK_REPLIES: Reply[] = [
  {
    id: '1',
    content: 'Welcome everyone! Looking forward to building this community together.',
    author: {
      id: '3',
      username: 'PixelArtist',
      avatar: '/avatars/user2.png',
      nameplate: 'Artist',
    },
    createdAt: '2024-03-10T08:15:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 5, reacted: false },
      '✨': { type: '✨', count: 3, reacted: true },
    },
    postId: '1',
  },
  {
    id: '2',
    content: 'I recommend checking out Aseprite for pixel art creation. It\'s an amazing tool!',
    author: {
      id: '4',
      username: 'ToolMaster',
      avatar: '/avatars/user3.png',
      nameplate: 'Pro Member',
    },
    createdAt: '2024-03-10T09:45:00Z',
    reactions: {
      '❤️': { type: '❤️', count: 3, reacted: false },
    },
    postId: '2',
  },
]; 