
import React, { useState, useRef, useEffect } from 'react';
import { User, RoomType, StyleType, DesignHistoryItem, LoadingStep, GeneratedAsset, BudgetLevel, ColorPalette, LightingAmbiance } from '../types';
import { ROOM_TYPES, STYLE_TYPES, MOCK_IMAGES, STYLE_DESCRIPTIONS, BUDGET_LEVELS, COLOR_PALETTES, LIGHTING_AMBIANCES } from '../constants';
import { MockAPI } from '../api';
import CameraUpload from '../components/CameraUpload';
import LoadingIndicator from '../components/LoadingIndicator';
import AssetSynthesizer from '../components/AssetSynthesizer';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  user: User;
}

const PRESETS: { name: string; room: RoomType; style: StyleType; icon: string }[] = [
  { name: 'Organic Zen', room: 'Living Room', style: 'Minimal', icon: 'fa-leaf' },
  { name: 'Noir Studio', room: 'Office', style: 'Modern', icon: 'fa-laptop-code' },
  { name: 'Oslo Suite', room: 'Bedroom', style: 'Scandinavian', icon: 'fa-wind' },
  { name: 'Empire Dine', room: 'Kitchen', style: 'Luxury', icon: 'fa-crown' },
  { name: 'Concrete Loft', room: 'Living Room', style: 'Industrial', icon: 'fa-city' },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [roomType, setRoomType] = useState<RoomType>('Living Room');
  const [styleType, setStyleType] = useState<StyleType>('Modern');
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('Premium');
  const [colorPalette, setColorPalette] = useState<ColorPalette>('Earth Tones');
  const [lightingAmbiance, setLightingAmbiance] = useState<LightingAmbiance>('Natural');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [result, setResult] = useState<DesignHistoryItem | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [workspaceAssets, setWorkspaceAssets] = useState<GeneratedAsset[]>([]);
  const [activeTab, setActiveTab] = useState<'design' | 'assets'>('design');
  const [selectedAsset, setSelectedAsset] = useState<GeneratedAsset | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      const assets = await MockAPI.getAssets(user.id);
      setWorkspaceAssets(assets);
    };
    fetchAssets();
  }, [user.id]);

  const handleAssetImported = (asset: GeneratedAsset) => {
    setWorkspaceAssets(prev => [asset, ...prev]);
  };
  
  const steps: LoadingStep[] = [
    { label: 'ANALYZING ROOM GEOMETRY', sub: 'Mapping spatial anchors and depth planes...' },
    { label: 'NEURAL STYLE INTERPOLATION', sub: `Applying ${styleType} aesthetic manifold...` },
    { label: 'CALCULATING LUMINANCE', sub: `Simulating ${lightingAmbiance.toLowerCase()} ray-traced lighting...` },
    { label: 'SYNTHESIZING TEXTURES', sub: `Generating ${colorPalette.toLowerCase()} material surfaces...` },
    { label: 'FINALIZING VOLUMETRICS', sub: 'Refining high-fidelity architectural render...' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    // 1. Synchronous Image Selection
    const styleImages = MOCK_IMAGES[`${roomType}-${styleType}`] || MOCK_IMAGES['Living Room-Modern'];
    const randomImage = styleImages[Math.floor(Math.random() * styleImages.length)];
    
    const newItem: DesignHistoryItem = {
      id: Date.now().toString(),
      userId: user.id,
      roomType,
      styleType,
      beforeImage: uploadedImage!,
      afterImage: randomImage,
      timestamp: new Date().toLocaleString(),
      explanation: STYLE_DESCRIPTIONS[styleType]
    };

    // 2. Instant Result Display (with refinement state)
    setResult(newItem);
    setIsGenerating(true);
    setSliderPos(50);
    setLoadingProgress(0);

    // 3. Parallel AI Loading Steps (800-1200ms total)
    let stepIdx = 0;
    const totalSteps = steps.length;
    const stepDuration = 200; // 200ms * 5 steps = 1000ms total

    const interval = setInterval(() => {
      if (stepIdx < totalSteps) {
        setLoadingStep(steps[stepIdx].label);
        setLoadingProgress((prev) => Math.min(prev + (100 / totalSteps), 100));
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        // Save to history in background
        MockAPI.saveDesign(user.id, newItem);
      }
    }, stepDuration);
  };

  return (
    <div className="min-h-screen pt-12 pb-24 page-transition bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 reveal-up active border-l border-[var(--border)] pl-8 md:pl-16">
          <div className="flex items-center gap-6 mb-8">
            <span className="badge-premium">Spatial Studio v3.0</span>
            <div className="h-px flex-grow bg-[var(--border)]"></div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <h1 className="serif-font text-6xl md:text-8xl mb-8 tracking-tighter text-[var(--text-main)]">Neural <span className="text-[#D4AF37]">Synthesis.</span></h1>
              <p className="text-[var(--text-muted)] text-xl max-w-2xl font-light leading-relaxed">Initiate a high-fidelity architectural reconstruction by calibrating your aesthetic manifold and capturing your environment.</p>
            </div>
            <div className="flex gap-4 p-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
              <button 
                onClick={() => setActiveTab('design')}
                className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'design' ? 'bg-[#D4AF37] text-black shadow-xl' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              >
                Design Engine
              </button>
              <button 
                onClick={() => setActiveTab('assets')}
                className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'assets' ? 'bg-[#D4AF37] text-black shadow-xl' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              >
                Asset Lab
              </button>
            </div>
          </div>
        </header>

        {activeTab === 'design' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Controls Panel */}
            <div className="lg:col-span-4 space-y-10">
              <section className="p-12 rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
                
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-12">Calibration</h3>
                
                <div className="space-y-12">
                  <div>
                    <label className="block text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-5 text-[var(--text-main)]">Functional Category</label>
                    <div className="relative">
                      <select 
                        value={roomType} 
                        onChange={(e) => setRoomType(e.target.value as RoomType)}
                        className="w-full p-6 bg-[var(--input-bg)] border border-[var(--border)] rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold appearance-none cursor-pointer text-[var(--text-main)] text-xs uppercase tracking-widest"
                      >
                        {ROOM_TYPES.map(t => <option key={t} value={t} className="bg-[var(--card-bg)]">{t}</option>)}
                      </select>
                      <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 opacity-30 text-xs text-[var(--text-main)]"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-5 text-[var(--text-main)]">Aesthetic Manifold</label>
                    <div className="grid grid-cols-2 gap-3">
                      {STYLE_TYPES.map(s => (
                        <button
                          key={s}
                          onClick={() => setStyleType(s)}
                          className={`btn-interact btn-shimmer p-5 rounded-2xl border font-black text-[10px] transition-all uppercase tracking-widest ${styleType === s ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-xl' : 'bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[#D4AF37]/50 hover:text-[var(--text-main)]'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-5 text-[var(--text-main)]">Budget Allocation</label>
                    <div className="relative">
                      <select 
                        value={budgetLevel} 
                        onChange={(e) => setBudgetLevel(e.target.value as BudgetLevel)}
                        className="w-full p-6 bg-[var(--input-bg)] border border-[var(--border)] rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold appearance-none cursor-pointer text-[var(--text-main)] text-xs uppercase tracking-widest"
                      >
                        {BUDGET_LEVELS.map(b => <option key={b} value={b} className="bg-[var(--card-bg)]">{b}</option>)}
                      </select>
                      <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 opacity-30 text-xs text-[var(--text-main)]"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-5 text-[var(--text-main)]">Color Spectrum</label>
                    <div className="grid grid-cols-2 gap-3">
                      {COLOR_PALETTES.map(cp => (
                        <button
                          key={cp}
                          onClick={() => setColorPalette(cp)}
                          className={`btn-interact btn-shimmer p-5 rounded-2xl border font-black text-[10px] transition-all uppercase tracking-widest ${colorPalette === cp ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-xl' : 'bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[#D4AF37]/50 hover:text-[var(--text-main)]'}`}
                        >
                          {cp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mb-5 text-[var(--text-main)]">Luminance Profile</label>
                    <div className="relative">
                      <select 
                        value={lightingAmbiance} 
                        onChange={(e) => setLightingAmbiance(e.target.value as LightingAmbiance)}
                        className="w-full p-6 bg-[var(--input-bg)] border border-[var(--border)] rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold appearance-none cursor-pointer text-[var(--text-main)] text-xs uppercase tracking-widest"
                      >
                        {LIGHTING_AMBIANCES.map(l => <option key={l} value={l} className="bg-[var(--card-bg)]">{l}</option>)}
                      </select>
                      <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 opacity-30 text-xs text-[var(--text-main)]"></i>
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <CameraUpload onCapture={setUploadedImage} />
                    <input type="file" id="localUp" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    <label htmlFor="localUp" className="btn-interact w-full flex items-center justify-center gap-4 p-6 bg-[var(--input-bg)] border border-dashed border-[var(--border)] rounded-2xl cursor-pointer hover:border-[#D4AF37]/50 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)]">
                      <i className="fas fa-file-export"></i> Local Source
                    </label>
                  </div>
                </div>

                {uploadedImage && !isGenerating && !result && (
                  <button 
                    onClick={handleGenerate}
                    className="btn-luxe btn-interact btn-shimmer w-full mt-12 py-8 text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl hover:bg-[#D4AF37] transition-all transform hover:-translate-y-1"
                  >
                    Initiate Sequence
                  </button>
                )}
              </section>

              {/* Presets Grid */}
              <section className="p-12 rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)]">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-10">Rapid Presets</h3>
                <div className="grid grid-cols-2 gap-4">
                  {PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {setRoomType(p.room); setStyleType(p.style);}}
                      className="btn-interact flex items-center gap-4 p-5 rounded-2xl bg-[var(--input-bg)] hover:bg-[var(--bg)] border border-[var(--border)] hover:border-[#D4AF37]/30 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                        <i className={`fas ${p.icon} text-xs`}></i>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-main)]">{p.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Workspace Assets Library Preview */}
              {workspaceAssets.length > 0 && (
                <section className="p-12 rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-10">Workspace Assets</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {workspaceAssets.slice(0, 4).map((asset) => (
                      <div 
                        key={asset.id} 
                        className="group relative aspect-square rounded-3xl overflow-hidden border border-[var(--border)] cursor-pointer hover:border-[#D4AF37]/50 transition-all"
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <img src={asset.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={asset.name} referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-[8px] font-black text-white uppercase tracking-widest truncate">{asset.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {workspaceAssets.length > 4 && (
                    <button onClick={() => setActiveTab('assets')} className="w-full mt-8 py-4 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[#D4AF37] transition-all">
                      View All {workspaceAssets.length} Assets
                    </button>
                  )}
                </section>
              )}
            </div>

            {/* Viewport Area */}
            <div className="lg:col-span-8">
              {result ? (
                <div className="space-y-12 animate-fade-up relative">
                  {/* AI Refinement Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 z-[60] flex items-center justify-center rounded-[4rem] overflow-hidden">
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>
                      <div className="relative z-10 w-full h-full">
                        <LoadingIndicator 
                          currentStep={loadingStep} 
                          progress={loadingProgress} 
                          steps={steps} 
                          transparent
                        />
                      </div>
                    </div>
                  )}

                  {/* Enhanced Before/After Slider */}
                  <div className={`rounded-[4rem] shadow-[var(--shadow)] overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] relative group h-[800px] transition-all duration-1000 ${isGenerating ? 'scale-[0.98]' : 'scale-100'}`}>
                    {/* Before Image Layer */}
                    <img 
                      src={result.beforeImage} 
                      className="absolute inset-0 w-full h-full object-cover opacity-100" 
                      alt="Original Capture"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* After Image Layer (Clipped) */}
                    <div 
                      className="absolute inset-0 w-full h-full overflow-hidden border-r border-[#D4AF37] shadow-[20px_0_40px_rgba(212,175,55,0.1)] z-10"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img 
                        src={result.afterImage} 
                        className={`absolute inset-0 h-full object-cover transition-all duration-1000 ${isGenerating ? 'blur-xl scale-110 brightness-50' : 'blur-0 scale-100 brightness-100'}`} 
                        alt="Neural Synthesis"
                        referrerPolicy="no-referrer"
                        style={{ width: `calc(100% * 100 / ${Math.max(1, sliderPos)})` }}
                      />
                    </div>

                    {/* Slider Control Rail & Handle */}
                    <div 
                      className="absolute top-0 bottom-0 z-20 pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="h-full w-px bg-[#D4AF37] relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110">
                          <i className="fas fa-arrows-left-right text-[10px]"></i>
                        </div>
                      </div>
                    </div>

                    {/* Hidden range input covering the area for interaction */}
                    <input 
                      type="range" min="0" max="100" 
                      value={sliderPos} 
                      onChange={(e) => setSliderPos(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    />

                    {/* Overlay Labels */}
                    <div className={`absolute bottom-12 left-12 z-20 transition-opacity duration-300 ${sliderPos < 20 ? 'opacity-0' : 'opacity-100'}`}>
                      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Neural Synthesis</p>
                      </div>
                    </div>
                    <div className={`absolute bottom-12 right-12 z-20 transition-opacity duration-300 ${sliderPos > 80 ? 'opacity-0' : 'opacity-100'}`}>
                      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full text-right">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Source Capture</p>
                      </div>
                    </div>

                    {/* Dynamic Style Badge */}
                    <div className="absolute top-12 left-12 z-20">
                      <span className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] bg-[#D4AF37] text-black shadow-3xl">
                        {result.styleType} Manifold Active
                      </span>
                    </div>

                    <div className="absolute top-12 right-12 flex gap-4 z-30">
                      <button onClick={() => setIsInspectOpen(true)} className="btn-interact btn-shimmer bg-white/10 backdrop-blur-3xl text-white w-16 h-16 rounded-full border border-white/20 hover:bg-[#D4AF37] hover:text-black transition-all shadow-3xl flex items-center justify-center">
                        <i className="fas fa-expand-alt"></i>
                      </button>
                    </div>
                  </div>

                  {/* Synthesis Narrative Section */}
                  <div className="p-20 rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]/20"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20">
                      <h3 className="serif-font text-6xl text-[var(--text-main)]">Synthesis <span className="text-[#D4AF37]">Narrative.</span></h3>
                      <div className="px-10 py-3 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">
                        Latent ID #{result.id.slice(-6)}
                      </div>
                    </div>

                    <p className="text-[var(--text-muted)] text-3xl leading-relaxed italic mb-24 font-light border-l-4 border-[#D4AF37]/20 pl-16 max-w-4xl">
                      "{result.explanation.summary}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div className="space-y-16">
                        <div>
                          <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-10">Architectural Palette</p>
                          <div className="flex gap-6">
                            {result.explanation.palette.map(c => (
                              <div key={c} className="w-20 h-20 rounded-3xl shadow-2xl border border-[var(--border)] transition-transform hover:scale-110 cursor-help" style={{backgroundColor: c}} title={c}></div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-10">Luminance Strategy</p>
                          <p className="text-[var(--text-muted)] text-xl font-light leading-relaxed italic">"{result.explanation.lighting}"</p>
                        </div>
                      </div>

                      <div className="p-16 rounded-[4rem] bg-[var(--input-bg)] border border-[var(--border)] relative">
                        <div className="absolute top-8 right-8 text-[#D4AF37]/10 text-6xl font-serif">“</div>
                        <p className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-12">Curation Logic</p>
                        <div className="space-y-8">
                          {result.explanation.furniture.map((f, i) => (
                            <div key={i} className="flex items-center gap-8 text-[var(--text-muted)] text-xl font-light">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-24 pt-16 border-t border-[var(--border)] flex flex-wrap justify-center gap-12">
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = result.afterImage;
                          link.download = `LuxeSpace-${result.styleType}-${result.id}.png`;
                          link.click();
                        }}
                        className="btn-interact text-[10px] font-black uppercase tracking-[0.6em] text-[var(--text-main)] hover:text-[#D4AF37] transition-all flex items-center gap-3"
                      >
                        <i className="fas fa-download"></i> Export Render
                      </button>
                      <button 
                        onClick={() => {setResult(null); setUploadedImage(null);}} 
                        className="btn-interact text-[10px] font-black uppercase tracking-[0.6em] text-[var(--text-muted)] hover:text-red-500 transition-all flex items-center gap-3"
                      >
                        <i className="fas fa-refresh"></i> Reset Studio
                      </button>
                    </div>
                  </div>
                </div>
              ) : uploadedImage ? (
                <div className="relative h-[800px] rounded-[4rem] overflow-hidden shadow-[var(--shadow)] border border-[var(--card-border)] group">
                  <img src={uploadedImage} className="w-full h-full object-cover brightness-75" alt="Source" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="serif-font opacity-10 text-7xl md:text-9xl uppercase tracking-[0.4em] pointer-events-none text-[var(--text-main)]">Awaiting Synthesis</span>
                  </div>
                  <button onClick={() => setUploadedImage(null)} className="btn-interact absolute top-12 right-12 w-16 h-16 bg-red-500/80 backdrop-blur-3xl text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all shadow-3xl">
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
              ) : (
                <div className="h-[800px] rounded-[4rem] border-2 border-dashed border-[var(--border)] bg-[var(--card-bg)] flex flex-col items-center justify-center text-center p-20 group transition-all hover:border-[#D4AF37]/20 shadow-inner">
                  <div className="w-40 h-40 bg-[var(--input-bg)] rounded-full flex items-center justify-center text-7xl text-[var(--text-muted)] opacity-30 mb-16 transition-all group-hover:scale-110 group-hover:text-[#D4AF37] group-hover:opacity-100">
                    <i className="fas fa-camera-retro"></i>
                  </div>
                  <h2 className="serif-font text-5xl mb-8 tracking-tighter text-[var(--text-main)]">Studio Idle</h2>
                  <p className="text-[var(--text-muted)] max-w-lg leading-relaxed font-light text-2xl">The neural cores are primed. Provide a high-resolution spatial scan to begin the design synthesis.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-16 animate-fade-up">
            <AssetSynthesizer user={user} onAssetImported={handleAssetImported} />
            
            <section>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="serif-font text-5xl text-[var(--text-main)] mb-4">Workspace <span className="text-[#D4AF37]">Assets.</span></h3>
                  <p className="text-[var(--text-muted)] font-light">Your curated collection of synthesized architectural elements.</p>
                </div>
                <div className="px-8 py-3 rounded-full border border-[var(--border)] text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">
                  {workspaceAssets.length} Objects Synthesized
                </div>
              </div>

              {workspaceAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {workspaceAssets.map((asset) => (
                    <div key={asset.id} className="group p-6 rounded-[3rem] border border-[var(--border)] bg-[var(--card-bg)] hover:border-[#D4AF37]/30 transition-all shadow-xl">
                      <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 border border-[var(--border)] relative">
                        <img src={asset.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={asset.name} referrerPolicy="no-referrer" />
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fas fa-cube text-[10px]"></i>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-[var(--text-main)] mb-2 tracking-tight truncate">{asset.name}</h4>
                      <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-6 opacity-40">Synthesized {new Date(asset.timestamp).toLocaleDateString()}</p>
                      <button 
                        onClick={() => setSelectedAsset(asset)}
                        className="w-full py-4 rounded-2xl bg-[var(--input-bg)] text-[var(--text-muted)] text-[9px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-32 rounded-[4rem] border-2 border-dashed border-[var(--border)] bg-[var(--card-bg)] flex flex-col items-center justify-center text-center opacity-30">
                  <i className="fas fa-box-open text-6xl mb-8"></i>
                  <p className="text-xl font-light">Workspace vault is empty. Synthesize an asset to begin.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* Fullscreen Inspector */}
      {isInspectOpen && result && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-4xl flex items-center justify-center animate-in fade-in duration-500">
          <button onClick={() => setIsInspectOpen(false)} className="btn-interact absolute top-12 right-12 w-20 h-20 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all z-[1010] text-2xl shadow-4xl">
            <i className="fas fa-times"></i>
          </button>
          <img src={result.afterImage} className="max-h-[90vh] max-w-[95vw] object-contain shadow-4xl rounded-[3rem] border border-white/10" referrerPolicy="no-referrer" />
        </div>
      )}

      {/* Asset Inspector */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-4xl flex items-center justify-center animate-in fade-in duration-500 p-12">
          <button onClick={() => setSelectedAsset(null)} className="btn-interact absolute top-12 right-12 w-20 h-20 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all z-[1010] text-2xl shadow-4xl">
            <i className="fas fa-times"></i>
          </button>
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-4xl">
              <img src={selectedAsset.imageUrl} className="w-full h-full object-cover" alt={selectedAsset.name} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="space-y-10">
              <span className="badge-premium">3D Asset Synthesis</span>
              <h2 className="serif-font text-5xl text-white leading-tight">{selectedAsset.name}</h2>
              <p className="text-white/60 text-xl font-light leading-relaxed italic">"{selectedAsset.description}"</p>
              <div className="pt-8 flex flex-col gap-4">
                <button className="btn-luxe btn-interact w-full py-6 text-[10px] font-black uppercase tracking-[0.4em]">
                  Import to Scene
                </button>
                {selectedAsset.modelUrl ? (
                  <a 
                    href={selectedAsset.modelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-luxe btn-interact w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] text-center"
                  >
                    Download GLTF Model
                  </a>
                ) : (
                  <button disabled className="btn-secondary-luxe w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 cursor-not-allowed">
                    GLTF Model Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
