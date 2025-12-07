import React, { useState } from 'react';
import { User, Post, NavTab } from '../types';
import { Grid, Bookmark, User as UserIcon, Settings, Menu } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  posts: Post[];
  onEditProfile: () => void;
  onOpenSettings: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, posts, onEditProfile, onOpenSettings }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Header Mobile - Settings Icon */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <div className="flex items-center space-x-1 font-bold text-lg">
           <LockIcon />
           <span>{user.username}</span>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => { /* Create modal could go here */ }}><PlusIcon /></button>
           <button onClick={onOpenSettings}><Menu size={28} /></button>
        </div>
      </div>

      {/* Header Content */}
      <div className="flex p-4 md:p-8 space-x-4 md:space-x-10 items-start">
        <div className="flex-shrink-0">
           <div className="w-20 h-20 md:w-36 md:h-36 rounded-full border border-gray-200 dark:border-gray-700 p-1">
             <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="Profile" />
           </div>
        </div>
        
        <div className="flex flex-col flex-1 space-y-4">
           <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <h2 className="text-xl text-black dark:text-white font-light truncate max-w-[200px]">{user.username}</h2>
              <div className="flex space-x-2">
                <button onClick={onEditProfile} className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Edit profile</button>
                <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">View archive</button>
                <button onClick={onOpenSettings} className="hidden md:block p-1.5"><Settings size={24} /></button>
              </div>
           </div>

           <div className="hidden md:flex space-x-6 md:space-x-10 text-sm">
             <span><span className="font-bold">{user.posts}</span> posts</span>
             <span><span className="font-bold">{user.followers}</span> followers</span>
             <span><span className="font-bold">{user.following}</span> following</span>
           </div>

           <div className="text-sm">
             <div className="font-bold">{user.fullName}</div>
             <div className="whitespace-pre-line">{user.bio}</div>
             {user.website && <a href={user.website} target="_blank" className="text-blue-900 dark:text-blue-200 font-semibold block mt-1">{user.website.replace('https://', '')}</a>}
           </div>
        </div>
      </div>

      {/* Mobile Stats Row */}
      <div className="flex md:hidden justify-around py-2 border-t border-gray-100 dark:border-gray-800 text-sm">
         <div className="flex flex-col items-center">
            <span className="font-bold">{user.posts}</span>
            <span className="text-gray-500">posts</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="font-bold">{user.followers}</span>
            <span className="text-gray-500">followers</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="font-bold">{user.following}</span>
            <span className="text-gray-500">following</span>
         </div>
      </div>

      {/* Highlights */}
      <div className="flex space-x-4 p-4 overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-gray-800">
         {['Travel', 'Tech', 'Food', 'Life'].map((hl, i) => (
           <div key={i} className="flex flex-col items-center space-y-1 min-w-[70px]">
             <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center p-1">
               <img src={`https://picsum.photos/seed/hl${i}/100/100`} className="rounded-full w-full h-full object-cover opacity-80" />
             </div>
             <span className="text-xs font-semibold">{hl}</span>
           </div>
         ))}
         <div className="flex flex-col items-center space-y-1 min-w-[70px]">
             <div className="w-16 h-16 rounded-full bg-transparent border border-gray-300 dark:border-gray-700 flex items-center justify-center p-1">
               <div className="w-full h-full rounded-full border border-black dark:border-white flex items-center justify-center">
                 <span className="text-2xl font-light">+</span>
               </div>
             </div>
             <span className="text-xs font-semibold">New</span>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <TabButton icon={<Grid size={24} />} active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
        <TabButton icon={<Bookmark size={24} />} active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
        <TabButton icon={<UserIcon size={26} />} active={activeTab === 'tagged'} onClick={() => setActiveTab('tagged')} />
      </div>

      {/* Grid */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-0.5 md:gap-4 md:mt-4">
          {posts.map(post => (
            <div key={post.id} className="aspect-square relative group bg-gray-100 dark:bg-gray-900 cursor-pointer">
              <img src={post.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 text-white font-bold transition-opacity">
                 <span>❤️ {post.likes}</span>
                 <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))}
          {/* Fillers */}
          {Array.from({length: 3}).map((_, i) => (
             <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-900"></div>
          ))}
        </div>
      )}
      
      {activeTab !== 'posts' && (
        <div className="py-20 text-center text-gray-500">
          <div className="border-2 border-black dark:border-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === 'saved' ? <Bookmark size={32} className="text-black dark:text-white" /> : <UserIcon size={32} className="text-black dark:text-white" />}
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white">{activeTab === 'saved' ? 'Saved' : 'Photos of you'}</h3>
          <p className="max-w-xs mx-auto mt-2 text-sm">{activeTab === 'saved' ? 'Only you can see what you\'ve saved' : 'When people tag you in photos, they\'ll appear here.'}</p>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center py-3 border-b-2 ${active ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
  >
    {icon}
  </button>
);

const LockIcon = () => (
    <svg aria-label="Private" className="x1lliihq x1n2onr6" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Private</title><path d="M19 10.5V8.25C19 4.257 15.864 1 12 1S5 4.257 5 8.25v2.25c-1.373.197-2.5 1.393-2.5 2.895v6.24c0 1.637 1.343 3.01 3.01 3.01h12.98c1.667 0 3.01-1.373 3.01-3.01v-6.24c0-1.502-1.127-2.698-2.5-2.895ZM7 8.25C7 5.435 9.243 3 12 3s5 2.435 5 5.25v2.25H7V8.25ZM19 19.64c0 .542-.468.99-.99.99H5.99c-.522 0-.99-.448-.99-.99v-6.24c0-.542.468-.99.99-.99h12.02c.522 0 .99.448.99.99v6.24Z"></path></svg>
)

const PlusIcon = () => (
    <svg aria-label="New post" color="currentColor" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
)

export default ProfilePage;