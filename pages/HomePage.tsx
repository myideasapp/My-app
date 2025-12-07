
import React from 'react';
import { Post as PostType, NavTab } from '../types';
import { MOCK_STORIES, MOCK_USERS } from '../constants';
import Post from '../components/Post';
import { Zap, MessageCircle } from 'lucide-react';

interface HomePageProps {
  posts: PostType[];
  onStoryClick: (storyId: string) => void;
  onLikePost: (postId: string) => void;
  onSavePost: (postId: string) => void;
  onNavigate: (tab: NavTab) => void;
}

const HomePage: React.FC<HomePageProps> = ({ posts, onStoryClick, onLikePost, onSavePost, onNavigate }) => {
  return (
    <div className="flex flex-col w-full pb-20 md:pb-0">
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <div className="flex items-center space-x-1">
           <Zap size={20} className="text-brand-primary" fill="currentColor" />
           <h1 className="text-xl font-bold font-logo text-brand-primary">VibeSnap</h1>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => onNavigate(NavTab.MESSAGES)} className="relative">
              <MessageCircle size={24} className="text-black dark:text-white" />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></div>
           </button>
        </div>
      </div>

      {/* Stories Rail */}
      <div className="flex space-x-4 p-4 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 mb-2">
        {/* Current User Story Add */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer">
           <div className="relative">
             <img src="https://picsum.photos/seed/me/60/60" className="w-16 h-16 rounded-full border-2 border-gray-200 p-[2px]" alt="Add Story" />
             <div className="absolute bottom-0 right-0 bg-brand-primary rounded-full w-5 h-5 flex items-center justify-center border-2 border-white text-white text-xs font-bold">+</div>
           </div>
           <span className="text-xs text-gray-500 truncate w-16 text-center">Your story</span>
        </div>

        {MOCK_STORIES.map((story) => {
          const user = MOCK_USERS.find(u => u.id === story.userId);
          if (!user) return null;
          return (
            <div 
              key={story.id} 
              className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer transform transition hover:scale-105"
              onClick={() => onStoryClick(story.id)}
            >
               <div className="story-ring p-[2px] rounded-full">
                 <img src={user.avatar} className="w-[60px] h-[60px] rounded-full border-2 border-white dark:border-black object-cover" alt={user.username} />
               </div>
               <span className="text-xs truncate w-16 text-center">{user.username}</span>
            </div>
          )
        })}
      </div>

      {/* Feed */}
      <div className="flex flex-col space-y-4 md:space-y-8">
        {posts.map(post => (
           <Post 
             key={post.id} 
             post={post} 
             onLike={() => onLikePost(post.id)}
             onSave={() => onSavePost(post.id)}
           />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
