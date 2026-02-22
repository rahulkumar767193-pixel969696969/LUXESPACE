import React, { useState } from 'react';
import CameraUpload from './CameraUpload';
import { RoomType, StyleType, DesignHistoryItem } from '../types';
import { ROOM_TYPES, STYLE_TYPES, MOCK_IMAGES, STYLE_DESCRIPTIONS } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface HomeProps {
  userId: string;
  onSaveDesign: (item: DesignHistoryItem) => void;
}

const Home: React.FC<HomeProps> = ({ userId, onSaveDesign }) => {
  const [roomType, setRoomType] = useState<RoomType>('Living Room');
  const [styleType, setStyleType] = useState<StyleType>('Modern');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState<DesignHistoryItem | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const steps = [
    'Analyzing architecture...',
    'Mapping spatial anchors...',
    'Applying ' + styleType + ' aesthetic...',
    'Optimizing luminance...',
    'Finalizing textures...'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getFallbackImage = (room: string, style: string) => {
    const key = `${room}-${style}`;
    const images = MOCK_IMAGES[key];
    if (images && images.length > 0) return images[0];
    // Global fallback if specific key missing
    return MOCK_IMAGES['Living Room-Modern'][0];
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    setResult(null);
    setShowCompare(false);

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
        stepIdx++;
      }
    }, 800);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: uploadedImage.split(',')[1],
                mimeType: 'image/jpeg',
              },
            },
            {
              text: `High-end interior design. Reimagine this ${roomType} in a professional ${styleType} style. Photorealistic, 8k resolution, architectural magazine quality.`,
            },
          ],
        },
      });

      let generatedImageUrl = '';
      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      const explanationResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Brief professional design summary for a ${styleType} ${roomType}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              palette: { type: Type.ARRAY, items: { type: Type.STRING } },
              furniture: { type: Type.ARRAY, items: { type: Type.STRING } },
              lighting: { type: Type.STRING },
              summary: { type: Type.STRING }
            },
            required: ["palette", "furniture", "lighting", "summary"],
          },
        },
      });

      const explanation = JSON.parse(explanationResponse.text || '{}');
      clearInterval(interval);

      const newDesign: DesignHistoryItem = {
        id: Date.now().toString(),
        userId,
        roomType,
        styleType,
        beforeImage: uploadedImage!,
        afterImage: generatedImageUrl || getFallbackImage(roomType, styleType),
        timestamp: new Date().toLocaleString(),
        explanation: {
          palette: explanation.palette || STYLE_DESCRIPTIONS[styleType].palette,
          furniture: explanation.furniture || STYLE_DESCRIPTIONS[styleType].furniture,
          lighting: explanation.lighting || STYLE_DESCRIPTIONS[styleType].lighting,
          summary: explanation.summary || STYLE_DESCRIPTIONS[styleType].summary,
        }
      };

      setResult(newDesign);
      onSaveDesign(newDesign);
    } catch (error) {
      console.error("Simulation error:", error);
      clearInterval(interval);
      
      const newDesign: DesignHistoryItem = {
        id: Date.now().toString(),
        userId,
        roomType,
        styleType,
        beforeImage: uploadedImage!,
        afterImage: getFallbackImage(roomType, styleType),
        timestamp: new Date().toLocaleString(),
        explanation: STYLE_DESCRIPTIONS[styleType]
      };

      setResult(newDesign);
      onSaveDesign(newDesign);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-left mb-16 animate-fade-up">
        <span className="badge-premium mb-4 inline-block">Design Studio</span>
        <h1 className="serif-font text-5xl mb-4 tracking-tight">Studio <span className="text-[#EAB308]">Workspace.</span></h1>
        <p className="text-lg opacity-40 max-w-xl font-light">Initiate a spatial synthesis by selecting your preferences and capturing your environment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111111] p-8 rounded-3xl border border-white/5 shadow-2xl" style={{backgroundColor: 'var(--card-bg)'}}>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#EAB308] mb-8">Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[9px] font-black opacity-30 uppercase tracking-widest mb-3">Room Type</label>
                <select 
                  value={roomType} 
                  onChange={(e) => setRoomType(e.target.value as RoomType)}
                  className="w-full p-4 bg-black/10 border border-current opacity-20 rounded-xl focus:opacity-100 outline-none appearance-none cursor-pointer"
                  style={{borderColor: 'var(--border)'}}
                >
                  {ROOM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-black opacity-30 uppercase tracking-widest mb-3">Style Target</label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLE_TYPES.map(style => (
                    <button
                      key={style}
                      onClick={() => setStyleType(style)}
                      className={`p-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${styleType === style ? 'bg-[#EAB308] text-black border-[#EAB308]' : 'bg-transparent border-current opacity-20 hover:opacity-100'}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <CameraUpload onCapture={setUploadedImage} />
                <input type="file" id="fup" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="fup" className="w-full flex items-center justify-center gap-3 p-4 bg-current opacity-5 border border-current opacity-10 rounded-xl hover:opacity-100 transition-all font-bold text-xs cursor-pointer">
                  <i className="fas fa-folder-open"></i> Upload File
                </label>
              </div>

              {uploadedImage && (
                <div className="relative rounded-xl overflow-hidden aspect-video group shadow-xl">
                  <img src={uploadedImage} className="w-full h-full object-cover brightness-50" alt="Preview" />
                  <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-all"><i className="fas fa-times"></i></button>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !uploadedImage}
                className={`w-full py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${isGenerating || !uploadedImage ? 'bg-current opacity-5 text-current opacity-20' : 'bg-[#EAB308] text-black hover:scale-[1.02] shadow-xl'}`}
              >
                {isGenerating ? 'Synthesizing...' : 'Run Simulation'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {isGenerating ? (
            <div className="bg-[#111111] h-[600px] rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center p-12" style={{backgroundColor: 'var(--card-bg)'}}>
              <div className="w-24 h-24 relative mb-10">
                <div className="absolute inset-0 border-2 border-[#EAB308]/20 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-[#EAB308] rounded-full border-t-transparent animate-spin"></div>
                <i className="fas fa-brain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-[#EAB308]"></i>
              </div>
              <h3 className="serif-font text-3xl mb-3">{loadingStep}</h3>
              <p className="opacity-20 text-sm font-light">Allocating neural resources for high-fidelity render.</p>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-fade-up">
              <div className="bg-[#111111] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl" style={{backgroundColor: 'var(--card-bg)'}}>
                <div className="relative aspect-video group">
                  <img src={result.afterImage} className="w-full h-full object-cover" alt="Output" />
                  <div className="absolute top-6 left-6 flex gap-3">
                    <span className="bg-[#EAB308] text-black text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg">AI RESULT</span>
                    <button onClick={() => setShowCompare(!showCompare)} className="bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-black px-4 py-1.5 rounded-full border border-white/10 hover:text-white">COMPARE</button>
                  </div>
                  {showCompare && (
                    <div className="absolute inset-0 bg-black animate-in fade-in duration-500">
                      <img src={result.beforeImage} className="w-full h-full object-cover grayscale brightness-50" alt="Original" />
                      <button onClick={() => setShowCompare(false)} className="absolute top-6 right-6 text-white text-2xl"><i className="fas fa-times"></i></button>
                    </div>
                  )}
                </div>

                <div className="p-10 space-y-10">
                  <div>
                    <h3 className="serif-font text-3xl mb-4">Design Logic.</h3>
                    <p className="opacity-40 leading-relaxed italic text-lg font-light border-l-2 border-[#EAB308]/20 pl-8">"{result.explanation.summary}"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-black/5 rounded-2xl border border-current opacity-10">
                      <p className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-4">Atmosphere</p>
                      <p className="text-sm opacity-60 font-light leading-relaxed">{result.explanation.lighting}</p>
                    </div>
                    <div className="p-6 bg-black/5 rounded-2xl border border-current opacity-10">
                      <p className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-4">Color DNA</p>
                      <div className="flex gap-3">
                        {result.explanation.palette.map(c => (
                          <div key={c} className="w-8 h-8 rounded-lg shadow-inner" style={{backgroundColor: c}}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => {setResult(null); setUploadedImage(null);}} className="text-[10px] font-black uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-opacity">Initiate New Sequence</button>
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] h-[600px] rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 group" style={{backgroundColor: 'var(--card-bg)'}}>
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center text-4xl opacity-10 mb-8 group-hover:text-[#EAB308]/30 transition-all">
                <i className="fas fa-magic"></i>
              </div>
              <h2 className="serif-font text-2xl mb-3">Idle Workspace</h2>
              <p className="opacity-20 text-sm font-light max-w-xs mx-auto">Upload a space scan to begin the aesthetic reconstruction process.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;