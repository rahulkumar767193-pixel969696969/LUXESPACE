
import React, { useState } from 'react';
import { User, GeneratedAsset } from '../types';
import { GoogleGenAI } from "@google/genai";
import { MockAPI } from '../api';

interface AssetSynthesizerProps {
  user: User;
  onAssetImported?: (asset: GeneratedAsset) => void;
}

const AssetSynthesizer: React.FC<AssetSynthesizerProps> = ({ user, onAssetImported }) => {
  const [prompt, setPrompt] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedModelUrl, setGeneratedModelUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    if (!prompt.trim()) return;
    setIsSynthesizing(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedModelUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A high-quality, professional 3D model render of a furniture item: ${prompt}. Studio lighting, isolated on a clean neutral background, architectural visualization style, 8k resolution.` }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
        // Simulate a model URL for demonstration if requested or if we had a real 3D gen model
        setGeneratedModelUrl(`https://example.com/models/${Date.now()}.glb`);
      } else {
        throw new Error("No image data received from neural core.");
      }
    } catch (err) {
      console.error("Synthesis error:", err);
      setError("Neural synthesis interrupted. Please refine your prompt and retry.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleImport = async () => {
    if (!generatedImage) return;

    const newAsset: GeneratedAsset = {
      id: Date.now().toString(),
      name: prompt.split(' ').slice(0, 3).join(' '),
      description: prompt,
      imageUrl: generatedImage,
      modelUrl: generatedModelUrl || undefined,
      timestamp: new Date().toISOString()
    };

    await MockAPI.saveAsset(user.id, newAsset);
    if (onAssetImported) onAssetImported(newAsset);
    setGeneratedImage(null);
    setGeneratedModelUrl(null);
    setPrompt('');
  };

  return (
    <div className="p-12 rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Asset Lab Active</span>
        </div>
      </div>

      <h3 className="serif-font text-4xl text-[var(--text-main)] mb-8">3D Asset <span className="text-[#D4AF37]">Synthesis.</span></h3>
      <p className="text-[var(--text-muted)] text-lg font-light mb-12 max-w-xl">Describe a bespoke furniture piece or decorative object. Our neural engine will synthesize a high-fidelity 3D representation for your workspace.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Asset Description</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A minimalist velvet armchair in deep emerald with brushed brass legs..."
              className="w-full p-8 bg-[var(--input-bg)] border border-[var(--border)] rounded-[2.5rem] outline-none focus:border-[#D4AF37] transition-all text-[var(--text-main)] text-lg font-light leading-relaxed resize-none h-48"
            />
          </div>

          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing || !prompt.trim()}
            className="btn-luxe btn-interact btn-shimmer w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] disabled:opacity-30"
          >
            {isSynthesizing ? (
              <span className="flex items-center gap-3">
                <i className="fas fa-atom animate-spin"></i> Synthesizing...
              </span>
            ) : (
              'Initiate Synthesis'
            )}
          </button>

          {error && (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-medium">
              <i className="fas fa-exclamation-triangle mr-2"></i> {error}
            </div>
          )}
        </div>

        <div className="relative aspect-square rounded-[3rem] border border-[var(--border)] bg-[var(--bg)] overflow-hidden flex items-center justify-center group">
          {generatedImage ? (
            <>
              <img src={generatedImage} className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" alt="Generated Asset" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                <button 
                  onClick={handleImport}
                  className="btn-luxe btn-interact px-10 py-4 text-[10px] font-black uppercase tracking-widest"
                >
                  Import to Workspace
                </button>
                {generatedModelUrl && (
                  <a 
                    href={generatedModelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-luxe btn-interact px-10 py-4 text-[10px] font-black uppercase tracking-widest text-center"
                  >
                    Download Model
                  </a>
                )}
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10">
                  <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Neural Render v1.0</span>
                </div>
                <button onClick={() => setGeneratedImage(null)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-red-500 transition-all">
                  <i className="fas fa-trash-alt text-xs"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-12 space-y-6 opacity-20">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-[var(--text-muted)] flex items-center justify-center text-4xl">
                <i className="fas fa-cube"></i>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.3em]">Awaiting Signal</p>
            </div>
          )}
          
          {/* Scanning Line Effect during synthesis */}
          {isSynthesizing && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scan-line"></div>
              <div className="absolute inset-0 bg-[#D4AF37]/5 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetSynthesizer;
