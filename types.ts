
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isVerified: boolean;
  followers: number;
  following: number;
  posts: number;
  bio: string;
  password?: string; // For auth simulation
  email?: string;
  phone?: string;
  website?: string;
  gender?: string;
  isAdmin?: boolean;
  isBanned?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
  type: 'photo' | 'video' | 'album';
}

export interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  isViewed: boolean;
  timestamp: string;
}

export interface Reel {
  id: string;
  userId: string;
  videoUrl: string;
  likes: number;
  comments: number;
  caption: string;
  songName: string;
  artistName: string;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  audioUrl?: string;
  imageUrl?: string;
  timestamp: string; // ISO string
  isOwn: boolean;
  type: 'text' | 'image' | 'audio';
}

export interface ChatThread {
  id: string;
  userId: string; // The other user
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  userId: string; // Who triggered it
  postId?: string; // Related content
  text?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Report {
  id: string;
  targetId: string;
  targetType: 'post' | 'user';
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: string;
  reportedBy: string;
}

export enum NavTab {
  HOME = 'home',
  SEARCH = 'search',
  REELS = 'reels',
  NOTIFICATIONS = 'notifications',
  MESSAGES = 'messages',
  CREATE = 'create',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  ADMIN = 'admin'
}
