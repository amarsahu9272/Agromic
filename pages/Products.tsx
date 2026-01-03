
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Utility to generate optimized Unsplash URLs.
 */
const getUnsplashUrl = (url: string, width: number, quality = 80) => {
  try {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
  } catch (e) {
    return url;
  }
};

/**
 * Optimized Image Component
 */
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  aspectRatio?: string;
}> = ({ src, alt, className = "", loading = "lazy", width = 1200, aspectRatio = "aspect-video" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const optimizedSrc = useMemo(() => getUnsplashUrl(src, width), [src, width]);

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectRatio} ${className}`}>
      {!hasError && (
        <div className={`absolute inset-0 transition-opacity duration-700 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-full h-full bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 bg-[length:400%_100%] animate-shimmer"></div>
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-300">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />
      )}
    </div>
  );
};

interface ProductGalleryProps {
  images: string[];
  name: string;
  technicalOverlays?: { label: string; value: string }[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name, technicalOverlays }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.5 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col h-full group/gallery">
      <div className="relative flex-grow min-h-[400px] lg:min-h-[500px] overflow-hidden bg-stone-950 rounded-t-[2.5rem] lg:rounded-tr-none lg:rounded-l-[2.5rem]">
        {images.map((img, idx) => (
          <div
            key={`${img}-${idx}`}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
          >
            <div className="w-full h-full cursor-zoom-in relative" onClick={() => setIsZoomed(true)}>
              <OptimizedImage src={img} alt={`${name} view ${idx + 1}`} className="w-full h-full" aspectRatio="h-full" width={1400} loading="lazy" />
              
              {/* Technical HUD Overlay on Image */}
              {technicalOverlays && isVisible && idx === currentIndex && (
                <div className="absolute bottom-6 left-6 right-6 z-30 grid grid-cols-2 gap-3 transition-all duration-700 pointer-events-none">
                  {technicalOverlays.slice(0, 2).map((stat, sIdx) => (
                    <div key={sIdx} className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col shadow-2xl">
                      <span className="text-[8px] text-white/50 uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between z-40 opacity-0 group-hover/gallery:opacity-100 transition-all pointer-events-none">
           <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p - 1 + images.length) % images.length); }} className="bg-white/95 backdrop-blur-md text-emerald-900 p-4 rounded-full hover:bg-emerald-600 hover:text-white transition-all pointer-events-auto shadow-2xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % images.length); }} className="bg-white/95 backdrop-blur-md text-emerald-900 p-4 rounded-full hover:bg-emerald-600 hover:text-white transition-all pointer-events-auto shadow-2xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>

        {/* Badge */}
        <div className="absolute top-6 left-6 z-30 flex flex-col gap-2 pointer-events-none">
          <div className="bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center shadow-2xl">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            System Visual
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="bg-white p-4 flex justify-center space-x-3 border-t border-stone-200 overflow-x-auto no-scrollbar rounded-b-[2.5rem] lg:rounded-br-none lg:rounded-bl-[2.5rem]">
        {images.map((img, idx) => (
          <button key={`${img}-thumb-${idx}`} onClick={() => setCurrentIndex(idx)} className={`w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 transition-all border-2 relative ${idx === currentIndex ? 'border-emerald-500 scale-110 shadow-md' : 'border-stone-100 opacity-50'}`}>
            <OptimizedImage src={img} alt="thumbnail" width={100} aspectRatio="aspect-square" />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
          <div className="max-w-7xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img src={getUnsplashUrl(images[currentIndex], 2000)} alt="zoom" className="max-w-full max-h-full rounded-[2.5rem] object-contain shadow-2xl" />
          </div>
          <button className="absolute top-8 right-8 text-white hover:text-emerald-400 transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

const Products: React.FC = () => {
  const products = [
    {
      id: 'drip',
      name: 'Industrial Drip Irrigation',
      description: 'Surgical-precision hydration that eliminates surface waste. Our system is engineered for consistent sub-surface moisture delivery, ensuring your crops receive exactly what they need at the root level. Optimized for diverse climates from arid plains to humid riverbeds.',
      images: [
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b', 
        'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d',
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0'
      ],
      techStats: [
        { label: "Water Conservation", value: "92.4% Efficient" },
        { label: "Uniformity (CU)", value: "98.8%" },
        { label: "Operating Range", value: "1.0 - 4.5 Bar" },
        { label: "Durability", value: "12+ Year Lifecycle" }
      ]
    },
    {
      id: 'sprinkler',
      name: 'Precision Mini Sprinklers',
      description: 'Mimic natural rainfall for delicate crops. Our mini sprinklers are designed for micro-climate management and frost protection, providing gentle, uniform coverage over large areas. Engineered resin ensures zero corrosion and consistent spray patterns.',
      images: [
        'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7', 
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc',
        'https://images.unsplash.com/photo-1589923188900-85dae523342b'
      ],
      techStats: [
        { label: "Wetted Radius", value: "7.0 - 10.5m" },
        { label: "Max Flow Rate", value: "42 LPH" },
        { label: "Mist Particle", value: "Adjustable 50-200µ" },
        { label: "Resistance", value: "UV Protected" }
      ]
    },
    {
      id: 'hub',
      name: 'Smart Fertigation Hubs',
      description: 'The centralized brain of modern farming. This hub automates nutrient injection, ensuring that every drop of water is perfectly balanced with the required minerals for peak crop growth. IoT enabled for remote monitoring and scheduling.',
      images: [
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff', 
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837'
      ],
      techStats: [
        { label: "Chemical Savings", value: "85% Reduction" },
        { label: "Precision Link", value: "±0.1% Ratio" },
        { label: "Automation", value: "Cloud Managed" },
        { label: "Scalability", value: "Up to 32 Zones" }
      ]
    }
  ];

  return (
    <div className="pb-32 bg-stone-50">
      <section className="bg-emerald-900 text-white pt-32 pb-48 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <h1 className="text-6xl font-bold font-serif tracking-tight text-white">Engineering Portfolio</h1>
          <p className="text-emerald-100 max-w-xl mx-auto font-light text-xl">Explore our industrial-grade agricultural solutions through detailed technical documentation.</p>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_2px,transparent_2px)] [background-size:40px_40px]"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 space-y-32">
        {products.map((product, idx) => (
          <div key={product.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-[3rem] shadow-2xl border border-stone-100 overflow-visible relative group/card transition-all hover:shadow-emerald-500/5`}>
            <div className="lg:w-1/2 h-[500px] lg:h-auto shrink-0 lg:sticky lg:top-24 lg:self-start z-10">
              <ProductGallery 
                images={product.images} 
                name={product.name} 
                technicalOverlays={product.techStats}
              />
            </div>

            <div className="lg:w-1/2 p-8 lg:p-16 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="w-12 h-0.5 bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">Precision Hardware</span>
                </div>
                <h2 className="text-5xl font-bold font-serif text-slate-900 leading-[1.1]">{product.name}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {product.techStats.map((stat, sIdx) => (
                  <div key={sIdx} className="border-l-2 border-stone-100 pl-6 space-y-1 group/stat">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover/stat:text-emerald-500 transition-colors">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
                <Link to="/contact" className="w-full bg-slate-900 text-white px-10 py-5 rounded-[2.5rem] font-bold hover:bg-emerald-600 transition-all shadow-xl text-center flex items-center justify-center group">
                  Download Full Technical Specs
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style>{`
        @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Products;
