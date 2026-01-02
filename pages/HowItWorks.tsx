
import React, { useState, useRef } from 'react';

const HowItWorks: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        // If there's a pending play promise, we wait for it before pausing to avoid interruption error
        if (playPromiseRef.current) {
          try {
            await playPromiseRef.current;
          } catch (e) {
            // Play was aborted, which is fine if we're pausing anyway
          } finally {
            playPromiseRef.current = null;
          }
        }
        videoRef.current.pause();
        // State update will happen via onPause event
      } else {
        try {
          const promise = videoRef.current.play();
          playPromiseRef.current = promise;
          await promise;
        } catch (error) {
          console.warn("Playback interrupted or failed:", error);
        } finally {
          playPromiseRef.current = null;
        }
        // State update will happen via onPlay event
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
            Traditional farming wastes water. We fixed it with precision engineering.
          </p>
        </div>
      </section>

      {/* Explainer Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900">Watch the System in Action</h2>
            <p className="text-slate-600 max-w-xl mx-auto">See how Agromic technology delivers resources directly to the roots, eliminating surface waste.</p>
          </div>

          <div className="relative group aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-stone-900 border border-stone-100">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover opacity-80"
              poster="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=2000"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              loop
              muted
              playsInline
              controls={!isPlaying} // Visible when not playing
            >
              <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27cf3402d4766595b1115b3c6311e318344391a&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlays - Annotations */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute top-1/4 left-10 md:left-20 animate-bounce">
                <div className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-emerald-400">
                  <span className="mr-2">💧</span> DIRECT ROOT SATURATION
                </div>
              </div>
              <div className="absolute bottom-1/3 right-10 md:right-32 animate-pulse">
                <div className="bg-blue-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-blue-400">
                  <span className="mr-2">📉</span> 90% REDUCED EVAPORATION
                </div>
              </div>
            </div>

            {/* Play Button Overlay - Only visible when paused and doesn't block native controls interaction area */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all cursor-pointer ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 z-20'}`}
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

            {/* Video Footer Label */}
            <div className={`absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="text-white">
                <h4 className="font-bold text-lg">Agromic Precision Demo</h4>
                <p className="text-sm text-stone-300">Showing: Sub-surface delivery mechanism</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 transition-all"
              >
                {isPlaying ? 'PAUSE VIDEO' : 'PLAY VIDEO'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-stone-100">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Precision Workflow</h2>
          <p className="text-slate-600">The journey from water source to healthy crop.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-emerald-100 -z-10"></div>
          
          {[
            {
              step: "01",
              title: "Source Filtration",
              desc: "Water enters our specialized filtration unit, removing debris and sand that could clog emitters."
            },
            {
              step: "02",
              title: "Nutrient Injection",
              desc: "Fertilizers are precisely mixed into the water stream, bypassing soil-fixation issues."
            },
            {
              step: "03",
              title: "Slow Release",
              desc: "Pressure-compensated emitters deliver a consistent flow to every single plant, regardless of elevation."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative group hover:border-emerald-500 transition-colors">
              <div className="text-5xl font-serif font-bold text-emerald-100 mb-6 group-hover:text-emerald-500 transition-colors">{item.step}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Saving Visualization */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-[3rem] p-10 md:p-20 text-white flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-serif font-bold">Why 10% water is enough?</h2>
              <p className="text-stone-400 text-lg">
                Flood irrigation requires filling the entire field. Most of that water never reaches the roots—it stays on the surface and evaporates.
              </p>
              <p className="text-stone-400 text-lg">
                Agromic systems only water the <span className="text-emerald-400 font-bold">Root Zone</span>. By keeping the rest of the field dry, we eliminate evaporation loss and stop weed seeds from germinating.
              </p>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-1 gap-6">
              <div className="bg-stone-800 p-6 rounded-2xl flex items-center justify-between">
                <span>Traditional (Flood)</span>
                <div className="w-2/3 h-4 bg-stone-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-blue-400"></div>
                </div>
                <span className="ml-4 font-bold">100%</span>
              </div>
              <div className="bg-stone-800 p-6 rounded-2xl flex items-center justify-between">
                <span>Agromic (Drip)</span>
                <div className="w-2/3 h-4 bg-stone-700 rounded-full overflow-hidden">
                  <div className="w-[10%] h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
                <span className="ml-4 font-bold text-emerald-400">10%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
