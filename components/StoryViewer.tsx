
import React, { useState, useEffect } from 'react';
import { Story, User } from '../types';
import { MOCK_USERS } from '../constants';
import { X, Heart, MoreHorizontal, Send } from 'lucide-react';

interface StoryViewerProps {
  stories: Story[];
  initialStoryId: string;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialStoryId, onClose }) => {
  const initialIndex = stories.findIndex(s => s.id === initialStoryId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];
  const user = MOCK_USERS.find(u => u.id === currentStory.userId);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2; // 50ms * 50 = 2500ms approx duration
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Mobile-like Container */}
      <div className="relative w-full md:w-[400px] h-full md:h-[90vh] bg-gray-900 md:rounded-lg overflow-hidden flex flex-col">
        
        {/* Progress Bar */}
        <div className="absolute top-4 left-2 right-2 flex space-x-1 z-20">
           {stories.map((story, idx) => (
             <div key={story.id} className="h-[2px] bg-white/30 flex-1 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ 
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
                  }}
                ></div>
             </div>
           ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 z-20 flex justify-between items-center text-white">
           <div className="flex items-center space-x-2">
              <img src={user.avatar} className="w-8 h-8 rounded-full border border-white/50" alt={user.username} />
              <span className="font-semibold text-sm">{user.username}</span>
              <span className="text-white/60 text-xs">{currentStory.timestamp}</span>
           </div>
           <div className="flex items-center space-x-4">
              <MoreHorizontal size={24} />
              <button onClick={onClose}><X size={28} /></button>
           </div>
        </div>

        {/* Story Content */}
        <div className="flex-1 relative bg-gray-800">
           <img src={currentStory.imageUrl} className="w-full h-full object-cover" alt="Story" />
           
           {/* Tap Areas */}
           <div className="absolute inset-0 flex">
              <div className="w-1/3 h-full" onClick={handlePrev}></div>
              <div className="w-2/3 h-full" onClick={handleNext}></div>
           </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 flex items-center justify-between space-x-4 z-20 bg-gradient-to-t from-black/60 to-transparent pt-10">
           <div className="flex-1 relative">
             <input 
               type="text" 
               placeholder="Send message" 
               className="w-full bg-transparent border border-white/50 rounded-full py-2 px-4 text-white text-sm placeholder-white/70 focus:outline-none focus:border-white"
             />
           </div>
           <Heart className="text-white hover:text-red-500 cursor-pointer" size={28} />
           <Send className="text-white hover:text-brand-primary cursor-pointer -rotate-45 mb-1" size={26} />
        </div>

      </div>
    </div>
  );
};

export default StoryViewer;
