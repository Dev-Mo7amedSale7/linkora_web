
import React, { useState } from 'react';
import { User } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const API_BASE_URL = 'http://localhost:5001/api';

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLogin(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center animate-fadeIn px-4">
      <div className="w-full max-w-md bg-white rounded-[3rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-60"></div>
        
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] text-white font-black text-4xl shadow-2xl shadow-indigo-200 mb-8 rotate-3">L</div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isLogin ? 'Login to manage your project' : 'Create an account to build apps'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5 relative">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Full Name</label>
              <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-500 bg-slate-50 outline-none font-bold text-sm text-slate-900" placeholder="John Doe" />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-500 bg-slate-50 outline-none font-bold text-sm text-slate-900" placeholder="name@company.com" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-500 bg-slate-50 outline-none font-bold text-sm text-slate-900" placeholder="••••••••" />
          </div>

          {error && <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 text-[10px] font-black text-center">{error}</div>}

          <button disabled={loading} type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center pt-4">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 tracking-widest">
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
