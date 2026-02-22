
import React from 'react';
import { LoadingStep } from '../types';

interface LoadingIndicatorProps {
  currentStep: string;
  progress: number;
  steps: LoadingStep[];
  transparent?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ currentStep, progress, steps, transparent }) => {
  const activeStep = steps.find(s => s.label === currentStep);

  return (
    <div className={`${transparent ? 'bg-transparent border-none shadow-none h-full w-full' : 'h-[750px] rounded-[4rem] border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)]'} flex flex-col items-center justify-center text-center p-20 relative overflow-hidden`}>
      {!transparent && <div className="scan-line"></div>}
      
      <div className="w-48 h-48 relative mb-20">
        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/10 animate-pulse"></div>
        <div className="absolute inset-3 rounded-full border-t-2 border-[#D4AF37] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37] text-5xl">
          <i className="fas fa-microchip animate-pulse"></i>
        </div>
      </div>

      <div className="w-full max-w-lg space-y-10">
        <div className="space-y-4">
          <h2 className="serif-font text-4xl tracking-tight text-[var(--text-main)] transition-all duration-500">
            {currentStep}
          </h2>
          <p className="text-[var(--text-muted)] text-xs font-mono tracking-widest uppercase h-4">
            {activeStep?.sub || 'Initializing latency manifolds...'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-1.5 w-full bg-[var(--input-bg)] rounded-full overflow-hidden border border-[var(--border)]">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-[#D4AF37] to-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
            <span>Signal Integrity</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="text-[8px] font-mono text-left space-y-1">
          <p>CORE_TEMP: 42°C</p>
          <p>NEURAL_LOAD: 88%</p>
          <p>LATENCY: 12ms</p>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="text-[8px] font-mono text-right space-y-1">
          <p>ENCRYPTION: AES-256</p>
          <p>PROTOCOL: LUXE-V4</p>
          <p>STATUS: OPERATIONAL</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
