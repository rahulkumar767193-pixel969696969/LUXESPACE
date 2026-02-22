
import React, { useState, useEffect } from 'react';
// Use namespace import to resolve "no exported member" errors in certain environments
import * as ReactRouterDOM from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Support from './pages/Support';
import ChatWidget from './components/ChatWidget';
import { User } from './types';
import { MockAPI } from './api';
import { PRELOAD_IMAGES } from './constants';

const { HashRouter, Routes, Route, Link, Navigate, useLocation } = ReactRouterDOM;
// Alias HashRouter as Router for internal use
const Router = HashRouter;

// Defined ProtectedRouteProps to explicitly handle children and user state
interface ProtectedRouteProps {
  children?: React.ReactNode;
  user: User | null;
}

const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MockAPI.getCurrentUser());
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    // Preload all demo images once at startup for instant AI feel
    PRELOAD_IMAGES.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const u = MockAPI.getCurrentUser();
    if (u) setUser(u);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => {
    MockAPI.logout();
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-500 bg-[var(--bg)]">
        <Navbar user={user} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
            
            <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user!} /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute user={user}><History user={user!} /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute user={user}><Support user={user!} /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
        {user && <ChatWidget user={user} />}
      </div>
    </Router>
  );
};

const Navbar = ({ user, onLogout, theme, onToggleTheme }: { user: User | null; onLogout: () => void; theme: string; onToggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled || !isHome ? 'glass py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black text-xl transition-all group-hover:rotate-12 group-hover:scale-110 shadow-xl">
            L
          </div>
          <span className="text-2xl font-bold tracking-tighter text-[var(--text-main)]">
            LuxeSpace<span className="text-[#D4AF37]">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-medium">
          <Link to="/" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/' ? 'text-[#D4AF37]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-all`}>Home</Link>
          <Link to="/dashboard" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/dashboard' ? 'text-[#D4AF37]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-all`}>AI Studio</Link>
          <Link to="/gallery" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/gallery' ? 'text-[#D4AF37]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-all`}>Gallery</Link>
          <Link to="/support" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/support' ? 'text-[#D4AF37]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'} transition-all`}>Support</Link>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center text-[var(--text-muted)] border border-[var(--border)] hover:border-[#D4AF37]/40 hover:text-[var(--text-main)] transition-all shadow-sm active:scale-90"
            >
              {theme === 'dark' ? (
                <i className="fas fa-sun text-sm"></i>
              ) : (
                <i className="fas fa-moon text-sm"></i>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-8">
                <Link to="/history" className={`text-[10px] font-black uppercase tracking-[0.3em] ${location.pathname === '/history' ? 'text-[#D4AF37]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>History</Link>
                <div className="flex items-center gap-4 pl-6 border-l border-[var(--border)]">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-[var(--text-main)] uppercase tracking-widest">{user.name}</p>
                    <button onClick={onLogout} className="text-[8px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors">Terminate</button>
                  </div>
                  <img src={user.avatar} className="w-9 h-9 rounded-full border border-[var(--border)] shadow-xl" alt="Avatar" referrerPolicy="no-referrer" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] hover:text-[var(--text-main)]">Login</Link>
                <Link to="/register" className="btn-luxe btn-interact btn-shimmer !py-3 !px-8 text-[9px] uppercase tracking-[0.3em]">
                  Join Studio
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-[var(--border)] bg-[var(--card-bg)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-bold text-sm">L</div>
            <span className="text-xl font-bold tracking-tighter text-[var(--text-main)]">LuxeSpaceAI</span>
          </div>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-10 font-light uppercase tracking-[0.2em]">
            The intersection of neural intelligence and architectural artistry. Redefining spatial boundaries since 2024.
          </p>
          <div className="flex gap-4">
            {[
              { icon: 'fa-instagram', link: '#' },
              { icon: 'fa-linkedin-in', link: '#' },
              { icon: 'fa-twitter', link: '#' },
              { icon: 'fa-telegram', link: '#' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link} 
                className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 border border-[var(--border)] transition-all shadow-lg"
              >
                <i className={`fab ${social.icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Platform</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
              <li><Link to="/" className="hover:text-[var(--text-main)] transition-all">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-[var(--text-main)] transition-all">AI Studio</Link></li>
              <li><Link to="/gallery" className="hover:text-[var(--text-main)] transition-all">Gallery</Link></li>
              <li><Link to="/support" className="hover:text-[var(--text-main)] transition-all">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Company</h4>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">
              <li><a href="#" className="hover:text-[var(--text-main)] transition-all">Vision</a></li>
              <li><a href="#" className="hover:text-[var(--text-main)] transition-all">Privacy</a></li>
              <li><a href="#" className="hover:text-[var(--text-main)] transition-all">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-20 text-center">
        <div className="h-px w-full bg-[var(--border)] mb-12"></div>
        <p className="text-[var(--text-muted)] opacity-40 text-[9px] font-black tracking-[0.8em] uppercase">
          &copy; 2025 LuxeSpace AI. Industrial Synthesis. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default App;
