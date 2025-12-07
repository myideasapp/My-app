
import React from 'react';
import { MOCK_REELS, MOCK_USERS } from '../constants';
import { Heart, MessageCircle, MoreHorizontal, Music, Send } from 'lucide-react';

const ReelsPage = () => {
  return (
    <div className="h-full w-full bg-black md:rounded-lg overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {MOCK_REELS.map(reel => {
        const user = MOCK_USERS.find(u => u.id === reel.userId);
        if (!user) return null;

        return (
          <div key={reel.id} className="relative h-full w-full snap-start shrink-0 flex items-center justify-center bg-gray-900">
            {/* Background "Video" */}
            <img src={reel.videoUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Reel" />
            
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-transparent via-transparent to-black/80">
              <div className="flex justify-between items-start pt-4">
                 <h2 className="text-xl font-bold text-white drop-shadow-md">Reels</h2>
                 <Music className="text-white animate-pulse" />
              </div>

              <div className="flex items-end justify-between mb-16 md:mb-4">
                {/* Info */}
                <div className="flex flex-col space-y-3 w-3/4">
                  <div className="flex items-center space-x-2">
                     <img src={user.avatar} className="w-8 h-8 rounded-full border border-white" alt={user.username} />
                     <span className="text-white font-semibold text-sm">{user.username}</span>
                     <button className="border border-white/40 text-white text-xs px-2 py-1 rounded">Follow</button>
                  </div>
                  <p className="text-white text-sm line-clamp-2">{reel.caption}</p>
                  <div className="flex items-center space-x-2 text-white/80 text-xs">
                    <Music size={12} />
                    <div className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">{reel.songName} • {reel.artistName}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center space-y-6">
                  <ActionIcon icon={<Heart size={28} />} label={shortNum(reel.likes)} />
                  <ActionIcon icon={<MessageCircle size={28} />} label={shortNum(reel.comments)} />
                  <ActionIcon icon={<Send size={28} className="-rotate-45" />} label="" />
                  <ActionIcon icon={<MoreHorizontal size={28} />} label="" />
                  <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

const ActionIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex flex-col items-center space-y-1">
    <button className="text-white hover:scale-110 transition-transform">{icon}</button>
    {label && <span className="text-white text-xs font-semibold">{label}</span>}
  </div>
);

const shortNum = (num: number) => {
  if (num > 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export default ReelsPage;
