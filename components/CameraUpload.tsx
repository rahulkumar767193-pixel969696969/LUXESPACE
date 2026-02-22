
import React, { useState, useRef, useEffect } from 'react';

interface CameraUploadProps {
  onCapture: (img: string) => void;
}

const CameraUpload: React.FC<CameraUploadProps> = ({ onCapture }) => {
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support camera access.");
      return;
    }

    try {
      // Try with preferred constraints first
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (e) {
        console.warn("Retrying with simpler camera constraints...");
        // Fallback to basic video if complex constraints fail
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === 'NotAllowedError') {
        setError("Camera access was denied. Please enable camera permissions in your browser settings and try again.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera device was found on your system.");
      } else {
        setError(`Camera error: ${err.message || "Unable to access camera."}`);
      }
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      setIsFlashing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
      }

      setTimeout(() => setIsFlashing(false), 400);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
    setCapturedImage(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full">
      <button 
        onClick={startCamera} 
        className="btn-interact btn-shimmer w-full flex items-center justify-center gap-4 p-6 bg-[#D4AF37] text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-yellow-500 transition-all"
      >
        <i className="fas fa-camera"></i> Live Spatial Capture
      </button>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}

      {isActive && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl aspect-[16/9] bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] border-4 border-white/10 group">
            
            {/* Live Video Feed */}
            {!capturedImage && (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="camera-grid"></div>
                
                {/* Viewfinder Corners */}
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] opacity-60"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] opacity-60"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] opacity-60"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] opacity-60"></div>

                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                  Align Spatial Planes
                </div>
              </>
            )}

            {/* Captured Still Preview */}
            {capturedImage && (
              <img 
                src={capturedImage} 
                className="w-full h-full object-cover animate-in zoom-in-95 duration-500" 
                alt="Captured Preview" 
              />
            )}

            {/* Flash Effect Layer */}
            {isFlashing && <div className="absolute inset-0 camera-flash z-50"></div>}

            {/* Close Button */}
            <button 
              onClick={stopCamera} 
              className="absolute top-8 right-8 w-14 h-14 bg-black/40 backdrop-blur-3xl text-white rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 z-[60]"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="mt-12 flex items-center gap-10">
            {!capturedImage ? (
              <button 
                onClick={handleCapture}
                className="btn-interact w-24 h-24 bg-white rounded-full flex items-center justify-center border-[8px] border-neutral-800 shadow-4xl group active:scale-90 transition-all"
              >
                <div className="w-16 h-16 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-black"></div>
                </div>
              </button>
            ) : (
              <div className="flex gap-6 animate-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={handleRetake}
                  className="btn-interact px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <i className="fas fa-redo mr-3"></i> Retake
                </button>
                <button 
                  onClick={handleConfirm}
                  className="btn-interact px-12 py-5 bg-[#D4AF37] text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-2xl"
                >
                  <i className="fas fa-check mr-3"></i> Use Capture
                </button>
              </div>
            )}
          </div>
          
          <p className="mt-8 text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
            {!capturedImage ? "Environment Acquisition Mode" : "Review Spatial Capture"}
          </p>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default CameraUpload;
