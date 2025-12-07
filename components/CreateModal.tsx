import React, { useState, useRef } from 'react';
import { X, ArrowLeft, Wand2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { CURRENT_USER } from '../constants';

interface CreateModalProps {
  onClose: () => void;
  onPost: (post: any) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onPost }) => {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedFile(ev.target?.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCaption = async () => {
    if (!process.env.API_KEY) {
      alert("API Key missing. Cannot generate caption.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Removed deprecated ai.models.getGenerativeModel
      
      const prompt = "Write a catchy, short Instagram caption for a travel or lifestyle photo with 3 trending hashtags. Only return the text.";
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      // Updated to access text property directly
      const text = result.text || '';
      setCaption(text);
    } catch (error) {
      console.error("AI Error", error);
      alert("Failed to generate caption. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    const newPost = {
      id: `p${Date.now()}`,
      userId: CURRENT_USER.id,
      imageUrl: selectedFile || 'https://picsum.photos/600/600',
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      isLiked: false,
      isSaved: false,
      type: 'photo'
    };
    onPost(newPost);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center">
          {step === 1 ? (
             <button onClick={onClose}><X /></button>
          ) : (
             <button onClick={() => setStep(1)}><ArrowLeft /></button>
          )}
          <h2 className="font-bold">Create new post</h2>
          {step === 2 ? (
             <button onClick={handleShare} className="text-blue-500 font-bold hover:text-blue-600">Share</button>
          ) : (
            <div className="w-6"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row h-[500px]">
           {step === 1 ? (
             <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <svg aria-label="Icon to represent media such as images or videos" className="mb-4" color="currentColor" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1 3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.9.3L7 45.5c-1.7-3.5-1.5-7.5.9-10.5l-4-32.3zm63.5 60.9c-.4 4.6-4.3 8-8.9 7.9l-34-2c-4.6-.3-8-4.3-7.9-8.9l2-34c.3-4.6 4.3-8 8.9-7.9l34 2c4.6.3 8 4.3 7.9 8.9l-2 34z" fill="currentColor"></path></svg>
                <h3 className="text-xl">Drag photos and videos here</h3>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm"
                >
                  Select from computer
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileSelect}
                />
             </div>
           ) : (
             <>
               <div className="w-full md:w-[60%] h-full bg-black flex items-center justify-center">
                  <img src={selectedFile || ''} className="max-h-full max-w-full object-contain" />
               </div>
               <div className="w-full md:w-[40%] border-l border-gray-200 dark:border-gray-700 flex flex-col">
                  <div className="flex items-center p-4 space-x-2">
                     <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full" />
                     <span className="font-bold text-sm">{CURRENT_USER.username}</span>
                  </div>
                  <div className="p-2 flex-1">
                    <textarea 
                      className="w-full h-32 resize-none outline-none bg-transparent p-2" 
                      placeholder="Write a caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                    
                    <button 
                      onClick={generateCaption}
                      disabled={isGenerating}
                      className="flex items-center space-x-2 text-blue-500 text-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors w-full"
                    >
                      <Wand2 size={16} />
                      <span>{isGenerating ? 'Generating...' : 'Write with AI'}</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                     <div className="flex justify-between items-center text-sm text-gray-500">
                       <span>Add location</span>
                       <span className="text-lg">📍</span>
                     </div>
                  </div>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;