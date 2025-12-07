import React from 'react';
import { MOCK_NOTIFICATIONS, MOCK_USERS } from '../constants';
import { Notification } from '../types';

const NotificationsPage = () => {
  const today = MOCK_NOTIFICATIONS.slice(0, 2);
  const thisWeek = MOCK_NOTIFICATIONS.slice(2);

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-10">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="p-4">
        {/* Section: Today */}
        <h3 className="font-bold text-base mb-4">Today</h3>
        <div className="space-y-4 mb-6">
          {today.map(notif => <NotificationItem key={notif.id} notif={notif} />)}
        </div>

        {/* Section: This Week */}
        <h3 className="font-bold text-base mb-4">This Week</h3>
        <div className="space-y-4">
          {thisWeek.map(notif => <NotificationItem key={notif.id} notif={notif} />)}
        </div>
      </div>
    </div>
  );
};

interface NotificationItemProps {
  notif: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notif }) => {
  const user = MOCK_USERS.find(u => u.id === notif.userId);
  if (!user) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={user.avatar} className="w-11 h-11 rounded-full object-cover" />
        <div className="text-sm">
           <span className="font-bold mr-1">{user.username}</span>
           <span className="text-gray-800 dark:text-gray-200">
             {notif.type === 'like' && 'liked your post.'}
             {notif.type === 'follow' && 'started following you.'}
             {notif.type === 'comment' && `commented: ${notif.text}`}
             {notif.type === 'mention' && notif.text}
           </span>
           <span className="text-gray-400 text-xs ml-2">{notif.timestamp}</span>
        </div>
      </div>

      <div>
        {notif.type === 'follow' ? (
          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold">Follow</button>
        ) : (
          <img src={`https://picsum.photos/seed/${notif.postId}/50/50`} className="w-11 h-11 object-cover rounded" />
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;