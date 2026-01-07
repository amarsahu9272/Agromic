
import React, { useState } from 'react';

const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
}> = ({ src, alt, className = "", width = 1200 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const optimizedSrc = `${src.split('?')[0]}?auto=format&fit=crop&q=80&w=${width}`;

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-800 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 text-stone-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-80' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

// Schematic Icon Components
const FiltrationSchematic = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-500">
    <rect x="20" y="20" width="60" height="60" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
    <path d="M20 40H80M20 60H80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M40 50L60 50M50 40L50 60" stroke="currentColor" strokeWidth="2" />
    <circle cx="25" cy="30" r="2" fill="currentColor" className="animate-pulse" />
    <circle cx="75" cy="70" r="2" fill="currentColor" className="animate-pulse" />
  </svg>
);

const FertigationSchematic = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-500">
    <path d="M10 50H40M60 50H90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <rect x="40" y="35" width="20" height="30" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
    <path d="M50 20V35" stroke="currentColor" strokeWidth="2" />
    <path d="M45 20H55" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-ping" />
    <path d="M15 45L25 50L15 55" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const RootZoneSchematic = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-500">
    <path d="M20 30H80" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
    <path d="M50 30V60" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="70" r="5" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 60C40 70 40 80 50 90C60 80 60 70 50 60Z" fill="currentColor" className="animate-bounce" />
    <path d="M30 40C25 50 25 60 30 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M70 40C75 50 75 60 70 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
  </svg>
);

const HowItWorks: React.FC = () => {
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

      {/* Primary Technical Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold font-serif text-slate-900">System Architecture Overview</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Agromic technology delivers resources directly to the root zone, eliminating surface evaporation and nutrient leaching.</p>
          </div>

          <div className="relative group aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-stone-200">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0" 
              alt="High precision irrigation technical view" 
              className="w-full h-full group-hover:scale-105 transition-transform duration-1000"
              width={2000}
            />
            
            <div className="absolute inset-0 z-10 pointer-events-none">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-white font-bold text-xl">Precision Field Matrix</p>
                  <p className="text-stone-300 text-sm">Industrial Deployment - Sector A4</p>
                </div>
                <div className="text-emerald-400 font-mono text-sm font-bold">LIVE SYSTEM READY</div>
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
              desc: "Debris removal ensures zero-clog delivery, extending system lifespan and ensuring uniform water pressure across the entire grid.",
              icon: <FiltrationSchematic />
            },
            {
              step: "02",
              title: "Venturi Fertigation",
              desc: "Soluble fertilizers are precisely injected into the water stream, bypassing soil fixation and saving up to 80% on chemical costs.",
              icon: <FertigationSchematic />
            },
            {
              step: "03",
              title: "Root-Zone Release",
              desc: "Engineered emitters release moisture directly where it's needed, eliminating evaporation and inhibiting surface weed growth.",
              icon: <RootZoneSchematic />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative group hover:border-emerald-500 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-between items-start">
                {item.icon}
                <div className="text-4xl font-serif font-bold text-stone-100 group-hover:text-emerald-100 transition-colors">{item.step}</div>
              </div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
