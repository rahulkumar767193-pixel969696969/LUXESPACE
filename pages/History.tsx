
import React, { useEffect, useState } from 'react';
import { User, DesignHistoryItem } from '../types';
import { MockAPI } from '../api';

const History = ({ user }: { user: User }) => {
  const [history, setHistory] = useState<DesignHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    setLoading(true);
    const data = await MockAPI.getHistory(user.id);
    setHistory(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this design?')) return;
    await MockAPI.deleteDesign(user.id, id);
    fetchHistory();
  };

  return (
    <div className="min-h-screen pt-32 pb-24 transition-colors duration-400" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex justify-between items-end mb-16 reveal-up active">
          <div>
            <h1 className="serif-font text-5xl mb-3 tracking-tight text-[var(--text-main)]">Your <span className="text-[#D4AF37]">Vault.</span></h1>
            <p className="text-[var(--text-muted)] opacity-60 text-lg font-light">A curated collection of your spatial transformations.</p>
          </div>
          <div className="bg-[#D4AF37]/10 px-6 py-2 rounded-full border border-[#D4AF37]/20 font-bold text-[#D4AF37]">
            {history.length} Reconstructions
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <i className="fas fa-circle-notch animate-spin text-4xl text-[#EAB308]"></i>
          </div>
        ) : history.length === 0 ? (
          <div className="p-20 rounded-[3rem] border-2 border-dashed border-current opacity-5 text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="w-24 h-24 bg-current opacity-5 rounded-full flex items-center justify-center text-4xl opacity-10 mx-auto mb-10">
              <i className="fas fa-box-open"></i>
            </div>
            <h2 className="serif-font text-3xl mb-4">Vault Empty</h2>
            <p className="opacity-20 max-w-sm mx-auto mb-10 font-light">Your architectural experiments will materialize here.</p>
            <a href="#/dashboard" className="px-10 py-4 bg-[#EAB308] text-black rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-block">Visit Studio</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {history.map((item) => (
              <div key={item.id} className="group rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-[var(--border)]" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={item.afterImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Design" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 flex gap-3">
                    <button onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-red-500/80 backdrop-blur-xl text-white rounded-full hover:bg-red-500 transition-all shadow-xl"><i className="fas fa-trash-alt text-sm"></i></button>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <span className="px-4 py-1.5 bg-[#D4AF37] text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-xl">{item.styleType}</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.roomType}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center text-[var(--text-muted)] opacity-60 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <span><i className="far fa-calendar-alt mr-2"></i>{item.timestamp.split(',')[0]}</span>
                    <span><i className="far fa-clock mr-2"></i>{item.timestamp.split(',')[1]}</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)]">
                    <p className="text-[var(--text-muted)] opacity-80 text-sm font-light italic leading-relaxed line-clamp-2">"{item.explanation.summary}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
