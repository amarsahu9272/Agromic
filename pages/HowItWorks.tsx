
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const HowItWorks: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const loadingMessages = [
    "Analyzing soil topography...",
    "Designing precise lateral network...",
    "Simulating hydraulic pressure distribution...",
    "Calculating nutrient injection efficiency...",
    "Rendering water-efficient environment...",
    "Finalizing cinematic demonstration..."
  ];

  useEffect(() => {
    let interval: number;
    if (isGenerating) {
      interval = window.setInterval(() => {
        setGenerationStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerateSimulation = async () => {
    try {
      // 1. Handle API Key Selection
      if (!(await window.aistudio.hasSelectedApiKey())) {
        await window.aistudio.openSelectKey();
        // Proceeding as per race condition mitigation guidelines
      }

      setIsGenerating(true);
      setGeneratedVideoUrl(null);

      // 2. Initialize GenAI for Video Generation
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = "A cinematic 3D simulation of a dry agricultural field being transformed into a lush green orchard with Agromic drip irrigation lines precisely delivering water and liquid fertilizer to the roots, showing vibrant growth and water conservation.";

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // 3. Polling the operation
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGeneratedVideoUrl(url);
      }
    } catch (error: any) {
      console.error("Generation failed:", error);
      if (error.message?.includes("Requested entity was not found")) {
        await window.aistudio.openSelectKey();
      } else {
        alert("Video generation is currently busy. Please try again in a few minutes.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        if (playPromiseRef.current) {
          try { await playPromiseRef.current; } catch (e) {}
          finally { playPromiseRef.current = null; }
        }
        videoRef.current.pause();
      } else {
        try {
          const promise = videoRef.current.play();
          playPromiseRef.current = promise;
          await promise;
        } catch (error) {
          console.warn("Playback interrupted:", error);
        } finally {
          playPromiseRef.current = null;
        }
      }
    }
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-stone-50 py-20 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-5xl font-bold font-serif text-slate-900">The Science of Efficiency</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Traditional farming wastes water and nutrients. We fixed it with precision engineering.
          </p>
        </div>
      </section>

      {/* Primary Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900">Integrated Savings Demonstration</h2>
            <p className="text-slate-600 max-w-xl mx-auto">See how Agromic technology delivers resources directly to the roots, eliminating surface waste and nutrient leaching.</p>
          </div>

          <div className="relative group aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-stone-900 border border-stone-100">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950 z-50 p-8 text-center">
                <div className="w-24 h-24 relative mb-8">
                  <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-4 bg-emerald-500/10 rounded-full animate-pulse flex items-center justify-center text-2xl">🌱</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Generating Custom Simulation</h3>
                <p className="text-emerald-300 font-mono text-sm tracking-widest uppercase">{loadingMessages[generationStep]}</p>
                <p className="text-emerald-500/60 text-[10px] mt-12 max-w-xs leading-relaxed uppercase tracking-tighter">
                  This process uses Veo 3.1 AI. High-quality video synthesis may take 2-3 minutes.
                </p>
              </div>
            ) : generatedVideoUrl ? (
              <video 
                src={generatedVideoUrl}
                className="w-full h-full object-cover"
                autoPlay
                controls
                loop
              />
            ) : (
              <video 
                ref={videoRef}
                className="w-full h-full object-cover opacity-80"
                poster="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=2000"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
                playsInline
                controls={!isPlaying}
              >
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27cf3402d4766595b1115b3c6311e318344391a&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Video Overlays */}
            {!isGenerating && !generatedVideoUrl && (
              <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-[15%] left-10 md:left-20 animate-bounce">
                  <div className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-xl border border-emerald-400 flex items-center">
                    <span className="mr-2">💧</span> 90% WATER CONSERVATION
                  </div>
                </div>
                <div className="absolute bottom-[25%] right-10 md:right-32 animate-pulse">
                  <div className="bg-amber-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-xl border border-amber-400 flex items-center">
                    <span className="mr-2">🧪</span> 80% FERTILIZER EFFICIENCY
                  </div>
                </div>
              </div>
            )}

            {/* Custom Simulation Prompt Toggle */}
            {!isPlaying && !isGenerating && !generatedVideoUrl && (
              <div className="absolute top-8 left-8 z-30">
                <button 
                  onClick={handleGenerateSimulation}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl hover:bg-emerald-500 transition-all flex items-center group ring-4 ring-emerald-500/20"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Generate AI Simulation
                </button>
              </div>
            )}

            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all cursor-pointer ${isPlaying || isGenerating || generatedVideoUrl ? 'opacity-0 pointer-events-none' : 'opacity-100 z-20'}`}
              onClick={togglePlay}
            >
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-2xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-stone-100">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Precision Savings Workflow</h2>
          <p className="text-slate-600">The journey from water source to high-yield nutrient delivery.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-emerald-100 -z-10"></div>
          
          {[
            {
              step: "01",
              title: "Smart Filtration",
              desc: "Debris removal ensures zero-clog delivery, extending system lifespan and ensuring uniform water pressure."
            },
            {
              step: "02",
              title: "Ventury Fertigation",
              desc: "Soluble fertilizers are injected into the water stream, bypassing soil fixation and saving 80% on chemicals."
            },
            {
              step: "03",
              title: "Sub-surface Release",
              desc: "Emitters release small pulses directly to roots, eliminating evaporation and surface weed germination."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative group hover:border-emerald-500 transition-colors">
              <div className="text-5xl font-serif font-bold text-emerald-100 mb-6 group-hover:text-emerald-500 transition-colors">{item.step}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Analytics */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-[3rem] p-10 md:p-20 text-white flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-serif font-bold">The Nutrient Efficiency Gap</h2>
              <p className="text-stone-400 text-lg">
                Flood irrigation washes fertilizer away into the water table. Most nutrients never nourish the plant—they become environmental pollutants.
              </p>
              <p className="text-stone-400 text-lg">
                Agromic's <span className="text-emerald-400 font-bold">Precision Fertigation</span> feeds the crop exactly what it needs, when it needs it. By reducing chemical runoff, we protect local biodiversity while increasing farm profitability.
              </p>
            </div>
            <div className="lg:w-1/2 w-full space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
                  <span>Traditional Fertilizer Waste</span>
                  <span className="text-amber-500">80% Loss</span>
                </div>
                <div className="h-4 bg-stone-800 rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-amber-600/50"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-500">
                  <span>Agromic Nutrient Uptake</span>
                  <span className="text-emerald-400">95% Efficiency</span>
                </div>
                <div className="h-4 bg-stone-800 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                </div>
              </div>
              <div className="pt-8 border-t border-stone-800">
                <p className="text-[10px] text-stone-500 uppercase tracking-widest leading-loose">
                  *AISTUDIO selected API keys are required for custom video generation features. Link to billing: <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-emerald-400">ai.google.dev/gemini-api/docs/billing</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
