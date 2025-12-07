import React, { useState } from 'react';
import { User, Report, Post } from '../types';
import { MOCK_USERS, MOCK_POSTS, MOCK_REPORTS } from '../constants';
import { Shield, Users, FileText, AlertTriangle, Check, X, Search, Trash2, Lock } from 'lucide-react';

interface AdminPageProps {
  // In a real app, these would come from context/api
  users: User[]; 
  posts: Post[];
  onBanUser: (userId: string) => void;
  onDeletePost: (postId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ users, posts, onBanUser, onDeletePost }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'reports'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Stats
  const totalUsers = users.length;
  const totalPosts = posts.length;
  const activeReports = MOCK_REPORTS.filter(r => r.status === 'pending').length;

  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 dark:bg-black pb-20 overflow-y-auto">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
           <Shield className="text-blue-600" size={28} />
           <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="text-sm text-gray-500">Super Admin</div>
      </div>

      <div className="flex-1 p-4 max-w-6xl mx-auto w-full">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
           <TabButton label="Dashboard" icon={<FileText size={18} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
           <TabButton label="User Management" icon={<Users size={18} />} active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
           <TabButton label="Reports" icon={<AlertTriangle size={18} />} active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
        </div>

        {/* CONTENT */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatCard title="Total Users" value={totalUsers} icon={<Users size={32} className="text-blue-500" />} />
             <StatCard title="Total Posts" value={totalPosts} icon={<FileText size={32} className="text-green-500" />} />
             <StatCard title="Pending Reports" value={activeReports} icon={<AlertTriangle size={32} className="text-red-500" />} />
             
             <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded">
                     <span>New user registration: @fresh_start</span>
                     <span className="text-gray-500">2 mins ago</span>
                  </div>
                   <div className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded">
                     <span>Report #rep1 updated to pending</span>
                     <span className="text-gray-500">1 hour ago</span>
                  </div>
                   <div className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded">
                     <span>System maintenance scheduled</span>
                     <span className="text-gray-500">1 day ago</span>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
             <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-900/50">
                <Search className="text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="bg-transparent outline-none w-full" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <table className="w-full text-left border-collapse">
               <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-500">
                 <tr>
                   <th className="p-4">User</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Posts</th>
                   <th className="p-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredUsers.map(user => (
                   <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                     <td className="p-4 flex items-center space-x-3">
                        <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-sm">{user.username}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                     </td>
                     <td className="p-4">
                        {user.isBanned ? (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">Banned</span>
                        ) : (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Active</span>
                        )}
                     </td>
                     <td className="p-4 text-sm">{user.posts}</td>
                     <td className="p-4 text-right">
                        <button 
                          onClick={() => onBanUser(user.id)}
                          className={`px-3 py-1 rounded text-xs font-bold text-white transition-colors ${user.isBanned ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}`}
                        >
                          {user.isBanned ? 'Unban' : 'Ban'}
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
             {MOCK_REPORTS.map(report => {
                const targetPost = posts.find(p => p.id === report.targetId);
                const reporter = users.find(u => u.id === report.reportedBy);
                
                return (
                  <div key={report.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-4">
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                             {report.status}
                           </span>
                           <span className="text-xs text-gray-500">{report.timestamp}</span>
                        </div>
                        <h4 className="font-bold text-base mb-1">Reason: {report.reason}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reported by: <span className="font-semibold">{reporter?.username || 'Unknown'}</span></p>
                        
                        {targetPost && (
                          <div className="flex items-start bg-gray-50 dark:bg-gray-800 p-2 rounded mt-2">
                             <img src={targetPost.imageUrl} className="w-16 h-16 object-cover rounded mr-3" />
                             <div>
                               <div className="text-xs text-gray-500 mb-1">Post ID: {targetPost.id}</div>
                               <p className="text-sm line-clamp-2">{targetPost.caption}</p>
                             </div>
                          </div>
                        )}
                     </div>
                     <div className="flex flex-row md:flex-col justify-center space-x-2 md:space-x-0 md:space-y-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-4">
                        <button className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-bold w-full">
                           <Check size={16} /> <span>Dismiss</span>
                        </button>
                        <button 
                          onClick={() => onDeletePost(report.targetId)}
                          className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold w-full"
                        >
                           <Trash2 size={16} /> <span>Delete</span>
                        </button>
                     </div>
                  </div>
                )
             })}
          </div>
        )}

      </div>
    </div>
  );
};

const TabButton = ({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-2 pb-2 border-b-2 px-1 transition-colors ${active ? 'border-blue-500 text-blue-500 font-bold' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 flex items-center space-x-4">
     <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
       {icon}
     </div>
     <div>
       <div className="text-gray-500 text-sm">{title}</div>
       <div className="text-2xl font-bold">{value}</div>
     </div>
  </div>
);

export default AdminPage;