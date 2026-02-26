
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = () => {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [demoSliderPos, setDemoSliderPos] = useState(50);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "Transform Your Space Into a Dream Home",
      subtitle: "Where neural intelligence meets architectural artistry. Transform raw spatial captures into photorealistic masterpieces instantly.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920"
    },
    {
      title: "Design Without Boundaries",
      subtitle: "Explore infinite aesthetic manifolds with our industrial-grade AI engine. From Parisian Modern to Nordic Calm.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920"
    },
    {
      title: "Architectural Precision at Your Fingertips",
      subtitle: "Sub-millimeter spatial mapping ensures your designs respect the geometry of your existing environment.",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const services = [
    {
      title: "Spatial Reconstruction",
      desc: "Our AI analyzes your room's geometry to create a perfect 3D digital twin for design exploration.",
      icon: "fa-cube"
    },
    {
      title: "Aesthetic Interpolation",
      desc: "Switch between hundreds of design styles instantly, from Industrial Loft to Scandinavian Minimal.",
      icon: "fa-wand-magic-sparkles"
    },
    {
      title: "Photorealistic Rendering",
      desc: "Generate 8K resolution visualizations that look indistinguishable from professional photography.",
      icon: "fa-camera-retro"
    },
    {
      title: "Live AR Preview",
      desc: "Visualize your new design in real-time using our advanced augmented reality spatial mapping.",
      icon: "fa-vr-cardboard"
    }
  ];

  const steps = [
    { number: "01", title: "Capture", desc: "Upload a photo or use our live spatial scanner to map your room." },
    { number: "02", title: "Calibrate", desc: "Select your desired aesthetic manifold and functional requirements." },
    { number: "03", title: "Synthesize", desc: "Our neural engine generates a high-fidelity design in seconds." },
    { number: "04", title: "Refine", desc: "Adjust lighting, materials, and furniture to perfect your vision." },
    { number: "05", title: "Materialize", desc: "Choose from a curated list of premium materials and textures." },
    { number: "06", title: "Export", desc: "Download high-resolution 8K renders and architectural blueprints." },
    { number: "07", title: "Procure", desc: "Get a direct shopping list of furniture and decor used in your design." },
    { number: "08", title: "Execute", desc: "Connect with our network of certified contractors to bring your vision to life." }
  ];

  const showcaseItems = [
    { title: 'Parisian Modern', category: 'Luxury Apartment', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Nordic Calm', category: 'Residential Suite', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Industrial Loft', category: 'Creative Workspace', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Noir Executive', category: 'Private Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Zen Retreat', category: 'Master Bedroom', img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Minimalist Kitchen', category: 'Culinary Space', img: 'https://images.unsplash.com/photo-1556912177-f5133917935a?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Urban Sanctuary', category: 'Living Area', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Coastal Breeze', category: 'Beach House', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200' },
  ];

  const reviews = [
    {
      name: "Julianne Vaught",
      role: "Architectural Lead, V-Studio",
      text: "The fidelity of the neural reconstruction is unprecedented. It captures spatial nuances that traditional software often ignores.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      stars: 5
    },
    {
      name: "Marcus Thorne",
      role: "Real Estate Developer",
      text: "We reduced our staging costs by 80%. Our clients can visualize their future home in a matter of seconds, not weeks.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      stars: 5
    },
    {
      name: "Elena Rossi",
      role: "Interior Stylist",
      text: "LuxeSpace has become my primary brainstorming partner. The style interpolation is nothing short of magical.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
      stars: 5
    }
  ];

  return (
    <div className="overflow-x-hidden min-h-screen relative page-transition bg-[var(--bg)]">
      {/* Hero Section - Full Screen Slideshow */}
      <section className="relative h-[calc(100vh-5rem)] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHeroSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[activeHeroSlide].img})` }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-4xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <span className="badge-premium">Next-Gen Interior AI</span>
                <div className="h-px w-12 bg-white/20"></div>
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">v3.0 Stable</span>
              </motion.div>

              <motion.h1 
                key={`title-${activeHeroSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="serif-font text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white"
              >
                {heroSlides[activeHeroSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i > 2 ? "text-[#D4AF37] italic" : ""}>{word} </span>
                ))}
              </motion.h1>

              <motion.p 
                key={`sub-${activeHeroSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-xl md:text-2xl text-white/70 font-light max-w-2xl leading-relaxed"
              >
                {heroSlides[activeHeroSlide].subtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-wrap gap-6 pt-8"
              >
                <Link to="/dashboard" className="btn-luxe btn-interact btn-shimmer !py-5 !px-14 text-sm uppercase tracking-widest shadow-2xl">
                  Try AI Studio
                </Link>
                <Link to="/gallery" className="btn-secondary-luxe !py-5 !px-14 text-sm uppercase tracking-widest border-white/20 text-white hover:bg-white/10">
                  Explore Gallery
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveHeroSlide(i)}
              className={`h-1 transition-all duration-500 rounded-full ${activeHeroSlide === i ? 'w-12 bg-[#D4AF37]' : 'w-4 bg-white/20'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-32 relative z-10 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Neural Spatial Mapping", desc: "Upload any room photo and our AI reconstructs the 3D geometry instantly.", icon: "fa-cube" },
              { title: "Live Lens Capture", desc: "Use your device camera for real-time spatial analysis and design overlay.", icon: "fa-camera" },
              { title: "Aesthetic Manifolds", desc: "Switch between hundreds of curated styles from Parisian Modern to Nordic Calm.", icon: "fa-wand-magic-sparkles" },
              { title: "8K Photorealism", desc: "Generate high-fidelity renders indistinguishable from professional photography.", icon: "fa-image" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] border border-[var(--border)] bg-[var(--card-bg)] hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <i className={`fas ${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-[var(--text-muted)] font-light leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-[var(--card-bg)] border-y border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-6">The Process</span>
            <h2 className="serif-font text-5xl md:text-7xl text-[var(--text-main)] mb-8">How It <span className="text-[#D4AF37]">Works.</span></h2>
            <p className="text-[var(--text-muted)] text-lg font-light">Three simple steps to redefine your spatial reality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { step: "01", title: "Capture", desc: "Upload a photo or use our live spatial scanner to map your room's geometry." },
              { step: "02", title: "Calibrate", desc: "Select your desired aesthetic manifold and functional requirements." },
              { step: "03", title: "Synthesize", desc: "Our neural engine generates a high-fidelity design in seconds." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-[#D4AF37]/5 absolute -top-12 -left-4 select-none">{item.step}</div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-[var(--text-main)] mb-6 tracking-tight">{item.title}</h4>
                  <p className="text-[var(--text-muted)] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="serif-font text-5xl md:text-7xl text-[var(--text-main)] mb-8">Trusted by <span className="text-[#D4AF37]">Visionaries.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {reviews.map((review, i) => (
              <div key={i} className="p-12 rounded-[4rem] border border-[var(--border)] bg-[var(--card-bg)] relative">
                <div className="flex gap-1 text-[#D4AF37] mb-8 text-xs">
                  {[...Array(review.stars)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p className="text-[var(--text-main)] text-lg font-light italic leading-relaxed mb-10">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} className="w-12 h-12 rounded-full border border-[var(--border)]" alt={review.name} referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold text-[var(--text-main)] text-sm">{review.name}</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="p-20 md:p-32 rounded-[5rem] relative overflow-hidden text-center bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-4xl reveal-up" ref={el => { revealRefs.current[20] = el; }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative z-10 space-y-12">
              <h2 className="serif-font text-6xl md:text-8xl text-black leading-none tracking-tighter">Ready to Refine <br />Your Vision?</h2>
              <p className="text-black/70 text-xl font-medium max-w-xl mx-auto leading-relaxed">Join thousands of homeowners and professionals using LuxeSpace AI to redefine their environments.</p>
              
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <Link to="/register" className="btn-interact bg-black text-white px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-neutral-900 transition-all shadow-2xl">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-interact bg-white/20 backdrop-blur-xl border border-black/10 text-black px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white/30 transition-all">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .float-anim {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-down {
          animation: scroll-down 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default Landing;

