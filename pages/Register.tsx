
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MockAPI } from '../api';
import { User } from '../types';

const { Link, useNavigate } = ReactRouterDOM;

interface RegisterProps {
  onLogin: (u: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await MockAPI.register(name, email, password);
      onLogin(user);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-400" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-blue-500/5 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-[#D4AF37]/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-[420px] p-10 md:p-12 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 relative z-10 backdrop-blur-3xl" style={{ backgroundColor: 'rgba(21, 22, 25, 0.8)' }}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black text-xl mx-auto mb-5 shadow-2xl">
            <i className="fas fa-user-plus"></i>
          </div>
          <h1 className="serif-font text-3xl mb-2 tracking-tight text-white">Join Studio.</h1>
          <p className="opacity-50 text-[11px] text-white font-light uppercase tracking-widest">Initiate Membership</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 text-white">Full Identity</label>
            <input 
              required type="text" 
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none transition-all font-medium text-white placeholder:text-white/10 text-sm"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 text-white">Signal ID</label>
            <input 
              required type="email" 
              className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none transition-all font-medium text-white placeholder:text-white/10 text-sm"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[9px] font-black opacity-40 uppercase tracking-[0.2em] mb-2 text-white">Security Key</label>
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
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : 'Register'}
          </button>
        </form>

        <p className="text-center mt-8 opacity-40 text-[10px] text-white uppercase tracking-widest font-bold">
          Already a member? <Link to="/login" className="text-[#D4AF37] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
