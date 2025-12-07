import React from 'react';
import { User, Lock, Shield, Bell, Moon, Sun, Download, HelpCircle, LogOut } from 'lucide-react';

interface SettingsPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, toggleTheme, onLogout }) => {
  return (
    <div className="flex flex-col w-full pb-20 bg-white dark:bg-black min-h-full">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Account Center Mockup */}
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl mb-4">
           <h3 className="font-bold mb-1">Meta Accounts Center</h3>
           <p className="text-xs text-gray-500 mb-3">Manage your connected experiences and account settings across Meta technologies.</p>
           <div className="flex items-center space-x-2 text-blue-500 text-sm font-semibold cursor-pointer">
              <User size={16} />
              <span>Personal Details</span>
           </div>
        </div>

        {/* Settings List */}
        <Section title="How you use Instagram">
           <Item icon={<Bell size={24} />} label="Notifications" />
           <Item icon={<User size={24} />} label="Saved" />
           <Item icon={<User size={24} />} label="Archive" />
        </Section>

        <Section title="Who can see your content">
           <Item icon={<Lock size={24} />} label="Account Privacy" value="Public" />
           <Item icon={<User size={24} />} label="Close Friends" value="0" />
           <Item icon={<Shield size={24} />} label="Blocked" value="2" />
        </Section>

        <Section title="Your app and media">
           <div onClick={toggleTheme} className="cursor-pointer">
             <Item icon={isDarkMode ? <Sun size={24} /> : <Moon size={24} />} label="Dark mode" value={isDarkMode ? 'On' : 'Off'} />
           </div>
           <Item icon={<User size={24} />} label="Language" value="English" />
        </Section>

        <Section title="More info and support">
           <Item icon={<HelpCircle size={24} />} label="Help" />
           <Item icon={<User size={24} />} label="Account Status" />
           <Item icon={<Download size={24} />} label="Download your information" />
        </Section>

        <div className="pt-4">
           <button onClick={onLogout} className="w-full text-left p-3 text-red-500 font-semibold flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
             <LogOut size={24} />
             <span>Log out</span>
           </button>
           <button className="w-full text-left p-3 text-red-500 font-semibold flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
             <span className="ml-9">Add account</span>
           </button>
        </div>

      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="mb-2">
    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2">{title}</h4>
    <div className="flex flex-col">
       {children}
    </div>
  </div>
);

const Item = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg cursor-pointer transition-colors">
     <div className="flex items-center space-x-3">
        <div className="text-black dark:text-white">{icon}</div>
        <span className="text-base">{label}</span>
     </div>
     {value && <span className="text-sm text-gray-500">{value}</span>}
  </div>
);

export default SettingsPage;