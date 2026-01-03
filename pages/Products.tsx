
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
 * Optimized Image Component with Error Fallback
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
      {/* Loading Shimmer */}
      {!hasError && (
        <div 
          className={`absolute inset-0 transition-opacity duration-700 z-10 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-full h-full bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 bg-[length:400%_100%] animate-shimmer"></div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
          <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={optimizedSrc}
          alt={alt}
          loading={loading}
          decoding={loading === 'eager' ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

interface ProductGalleryProps {
  images: string[];
  name: string;
  isFirstProduct: boolean;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name, isFirstProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => modalCloseBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isZoomed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
      if (isZoomed) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, nextImage, prevImage]);

  return (
    <div className="flex flex-col h-full">
      <div 
        className="relative flex-grow min-h-[400px] lg:min-h-[500px] group overflow-hidden bg-stone-100 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]"
        role="region" 
        aria-label={`${name} gallery`}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-zoom-in ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
            onClick={() => setIsZoomed(true)}
            role="button"
            aria-label={`Zoom in on image ${idx + 1}`}
            tabIndex={idx === currentIndex ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsZoomed(true);
              }
            }}
          >
            <OptimizedImage
              src={img}
              alt={`${name} view ${idx + 1}`}
              className="w-full h-full"
              aspectRatio="h-full" 
              width={idx === currentIndex ? 1400 : 600} 
              loading={(isFirstProduct && idx === 0) ? "eager" : "lazy"}
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute inset-x-4 bottom-4 flex justify-between z-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
           <button 
             onClick={(e) => { e.stopPropagation(); prevImage(); }} 
             className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
             aria-label="Previous image"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); nextImage(); }} 
             className="bg-white/90 p-3 rounded-full shadow-lg hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
             aria-label="Next image"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>
      </div>

      <div 
        className="bg-stone-50 p-4 flex justify-center space-x-2 border-t border-stone-200 overflow-x-auto no-scrollbar rounded-b-[2rem] lg:rounded-br-none lg:rounded-bl-[2rem]"
        role="tablist"
        aria-label="Gallery thumbnails"
      >
        {images.map((img, idx) => (
          <button 
            key={idx} 
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`View image ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)} 
            className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all border-2 ${
              idx === currentIndex ? 'border-emerald-500 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <OptimizedImage src={img} alt={`thumbnail ${idx + 1}`} width={150} aspectRatio="aspect-square" loading="lazy" />
          </button>
        ))}
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" 
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image view"
        >
          <button 
            ref={modalCloseBtnRef}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full z-[210] hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close zoom view"
            onClick={() => setIsZoomed(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <img 
              src={getUnsplashUrl(images[currentIndex], 2000)} 
              alt={`${name} zoom view`}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-500" 
            />
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-emerald-600 text-white p-4 rounded-full transition-all hidden md:block focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-emerald-600 text-white p-4 rounded-full transition-all hidden md:block focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block text-center w-full">
              Use ARROWS to Navigate • ESC to Close • Click outside to exit
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Products: React.FC = () => {
  const products = [
    {
      id: 'drip',
      name: 'Advanced Drip Irrigation Systems',
      description: 'The global standard for surgical-precision hydration. Our system targets the root zone directly, reducing evaporation by 90% while ensuring uniform nutrient delivery across varying elevations.',
      gallery: [
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b', // Main Field Overview
        'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d', // Close-up of Emitters/Watering
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea', // Filtration & Pump Control Unit
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0', // Overhead infrastructure
        'https://images.unsplash.com/photo-1590682680395-03ad7e0b7681'  // Installation details
      ],
      mainComponents: [
        'Ventury with manifold 2" x 3/4"',
        '2" Screen Filter (Plastic) 20 M³/HR',
        'Air Release Valve 1"',
        'Pressure Gauge'
      ],
      distributionSystem: [
        'PVC Pipe IS:4985-63 mm x 4Kg/cm2 Class-II 63 MM',
        'PVC Pipes 50mm x 6kg/cm2',
        'Inline Lateral Round Class-2 (4LPH) 12 MM 40 CM',
        'TUBE OD 12mm CL2 X 500 MTR',
        'Control Valve 50 MM',
        'Flush Valve 50 MM'
      ],
      optionalComponents: [
        'Hydro cyclone Filter IS 14743 25 m3/hr x 2”'
      ],
      marketFit: 'Commercial orchards, row-crop vegetables, and low-pressure landscapes.'
    },
    {
      id: 'sprinkler',
      name: 'Precision Mini Sprinkler Systems',
      description: 'Engineered for crops requiring high-uniformity overhead coverage and micro-climate management. Ideal for frost protection, cooling, and nurseries. Our mini sprinklers provide gentle, uniform precipitation that mimics natural rain, perfect for delicate leafy greens or nursery environments where soil crusting must be avoided.',
      gallery: [
        'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7', // Sprinkler close-up
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc', // Water drops detail
        'https://images.unsplash.com/photo-1550986442-21142213d76a', // Greenhouse nursery
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2'  // Farmland overview
      ],
      mainComponents: [
        'Ventury with manifold 2" x 3/4"',
        'Screen Filter 20 m3/hr x 2" Plastic',
        'Air Release Valve 1"',
        'Pressure Gauge'
      ],
      distributionSystem: [
        'PVC Pipes 63mm x 4kg/cm2',
        'HDPE QC M Service Saddle 63mm x 3/4"',
        'CTRL Valve 32mm MOLD. SEAL Plain/Threaded',
        'MINI SPRINKLER 6 TO 10 M RADIUS FULL CIRCLE WITH ASSEMBLY',
        'TUBE OD 32mm CL2 X 250 MTR',
        'CTRL Valve 50mm MOLD. SEAL Plain/Threaded',
        'Flush Valve 63mm'
      ],
      marketFit: 'Leafy greens, tea plantations, nurseries, and large-scale flower gardens.'
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-emerald-900 text-white py-24 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-bold font-serif mb-4 tracking-tight">Industrial Range</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto font-light text-lg">
            Standard-conforming irrigation hardware built for the world's most demanding agricultural environments.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-24 relative z-20">
        {products.map((product, idx) => (
          <div 
            key={product.id} 
            className={`bg-white rounded-[3rem] shadow-2xl flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} border border-stone-100 overflow-visible`}
          >
            {/* Gallery Wrapper - Sticky on Desktop */}
            <div className="lg:w-2/5 shrink-0 h-[480px] lg:h-auto lg:sticky lg:top-24 lg:self-start z-30">
              <ProductGallery 
                images={product.gallery} 
                name={product.name} 
                isFirstProduct={idx === 0} 
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 lg:p-14 space-y-10 bg-white rounded-b-[3rem] lg:rounded-b-none lg:rounded-r-[3rem]">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-10 h-0.5 bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">Technical Series</span>
                </div>
                <h2 className="text-4xl font-bold font-serif text-slate-900 leading-tight">{product.name}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-800 flex items-center uppercase text-xs tracking-widest bg-stone-50 w-fit px-3 py-1 rounded-full border border-stone-100">
                    Control Unit
                  </h3>
                  <ul className="space-y-3">
                    {product.mainComponents.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start">
                        <svg className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {product.optionalComponents && (
                    <div className="pt-4">
                      <h4 className="font-bold text-amber-600 uppercase text-[10px] tracking-widest mb-3">Optional Filtration</h4>
                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        {product.optionalComponents.map((item, i) => (
                          <p key={i} className="text-xs text-amber-900 italic font-medium flex items-center">
                            <span className="mr-2">✦</span> {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <h3 className="font-bold text-slate-800 flex items-center uppercase text-xs tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                    Distribution Net
                  </h3>
                  <ul className="space-y-3">
                    {product.distributionSystem.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start">
                        <svg className="w-4 h-4 text-emerald-300 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Performance Metrics</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Agromic's industrial range is subjected to rigorous pressure-burst testing and environmental stress-cracking resistance evaluations. Our components are UV-stabilized for sustained exposure in extreme tropical climates, ensuring that the structural integrity of your irrigation infrastructure remains uncompromised for over 10 years.
                </p>
              </div>

              <div className="pt-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Primary Market</p>
                   <p className="text-sm text-slate-600 font-medium italic">{product.marketFit}</p>
                </div>
                <Link to="/contact" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl active:scale-95 text-center flex items-center justify-center group">
                  Get Technical Quote
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
