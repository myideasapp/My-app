import { User, Post, Story, Reel, ChatThread, Notification, Report } from './types';

// Mock Current User (Logged Out state handled in App)
export const CURRENT_USER: User = {
  id: 'me',
  username: 'vibesnap_admin',
  fullName: 'VibeSnap Admin',
  avatar: 'https://picsum.photos/seed/me/150/150',
  isVerified: true,
  followers: 1250,
  following: 450,
  posts: 12,
  bio: 'Welcome to VibeSnap! 🌟\nSharing moments that matter.',
  email: 'admin@vibesnap.com',
  website: 'https://vibesnap.com',
  gender: 'Prefer not to say',
  phone: '+1 555 0199 888',
  isAdmin: true
};

// Mock Users
export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'alex_wanderer', fullName: 'Alex Explore', avatar: 'https://picsum.photos/seed/u1/150/150', isVerified: false, followers: 8500, following: 200, posts: 340, bio: 'Chasing sunsets 🌄' },
  { id: 'u2', username: 'tech_insider', fullName: 'Tech Insider', avatar: 'https://picsum.photos/seed/u2/150/150', isVerified: true, followers: 50000, following: 50, posts: 1200, bio: 'Future is here 🚀' },
  { id: 'u3', username: 'culinary_arts', fullName: 'Chef Bella', avatar: 'https://picsum.photos/seed/u3/150/150', isVerified: false, followers: 12000, following: 400, posts: 560, bio: 'Taste the world 🍜' },
  { id: 'u4', username: 'fitness_pro', fullName: 'Marcus Fit', avatar: 'https://picsum.photos/seed/u4/150/150', isVerified: true, followers: 98000, following: 100, posts: 890, bio: 'No pain no gain 💪' },
];

// Mock Stories
export const MOCK_STORIES: Story[] = MOCK_USERS.map((user, idx) => ({
  id: `s${idx}`,
  userId: user.id,
  imageUrl: `https://picsum.photos/seed/story${idx}/400/800`,
  isViewed: false,
  timestamp: `${idx + 2}h`
}));

// Mock Posts
export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    imageUrl: 'https://picsum.photos/seed/p1/600/600',
    caption: 'Golden hour in Santorini 🌅 #travel #vibes',
    likes: 1240,
    comments: [
      { id: 'c1', userId: 'u2', username: 'tech_insider', text: 'Incredible colors!', timestamp: '2h', likes: 12 },
    ],
    timestamp: '2 hours ago',
    isLiked: false,
    isSaved: false,
    location: 'Santorini, Greece',
    type: 'photo'
  },
  {
    id: 'p2',
    userId: 'u2',
    imageUrl: 'https://picsum.photos/seed/p2/600/700',
    caption: 'Unboxing the future. This device changes everything. 📱',
    likes: 3500,
    comments: [],
    timestamp: '5 hours ago',
    isLiked: true,
    isSaved: true,
    location: 'San Francisco, CA',
    type: 'photo'
  },
  {
    id: 'p3',
    userId: 'u3',
    imageUrl: 'https://picsum.photos/seed/p3/600/600',
    caption: 'Freshly made basil pesto pasta. Recipe in bio! 🍝',
    likes: 890,
    comments: [],
    timestamp: '1 day ago',
    isLiked: false,
    isSaved: false,
    type: 'photo'
  }
];

// Mock Reels
export const MOCK_REELS: Reel[] = [
  {
    id: 'r1',
    userId: 'u4',
    videoUrl: 'https://picsum.photos/seed/r1/400/800',
    likes: 15400,
    comments: 340,
    caption: 'Morning HIIT session! 🔥',
    songName: 'Power Up',
    artistName: 'Fit Beats'
  },
  {
    id: 'r2',
    userId: 'u1',
    videoUrl: 'https://picsum.photos/seed/r2/400/800',
    likes: 8900,
    comments: 120,
    caption: 'POV: You are here 🌊',
    songName: 'Chill Waves',
    artistName: 'Lofi Records'
  },
    {
    id: 'r3',
    userId: 'u2',
    videoUrl: 'https://picsum.photos/seed/r3/400/800',
    likes: 22000,
    comments: 900,
    caption: 'Coding setup tour 💻',
    songName: 'Synthwave',
    artistName: 'Dev Music'
  }
];

// Mock Notifications
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', userId: 'u1', postId: 'p1', timestamp: '2m', isRead: false },
  { id: 'n2', type: 'follow', userId: 'u2', timestamp: '1h', isRead: false },
  { id: 'n3', type: 'comment', userId: 'u3', postId: 'p2', text: 'Great content!', timestamp: '3h', isRead: true },
  { id: 'n4', type: 'mention', userId: 'u4', postId: 'p3', text: 'mentioned you in a comment', timestamp: '5h', isRead: true },
];

// Mock Chat Threads
export const MOCK_CHATS: ChatThread[] = [
  {
    id: 'c1',
    userId: 'u1',
    lastMessage: 'See you next week!',
    unreadCount: 1,
    timestamp: 'Now',
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hey! Are you coming?', timestamp: new Date(Date.now() - 100000).toISOString(), isOwn: false, type: 'text' },
      { id: 'm2', senderId: 'me', text: 'Yes, absolutely.', timestamp: new Date(Date.now() - 50000).toISOString(), isOwn: true, type: 'text' },
      { id: 'm3', senderId: 'u1', text: 'See you next week!', timestamp: new Date().toISOString(), isOwn: false, type: 'text' },
    ]
  },
  {
    id: 'c2',
    userId: 'u2',
    lastMessage: 'Thanks for the feedback.',
    unreadCount: 0,
    timestamp: '2h',
    messages: [
      { id: 'm1', senderId: 'me', text: 'Loved the new review!', timestamp: new Date(Date.now() - 7200000).toISOString(), isOwn: true, type: 'text' },
      { id: 'm2', senderId: 'u2', text: 'Thanks for the feedback.', timestamp: new Date(Date.now() - 7100000).toISOString(), isOwn: false, type: 'text' },
    ]
  }
];

export const MOCK_REPORTS: Report[] = [
  { id: 'rep1', targetId: 'p1', targetType: 'post', reason: 'Inappropriate content', status: 'pending', timestamp: '2023-10-27', reportedBy: 'u2' },
  { id: 'rep2', targetId: 'u3', targetType: 'user', reason: 'Spam / Bot', status: 'resolved', timestamp: '2023-10-25', reportedBy: 'u4' },
  { id: 'rep3', targetId: 'p3', targetType: 'post', reason: 'Misinformation', status: 'pending', timestamp: '2023-10-28', reportedBy: 'u1' },
];