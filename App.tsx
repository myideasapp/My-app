
import React, { useState, useEffect } from 'react';
import { NavTab, User, Post } from './types';
import { MOCK_POSTS, MOCK_STORIES, MOCK_USERS, CURRENT_USER } from './constants';
import { Home, LogOut } from 'lucide-react';

// Icons
import { 
  Home as HomeIcon, 
  Search, 
  PlusSquare, 
  Clapperboard, 
  Heart, 
  Menu,
  User as UserIcon,
  Compass,
  Film,
  Settings,
  ShieldCheck,
  Zap, // Brand Icon
  MessageCircle
} from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ReelsPage from './pages/ReelsPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import MessagesPage from './pages/MessagesPage';
import CreateModal from './components/CreateModal';
import EditProfileModal from './components/EditProfileModal';
import StoryViewer from './components/StoryViewer';

const App = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.HOME);
  
  // Modals & Overlays
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // App-wide state simulation with Persistence
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [allUsers, setAllUsers] = useState<User[]>([...MOCK_USERS, CURRENT_USER]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('vibesnap_user');
    const savedPosts = localStorage.getItem('vibesnap_posts');
    const savedUsers = localStorage.getItem('vibesnap_users_db');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedUsers) setAllUsers(JSON.parse(savedUsers));

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    if (user) localStorage.setItem('vibesnap_user', JSON.stringify(user));
    else localStorage.removeItem('vibesnap_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vibesnap_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('vibesnap_users_db', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auth Guard
  if (!user) {
    return <AuthPage onLogin={setUser} />;
  }

  /* --- CENTRALIZED LOGIC FOR DATA CONSISTENCY --- */

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const isNowLiked = !post.isLiked;
        return {
          ...post,
          isLiked: isNowLiked,
          likes: isNowLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleSavePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  const handleNavClick = (tab: NavTab) => {
    if (tab === NavTab.CREATE) {
      setIsCreateOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab(NavTab.HOME);
    setIsMenuOpen(false);
    localStorage.removeItem('vibesnap_user');
  };

  const addNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsCreateOpen(false);
    setActiveTab(NavTab.HOME);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  // Admin Actions
  const handleBanUser = (userId: string) => {
    setAllUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isBanned: !u.isBanned } : u
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  // Responsive Layout
  return (
    <div className="flex h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-[245px] border-r border-gray-200 dark:border-gray-800 p-4 h-full sticky top-0 z-50">
        <div className="mb-8 px-4 pt-4 flex items-center space-x-2">
          <div className="bg-brand-primary text-white p-1 rounded-lg xl:hidden">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold hidden xl:block font-logo text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            VibeSnap
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<HomeIcon size={24} />} label="Home" active={activeTab === NavTab.HOME} onClick={() => handleNavClick(NavTab.HOME)} />
          <NavItem icon={<Search size={24} />} label="Search" active={activeTab === NavTab.SEARCH} onClick={() => handleNavClick(NavTab.SEARCH)} />
          <NavItem icon={<Compass size={24} />} label="Explore" active={activeTab === NavTab.SEARCH} onClick={() => handleNavClick(NavTab.SEARCH)} />
          <NavItem icon={<Film size={24} />} label="Reels" active={activeTab === NavTab.REELS} onClick={() => handleNavClick(NavTab.REELS)} />
          <NavItem icon={<MessageCircle size={24} />} label="Messages" active={activeTab === NavTab.MESSAGES} onClick={() => handleNavClick(NavTab.MESSAGES)} />
          <NavItem icon={<Heart size={24} />} label="Notifications" active={activeTab === NavTab.NOTIFICATIONS} onClick={() => handleNavClick(NavTab.NOTIFICATIONS)} />
          <NavItem icon={<PlusSquare size={24} />} label="Create" active={false} onClick={() => handleNavClick(NavTab.CREATE)} />
          <NavItem 
            icon={<img src={user.avatar} className="w-6 h-6 rounded-full border border-gray-200 object-cover" alt="profile" />} 
            label="Profile" 
            active={activeTab === NavTab.PROFILE || activeTab === NavTab.SETTINGS} 
            onClick={() => handleNavClick(NavTab.PROFILE)} 
          />
          {user.isAdmin && (
            <NavItem 
              icon={<ShieldCheck size={24} className="text-brand-secondary" />} 
              label="Admin Panel" 
              active={activeTab === NavTab.ADMIN} 
              onClick={() => handleNavClick(NavTab.ADMIN)} 
            />
          )}
        </nav>

        <div className="mt-auto relative">
           {isMenuOpen && (
             <div className="absolute bottom-16 left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
               <button onClick={() => { setActiveTab(NavTab.SETTINGS); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                 <Settings size={18} /> Settings
               </button>
               <div className="border-t border-gray-200 dark:border-gray-800"></div>
               <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 font-semibold flex items-center gap-2">
                 <LogOut size={18} /> Log out
               </button>
             </div>
           )}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className="flex items-center space-x-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg w-full transition-colors"
           >
             <Menu size={24} />
             <span className="hidden xl:block font-normal">More</span>
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden no-scrollbar relative bg-white dark:bg-black">
        <div className={`mx-auto w-full h-full ${activeTab === NavTab.ADMIN ? 'max-w-none' : 'max-w-[630px]'}`}>
           {activeTab === NavTab.HOME && (
             <HomePage 
                posts={posts} 
                onStoryClick={setActiveStoryId} 
                onLikePost={handleLikePost}
                onSavePost={handleSavePost}
                onNavigate={handleNavClick}
             />
           )}
           {activeTab === NavTab.SEARCH && <ExplorePage />}
           {activeTab === NavTab.REELS && <ReelsPage />}
           {activeTab === NavTab.MESSAGES && <MessagesPage />}
           {activeTab === NavTab.PROFILE && (
             <ProfilePage 
               user={user} 
               posts={posts.filter(p => p.userId === user.id)} 
               onEditProfile={() => setIsEditProfileOpen(true)} 
               onOpenSettings={() => setActiveTab(NavTab.SETTINGS)}
             />
           )}
           {activeTab === NavTab.SETTINGS && (
             <SettingsPage 
               isDarkMode={isDarkMode} 
               toggleTheme={() => setIsDarkMode(!isDarkMode)} 
               onLogout={handleLogout} 
             />
           )}
           {activeTab === NavTab.NOTIFICATIONS && <NotificationsPage />}
           {activeTab === NavTab.ADMIN && user.isAdmin && (
             <AdminPage 
               users={allUsers} 
               posts={posts} 
               onBanUser={handleBanUser} 
               onDeletePost={handleDeletePost} 
             />
           )}
        </div>
      </main>

      {/* BOTTOM NAV (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around items-center h-[55px] z-50 pb-safe">
          <MobileNavItem icon={<HomeIcon size={26} />} active={activeTab === NavTab.HOME} onClick={() => handleNavClick(NavTab.HOME)} />
          <MobileNavItem icon={<Compass size={26} />} active={activeTab === NavTab.SEARCH} onClick={() => handleNavClick(NavTab.SEARCH)} />
          <MobileNavItem icon={<Film size={26} />} active={activeTab === NavTab.REELS} onClick={() => handleNavClick(NavTab.REELS)} />
          <MobileNavItem icon={<Heart size={26} />} active={activeTab === NavTab.NOTIFICATIONS} onClick={() => handleNavClick(NavTab.NOTIFICATIONS)} />
          <div onClick={() => handleNavClick(NavTab.PROFILE)} className="cursor-pointer">
             <img 
               src={user.avatar} 
               className={`w-7 h-7 rounded-full border-2 object-cover ${activeTab === NavTab.PROFILE ? 'border-black dark:border-white' : 'border-transparent'}`} 
               alt="profile" 
             />
          </div>
      </nav>

      {/* MODALS */}
      {isCreateOpen && <CreateModal onClose={() => setIsCreateOpen(false)} onPost={addNewPost} />}
      
      {isEditProfileOpen && (
        <EditProfileModal 
          user={user} 
          onClose={() => setIsEditProfileOpen(false)} 
          onSave={handleUpdateProfile} 
        />
      )}

      {activeStoryId && (
        <StoryViewer 
          stories={MOCK_STORIES} 
          initialStoryId={activeStoryId} 
          onClose={() => setActiveStoryId(null)} 
        />
      )}

    </div>
  );
};

// Sub-components for Layout
const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-4 p-3 rounded-lg w-full transition-colors group ${active ? 'font-bold bg-gray-50 dark:bg-gray-900/50' : 'font-normal hover:bg-gray-100 dark:hover:bg-gray-900'}`}
  >
    <div className={`transition-transform duration-200 ${active ? 'scale-105 text-brand-primary' : 'group-hover:scale-105'}`}>
      {icon}
    </div>
    <span className={`hidden xl:block text-base ${active ? 'text-brand-primary' : ''}`}>{label}</span>
  </button>
);

const MobileNavItem = ({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`p-2 transition-all duration-200 ${active ? 'scale-110 text-brand-primary' : 'text-gray-500 dark:text-gray-400'}`}>
    {icon}
  </button>
);

export default App;
