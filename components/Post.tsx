
import React, { useState } from 'react';
import { Post as PostType } from '../types';
import { MOCK_USERS } from '../constants';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Send } from 'lucide-react';

interface PostProps {
  post: PostType;
  onLike: () => void;
  onSave: () => void;
}

const Post: React.FC<PostProps> = ({ post, onLike, onSave }) => {
  const user = MOCK_USERS.find(u => u.id === post.userId) || { username: 'unknown', avatar: '', isVerified: false };
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const handleDoubleTap = (e: React.MouseEvent) => {
    onLike();
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 1000);
  };

  return (
    <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="story-ring p-[2px] rounded-full w-9 h-9 flex items-center justify-center">
             <img src={user.avatar} className="w-full h-full rounded-full border border-white dark:border-black object-cover" alt={user.username} />
          </div>
          <div className="flex flex-col">
             <span className="font-semibold text-sm flex items-center">
               {user.username}
               {user.isVerified && <span className="ml-1 text-brand-primary text-[10px]"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></span>}
             </span>
             {post.location && <span className="text-xs text-gray-500">{post.location}</span>}
          </div>
        </div>
        <button className="text-gray-600 dark:text-gray-300">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden" onDoubleClick={handleDoubleTap}>
        <img src={post.imageUrl} className="w-full h-full object-cover" alt="Post" />
        
        {/* Heart Overlay Animation */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showHeartOverlay ? 'opacity-100' : 'opacity-0'}`}>
           <Heart size={100} className="text-white fill-white animate-bounce" />
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button onClick={onLike} className={`transition-transform active:scale-90 ${post.isLiked ? 'text-red-500' : 'text-black dark:text-white'}`}>
              <Heart size={26} fill={post.isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-black dark:text-white hover:text-gray-600">
              <MessageCircle size={26} className="-rotate-90" />
            </button>
            <button className="text-black dark:text-white hover:text-gray-600">
              <Send size={26} className="-rotate-45 mb-1" />
            </button>
          </div>
          <button onClick={onSave} className={`${post.isSaved ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}>
             <Bookmark size={26} fill={post.isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="font-semibold text-sm mb-1">{post.likes.toLocaleString()} likes</div>
        
        <div className="text-sm">
          <span className="font-semibold mr-2">{user.username}</span>
          <span className="">{post.caption}</span>
        </div>

        {post.comments.length > 0 && (
          <button className="text-gray-500 text-sm mt-1">View all {post.comments.length + 12} comments</button>
        )}
        
        <div className="text-[10px] text-gray-400 uppercase mt-1 tracking-wide">{post.timestamp}</div>
      </div>
    </div>
  );
};

export default Post;
