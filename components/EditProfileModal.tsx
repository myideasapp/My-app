import React, { useState } from 'react';
import { User } from '../types';
import { X, Check } from 'lucide-react';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>(user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setAvatarPreview(ev.target.result as string);
          handleChange('avatar', ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
           <button onClick={onClose} className="text-gray-900 dark:text-white"><X size={24} /></button>
           <h1 className="font-bold text-lg">Edit Profile</h1>
           <button onClick={handleSubmit} className="text-blue-500 font-bold"><Check size={24} /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           
           {/* Avatar */}
           <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border border-gray-200">
                 <img src={avatarPreview} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <label className="text-blue-500 font-bold text-sm cursor-pointer hover:text-blue-700">
                Change profile photo
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
           </div>

           {/* Form Fields */}
           <div className="space-y-4">
              <Field label="Name" value={formData.fullName} onChange={(v) => handleChange('fullName', v)} />
              <Field label="Username" value={formData.username} onChange={(v) => handleChange('username', v)} />
              <Field label="Bio" value={formData.bio} onChange={(v) => handleChange('bio', v)} multiline />
              <div className="pt-2">
                 <h3 className="text-sm font-bold text-gray-500 mb-2">Private Information</h3>
                 <Field label="Email" value={formData.email || ''} onChange={(v) => handleChange('email', v)} />
                 <Field label="Phone" value={formData.phone || ''} onChange={(v) => handleChange('phone', v)} />
                 <Field label="Gender" value={formData.gender || ''} onChange={(v) => handleChange('gender', v)} />
                 <Field label="Website" value={formData.website || ''} onChange={(v) => handleChange('website', v)} />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, multiline = false }: { label: string, value: string, onChange: (val: string) => void, multiline?: boolean }) => (
  <div className="flex flex-col space-y-1">
     <label className="text-xs text-gray-500 font-semibold">{label}</label>
     {multiline ? (
       <textarea 
         value={value} 
         onChange={(e) => onChange(e.target.value)} 
         className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-1 focus:border-black dark:focus:border-white outline-none resize-none"
         rows={3}
       />
     ) : (
       <input 
         type="text" 
         value={value} 
         onChange={(e) => onChange(e.target.value)} 
         className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-1 focus:border-black dark:focus:border-white outline-none"
       />
     )}
  </div>
);

export default EditProfileModal;