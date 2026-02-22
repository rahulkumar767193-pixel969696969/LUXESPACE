
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MockAPI } from '../api';
import { User } from '../types';

const { Link, useNavigate } = ReactRouterDOM;

interface LoginProps {
  onLogin: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await MockAPI.login(email, password);
      onLogin(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-400" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#D4AF37]/5 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-[420px] p-10 md:p-12 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 relative z-10 backdrop-blur-3xl" style={{ backgroundColor: 'rgba(21, 22, 25, 0.8)' }}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black text-xl mx-auto mb-5 shadow-2xl">
            <i className="fas fa-lock"></i>
          </div>
          <h1 className="serif-font text-3xl mb-2 tracking-tight text-white">Sign In.</h1>
          <p className="opacity-50 text-[11px] text-white font-light uppercase tracking-widest">Premium Workspace Access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-wider border border-red-500/20 flex items-center gap-3">
            <i className="fas fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 text-white">Member ID</label>
            <input 
              required type="email" 
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none transition-all font-medium text-white placeholder:text-white/10 text-sm"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[9px] font-black opacity-40 uppercase tracking-[0.2em] text-white">Security Key</label>
            </div>
            <input 
              required type="password" 
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none transition-all font-medium text-white placeholder:text-white/10 text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-[#D4AF37] text-black rounded-full font-black text-[10px] uppercase tracking-[0.25em] hover:bg-yellow-500 transition-all hover:shadow-2xl flex items-center justify-center gap-3 shadow-xl btn-interact btn-shimmer mt-4"
          >
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : 'Authenticate'}
          </button>
        </form>

        <p className="text-center mt-8 opacity-40 text-[10px] text-white uppercase tracking-widest font-bold">
          New to LuxeSpace? <Link to="/register" className="text-[#D4AF37] hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
