
import React, { useState, useEffect, useRef } from 'react';
import { ChatThread, Message } from '../types';
import { MOCK_USERS, MOCK_CHATS } from '../constants';
import { Edit, Info, Send, Image as ImageIcon, Mic, Smile, Play } from 'lucide-react';

const MessagesPage = () => {
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHATS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId);
  const activeUser = activeThread ? MOCK_USERS.find(u => u.id === activeThread.userId) : null;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeThread?.messages, activeThreadId]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSendMessage = (type: 'text' | 'image' | 'audio', content: string) => {
    if (!activeThreadId) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      text: type === 'text' ? content : undefined,
      imageUrl: type === 'image' ? content : undefined,
      audioUrl: type === 'audio' ? 'mock_audio.mp3' : undefined,
      timestamp: new Date().toISOString(),
      isOwn: true,
      type: type
    };

    updateThreadMessages(activeThreadId, newMessage);
    setInputText('');

    // Simulate Reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: `m${Date.now() + 1}`,
        senderId: activeUser?.id || 'unknown',
        text: 'That looks great! 👍',
        timestamp: new Date().toISOString(),
        isOwn: false,
        type: 'text'
      };
      updateThreadMessages(activeThreadId, replyMessage);
    }, 2000);
  };

  const updateThreadMessages = (threadId: string, msg: Message) => {
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          messages: [...t.messages, msg],
          lastMessage: msg.type === 'text' ? (msg.text || '') : `Sent an ${msg.type}`,
          timestamp: 'Just now'
        };
      }
      return t;
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          handleSendMessage('image', ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    handleSendMessage('audio', 'Voice Note');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex w-full h-full bg-white dark:bg-black md:border md:border-gray-200 dark:md:border-gray-800 md:rounded-lg overflow-hidden">
      
      {/* Thread List (Left Side) */}
      <div className={`${activeThreadId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-[350px] border-r border-gray-200 dark:border-gray-800`}>
        <div className="h-[60px] flex items-center justify-between px-5 border-b border-gray-200 dark:border-gray-800">
           <h1 className="font-bold text-lg flex items-center">
             vibesnap_admin
             <svg className="ml-1 rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
           </h1>
           <Edit size={24} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-3 font-bold text-sm">Messages</div>
          {threads.map(thread => {
            const user = MOCK_USERS.find(u => u.id === thread.userId);
            if(!user) return null;
            return (
              <div 
                key={thread.id} 
                onClick={() => setActiveThreadId(thread.id)}
                className={`flex items-center px-5 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${activeThreadId === thread.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <div className="relative">
                  <img src={user.avatar} className="w-14 h-14 rounded-full object-cover" />
                  {user.isVerified && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="ml-4 flex-1">
                   <div className="text-sm font-semibold text-black dark:text-white">{user.fullName}</div>
                   <div className="text-sm text-gray-500 truncate flex space-x-1">
                     <span className="truncate max-w-[150px]">{thread.lastMessage}</span>
                     <span>• {thread.timestamp}</span>
                   </div>
                </div>
                {thread.unreadCount > 0 && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Chat Window (Right Side) */}
      <div className={`${!activeThreadId ? 'hidden md:flex' : 'flex'} flex-col flex-1 h-full bg-white dark:bg-black`}>
        {activeThreadId ? (
          <>
            {/* Chat Header */}
            <div className="h-[60px] flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <button onClick={() => setActiveThreadId(null)} className="md:hidden mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <img src={activeUser?.avatar} className="w-8 h-8 rounded-full mr-3" />
                <span className="font-bold">{activeUser?.username}</span>
              </div>
              <div className="flex space-x-4 text-gray-900 dark:text-gray-100">
                {/* Removed Phone and Video Icons as per requirements */}
                <Info size={24} />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               <div className="flex flex-col items-center py-8">
                  <img src={activeUser?.avatar} className="w-24 h-24 rounded-full mb-3" />
                  <h2 className="text-xl font-bold">{activeUser?.fullName}</h2>
                  <p className="text-gray-500 text-sm">{activeUser?.username} • VibeSnap</p>
                  <button className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-lg text-sm font-semibold mt-3">View Profile</button>
               </div>
               
               {activeThread?.messages.map(msg => (
                 <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                    {!msg.isOwn && <img src={activeUser?.avatar} className="w-7 h-7 rounded-full mr-2 self-end" />}
                    <div className={`max-w-[70%] rounded-2xl text-sm ${
                        msg.type === 'image' ? 'p-0 overflow-hidden bg-transparent' : 
                        msg.isOwn ? 'bg-brand-primary text-white px-4 py-2' : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2'
                      }`}>
                       {msg.type === 'text' && msg.text}
                       {msg.type === 'image' && <img src={msg.imageUrl} className="w-full h-auto rounded-lg" />}
                       {msg.type === 'audio' && (
                         <div className="flex items-center space-x-2 min-w-[120px]">
                           <button className="bg-white/20 p-1 rounded-full"><Play size={16} fill="currentColor" /></button>
                           <div className="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
                             <div className="h-full bg-white w-1/2"></div>
                           </div>
                           <span className="text-xs opacity-70">0:05</span>
                         </div>
                       )}
                    </div>
                 </div>
               ))}
               <div ref={chatEndRef}></div>
            </div>

            {/* Input Area */}
            <div className="p-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full flex items-center p-2 px-4 space-x-3 relative">
                 {isRecording ? (
                   <div className="flex-1 flex items-center justify-between text-red-500 animate-pulse">
                      <div className="flex items-center space-x-2">
                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                         <span className="font-bold">{formatTime(recordingDuration)}</span>
                      </div>
                      <button onClick={handleStopRecording} className="font-bold">Send</button>
                   </div>
                 ) : (
                   <>
                    <button 
                      className="bg-brand-primary p-1 rounded-full text-white"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon size={16} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                    <input 
                        type="text" 
                        placeholder="Message..." 
                        className="flex-1 bg-transparent focus:outline-none text-sm text-black dark:text-white"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage('text', inputText)}
                    />
                    {inputText ? (
                        <button onClick={() => handleSendMessage('text', inputText)} className="text-brand-primary font-semibold text-sm">Send</button>
                    ) : (
                      <>
                        <Mic size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsRecording(true)} />
                        <Smile size={24} className="text-gray-500" />
                      </>
                    )}
                   </>
                 )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-4">
                <Send size={48} className="ml-2" />
             </div>
             <h2 className="text-xl font-light">Your Messages</h2>
             <p className="text-gray-500 text-sm mt-2">Send private photos and messages to a friend or group.</p>
             <button className="bg-brand-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold mt-4">Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
