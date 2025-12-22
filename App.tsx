
import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { AppBuilder } from './components/AppBuilder';
import { User } from './types';
import { LogOut, Sparkles, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('linkora_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('linkora_current_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('linkora_current_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Loading Linkora Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {user && (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[100]">
          <div className="max-w-[1700px] mx-auto px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900">Linkora <span className="text-indigo-600">Studio</span></h1>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Professional App Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-black text-slate-900">{user.name}</span>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active Session</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-all border border-slate-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className={user ? "p-8 md:p-12" : ""}>
        {user ? (
          <AppBuilder user={user} onLogout={handleLogout} />
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center py-20">
            <div className="mb-12 text-center animate-slideUp">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3" />
                  Next-Gen Development
               </div>
               <h2 className="text-4xl font-black text-slate-900 mb-2">Welcome to Linkora</h2>
               <p className="text-slate-400 font-medium">Log in to start building your professional mobile app</p>
            </div>
            <Auth onLogin={handleLogin} />
          </div>
        )}
      </main>

      {user && (
        <footer className="max-w-[1700px] mx-auto px-12 py-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">© 2025 Linkora Engine. All rights reserved.</p>
           <div className="flex items-center gap-8">
              <span className="text-[10px] font-black uppercase text-slate-400 cursor-pointer hover:text-indigo-600">Documentation</span>
              <span className="text-[10px] font-black uppercase text-slate-400 cursor-pointer hover:text-indigo-600">Privacy Policy</span>
              <span className="text-[10px] font-black uppercase text-slate-400 cursor-pointer hover:text-indigo-600">Support</span>
           </div>
        </footer>
      )}
    </div>
  );
};

export default App;
