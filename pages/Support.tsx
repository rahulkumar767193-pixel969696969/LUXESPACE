
import React, { useState } from 'react';
import { User, SupportTicket } from '../types';
import { MockAPI } from '../api';

const Support = ({ user }: { user: User }) => {
  const [category, setCategory] = useState('General Inquiry');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ticket: SupportTicket = {
      id: Date.now().toString(),
      userId: user.id,
      name: user.name,
      email: user.email,
      category,
      description,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    await MockAPI.submitTicket(ticket);
    setLoading(false);
    setSubmitted(true);
    setDescription('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-12 pb-24 transition-colors duration-500 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 reveal-up active border-l border-[var(--border)] pl-8">
          <span className="badge-premium mb-6 inline-block">Support Center</span>
          <h1 className="serif-font text-5xl mb-3 tracking-tight text-[var(--text-main)]">Help & <span className="text-[#D4AF37]">Support.</span></h1>
          <p className="text-[var(--text-muted)] text-lg font-light max-w-xl">Direct access to the LuxeSpace architectural concierge and systemic anomaly reporting.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div className="p-12 rounded-[3rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)]">
              <h3 className="serif-font text-3xl mb-10 text-[var(--text-main)]">Direct Channels</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-[#D4AF37]/20 transition-transform hover:scale-110">
                    <i className="fas fa-envelope-open-text"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 tracking-tight text-[var(--text-main)]">Customer Care</h4>
                    <p className="text-[var(--text-muted)] text-sm mb-3 font-light">Direct architectural concierge.</p>
                    <a href="mailto:care@luxespace.ai" className="text-[#D4AF37] font-bold hover:underline tracking-tight">care@luxespace.ai</a>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-blue-500/20 transition-transform hover:scale-110">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 tracking-tight text-[var(--text-main)]">Technical Helpline</h4>
                    <p className="text-[var(--text-muted)] text-sm mb-3 font-light">Global priority line.</p>
                    <a href="tel:+1800LUXETECH" className="text-blue-500 font-bold hover:underline tracking-tight">+1 (800) LUXE-TECH</a>
                  </div>
                </div>
                <div className="pt-6 border-t border-[var(--border)]">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Studio Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Mon - Fri</span>
                      <span className="text-[var(--text-main)] font-bold">08:00 - 22:00 EST</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--text-muted)]">Sat - Sun</span>
                      <span className="text-[var(--text-main)] font-bold">10:00 - 18:00 EST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)]">
              <h3 className="serif-font text-2xl mb-8 text-[var(--text-main)]">Follow Our Journey</h3>
              <div className="flex flex-wrap gap-4">
                {['instagram', 'facebook-f', 'twitter', 'linkedin-in', 'youtube', 'telegram'].map((icon) => (
                  <button key={icon} className="btn-interact w-12 h-12 bg-[var(--input-bg)] rounded-full flex items-center justify-center text-[var(--text-muted)] hover:bg-[#D4AF37] hover:text-black transition-all text-xl border border-[var(--border)]">
                    <i className={`fab fa-${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#D4AF37] p-12 rounded-[3rem] shadow-2xl text-black relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="serif-font text-3xl mb-4 relative z-10">Elite Membership.</h3>
              <p className="opacity-70 mb-10 relative z-10 font-medium leading-relaxed">LuxeSpace Elite members receive 1-on-1 consultations with world-class interior designers and priority render queueing.</p>
              <button className="btn-interact btn-shimmer bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all relative z-10 shadow-xl tracking-widest text-xs uppercase">Upgrade Status</button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-12 rounded-[3rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)] min-h-[600px] flex flex-col">
              {submitted ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in fade-in duration-700">
                  <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 text-4xl mb-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="space-y-4">
                    <h3 className="serif-font text-4xl text-[var(--text-main)]">Transmission Successful.</h3>
                    <p className="text-[var(--text-muted)] max-w-md mx-auto font-light leading-relaxed">
                      Your spatial anomaly report has been logged in our secure vault. A LuxeSpace concierge will analyze the signal and respond within 4 neural cycles.
                    </p>
                  </div>
                  <div className="pt-8">
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary-luxe !px-12 !py-4 text-[10px] uppercase tracking-[0.3em] font-black"
                    >
                      New Transmission
                    </button>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)] opacity-30 pt-12">
                    Ticket ID: #{Math.floor(Math.random() * 900000)}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="serif-font text-3xl mb-4 text-[var(--text-main)]">Signal an Issue</h3>
                  <p className="text-[var(--text-muted)] mb-12 font-light">Provide details of the discrepancy for neural correction or feature requests.</p>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Origin Profile</label>
                        <input disabled type="text" value={user.name} className="w-full p-5 bg-[var(--input-bg)] rounded-2xl opacity-40 cursor-not-allowed border border-[var(--border)] font-medium text-[var(--text-main)]" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Signal ID</label>
                        <input disabled type="email" value={user.email} className="w-full p-5 bg-[var(--input-bg)] rounded-2xl opacity-40 cursor-not-allowed border border-[var(--border)] font-medium text-[var(--text-main)]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Anomaly category</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-5 bg-[var(--input-bg)] rounded-2xl border border-[var(--border)] focus:border-[#D4AF37] outline-none transition-all font-medium appearance-none text-[var(--text-main)]"
                      >
                        <option className="bg-[var(--card-bg)]">General Inquiry</option>
                        <option className="bg-[var(--card-bg)]">Synthesis Glitch</option>
                        <option className="bg-[var(--card-bg)]">Account Provisioning</option>
                        <option className="bg-[var(--card-bg)]">Feature Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">Narrative Description</label>
                      <textarea 
                        required rows={5}
                        placeholder="Describe the spatial or systemic anomaly in detail..."
                        className="w-full p-6 bg-[var(--input-bg)] rounded-[2rem] border border-[var(--border)] focus:border-[#D4AF37] outline-none transition-all font-medium leading-relaxed text-[var(--text-main)]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" disabled={loading}
                      className="w-full py-6 bg-[#D4AF37] text-black rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 btn-interact btn-shimmer"
                    >
                      {loading ? <i className="fas fa-circle-notch animate-spin"></i> : 'Transmit to Studio'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
