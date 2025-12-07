import React, { useState } from 'react';
import { User } from '../types';
import { CURRENT_USER } from '../constants';
import { Zap } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (view === 'forgot') {
      setTimeout(() => {
        setResetSent(true);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Simulate API Call for Login/Signup
    setTimeout(() => {
      // Mock successful login/signup
      const mockUser: User = {
        ...CURRENT_USER,
        username: username || CURRENT_USER.username,
        fullName: fullName || CURRENT_USER.fullName,
        email: email || CURRENT_USER.email,
        // If it's a new signup, we'd typically create a new ID
        id: view === 'signup' ? `user_${Date.now()}` : CURRENT_USER.id
      };
      
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black w-full text-slate-900 dark:text-white transition-colors duration-200 p-4">
      <div className="w-full max-w-[350px] space-y-4">
        
        {/* Main Box */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-brand-primary text-white p-1 rounded-lg">
                <Zap size={28} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold font-logo text-brand-primary">VibeSnap</h1>
          </div>
          
          {view === 'forgot' ? (
             <div className="text-center w-full">
                <div className="mb-4 flex justify-center">
                   <div className="w-24 h-24 rounded-full border-2 border-slate-900 dark:border-white flex items-center justify-center">
                     <svg aria-label="Lock" className="text-slate-900 dark:text-white" height="48" role="img" viewBox="0 0 96 96" width="48"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M66.095 44.428v-9.643c0-9.94-8.06-18-18-18s-18 8.06-18 18v9.643" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><rect height="28" rx="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="44" x="26" y="44"></rect></svg>
                   </div>
                </div>
                
                {resetSent ? (
                  <div className="mb-4">
                    <h3 className="font-bold text-base mb-2">Email Sent</h3>
                    <p className="text-gray-500 text-sm mb-4">We sent an email to {email} with a link to get back into your account.</p>
                    <button onClick={() => setView('login')} className="text-brand-primary font-bold text-sm">OK</button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-base mb-2">Trouble logging in?</h3>
                    <p className="text-gray-500 text-sm mb-6">Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                    <form onSubmit={handleSubmit} className="w-full space-y-3">
                      <input 
                        type="email" 
                        placeholder="Email, Phone, or Username"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 rounded-lg text-sm disabled:opacity-70 transition-colors"
                      >
                        {isLoading ? 'Sending...' : 'Send Login Link'}
                      </button>
                    </form>
                    <div className="flex items-center w-full my-4">
                      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                      <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
                      <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    <button onClick={() => setView('signup')} className="font-bold text-sm text-slate-900 dark:text-white hover:text-gray-600">Create New Account</button>
                  </>
                )}
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <input 
                type="text" 
                placeholder="Phone number, username, or email"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              {view === 'signup' && (
                <>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Username"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              )}

              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 rounded-lg text-sm mt-2 disabled:opacity-70 transition-colors"
              >
                {isLoading ? 'Loading...' : (view === 'login' ? 'Log in' : 'Sign up')}
              </button>
            </form>
          )}

          {view === 'login' && (
            <>
              <div className="flex items-center w-full my-4">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
                <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              </div>
              
              <button onClick={() => setView('forgot')} className="text-xs text-brand-primary">Forgot password?</button>
            </>
          )}
          
          {view === 'forgot' && !resetSent && (
             <button onClick={() => setView('login')} className="mt-8 text-sm font-bold text-slate-900 dark:text-white border border-gray-300 dark:border-gray-700 px-4 py-2 w-full rounded-lg">Back to Login</button>
          )}
        </div>

        {/* Switcher Box */}
        {view !== 'forgot' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center text-sm shadow-sm">
            {view === 'login' ? (
              <p>Don't have an account? <button onClick={() => setView('signup')} className="text-brand-primary font-bold ml-1">Sign up</button></p>
            ) : (
              <p>Have an account? <button onClick={() => setView('login')} className="text-brand-primary font-bold ml-1">Log in</button></p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthPage;