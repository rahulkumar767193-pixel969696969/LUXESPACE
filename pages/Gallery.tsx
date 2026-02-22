
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_CATEGORIES = ['All', 'Bedroom', 'Living Room', 'Kitchen', 'Office'];

const GALLERY_ITEMS = [
  { id: 1, title: 'Parisian Modern', category: 'Living Room', style: 'Modern Luxury', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Nordic Calm', category: 'Bedroom', style: 'Scandinavian', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, title: 'Industrial Loft', category: 'Office', style: 'Industrial', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, title: 'Noir Executive', category: 'Office', style: 'Executive', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
  { id: 5, title: 'Zen Retreat', category: 'Bedroom', style: 'Zen', img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1200' },
  { id: 7, title: 'Urban Sanctuary', category: 'Living Room', style: 'Urban', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200' },
  { id: 8, title: 'Coastal Breeze', category: 'Living Room', style: 'Coastal', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200' },
  { id: 9, title: 'Emerald Suite', category: 'Bedroom', style: 'Art Deco', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200' },
  { id: 10, title: 'Tech Hub', category: 'Office', style: 'Futuristic', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200' },
  { id: 11, title: 'Bistro Charm', category: 'Kitchen', style: 'Rustic', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200' },
  { id: 12, title: 'Velvet Lounge', category: 'Living Room', style: 'Glamour', img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=1200' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-6"
          >
            Design Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="serif-font text-6xl md:text-8xl text-[var(--text-main)] mb-8 tracking-tighter"
          >
            Curated <span className="text-[#D4AF37] italic">Showcase.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-muted)] text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore our collection of neural-synthesized environments. Each project represents a unique intersection of spatial geometry and aesthetic vision.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {GALLERY_CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-xl' 
                  : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] hover:border-[#D4AF37]/50 hover:text-[var(--text-main)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] mb-2">{item.category}</span>
                  <h4 className="text-2xl font-bold text-white tracking-tight mb-1">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.style}</p>
                </div>
                
                {/* Style Label Badge */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedItem(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-[var(--card-bg)] rounded-[4rem] overflow-hidden border border-white/10 shadow-4xl flex flex-col md:flex-row"
            >
              <div className="md:w-2/3 aspect-square md:aspect-auto">
                <img src={selectedItem.img} className="w-full h-full object-cover" alt={selectedItem.title} referrerPolicy="no-referrer" />
              </div>
              <div className="md:w-1/3 p-12 md:p-16 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <i className="fas fa-times"></i>
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-6">{selectedItem.category}</span>
                <h2 className="serif-font text-5xl text-white mb-8 leading-tight">{selectedItem.title}</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Design Manifest</h4>
                    <p className="text-white/70 font-light leading-relaxed">
                      This project explores the {selectedItem.style.toLowerCase()} aesthetic manifold, utilizing neural spatial mapping to optimize light flow and volumetric balance within a {selectedItem.category.toLowerCase()} context.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Style</h4>
                      <p className="text-white font-bold">{selectedItem.style}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Resolution</h4>
                      <p className="text-white font-bold">8K Native</p>
                    </div>
                  </div>
                  <button className="btn-luxe btn-interact w-full py-5 text-[10px] font-black uppercase tracking-widest">
                    Synthesize Similar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
