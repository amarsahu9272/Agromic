
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * A reusable image component that implements lazy loading,
 * shows a placeholder shimmer, and fades in once the image is loaded.
 */
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, className = "", loading = "lazy" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-200 ${className}`}>
      {/* Shimmer/Pulse Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200"></div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-grow min-h-[400px] lg:min-h-0 group overflow-hidden bg-stone-100 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
        {/* Main Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setIsZoomed(true)}
            className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-zoom-in ${
              idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
            }`}
          >
            <OptimizedImage
              src={img}
              alt={`${name} view ${idx + 1}`}
              className="w-full h-full"
              loading={idx === 0 ? "eager" : "lazy"} // Eager load the first one for LCP
            />
            {/* Zoom Hint Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-slate-800 z-10 hover:scale-110"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-slate-800 z-10 hover:scale-110"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails Gallery Strip */}
      <div className="bg-stone-50 p-4 flex justify-center space-x-3 border-t border-stone-200 overflow-x-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all border-2 ${
              idx === currentIndex 
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 scale-105' 
              : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <OptimizedImage src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full" />
            {idx === currentIndex && (
              <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 px-4 md:px-10"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-emerald-400 p-2 transition-colors z-[210] bg-white/10 rounded-full"
            onClick={() => setIsZoomed(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-6xl w-full h-[80vh] flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`${name} high resolution`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Modal Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-10 text-center text-stone-400 text-sm">
            <p className="font-medium text-white mb-1 uppercase tracking-widest">{name} — Detailed Inspection</p>
            <p className="font-light">Image {currentIndex + 1} of {images.length} • Press ESC to exit</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ShareButtonsProps {
  productName: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ productName }) => {
  const shareUrl = window.location.href;
  const shareText = `Check out the ${productName} by Agromic Industry Pvt Ltd! Sustainable and water-efficient farming solutions.`;

  const platforms = [
    {
      name: 'Facebook',
      color: 'hover:bg-blue-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      color: 'hover:bg-slate-900',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      color: 'hover:bg-blue-700',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <div className="flex items-center space-x-3">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share Solution:</span>
      <div className="flex space-x-2">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 text-slate-500 transition-all ${platform.color} hover:text-white shadow-sm`}
            aria-label={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const products = [
    {
      id: 'drip',
      name: 'Advanced Drip Irrigation Systems',
      short: 'Surgical precision for your roots.',
      gallery: [
        'https://images.unsplash.com/photo-1590682680395-03ad7e0b7681?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Our drip irrigation system is a multi-layered ecosystem designed for precision agriculture. It leverages low-volume delivery through high-durability emitters, ensuring that every drop reaches the root zone with zero surface runoff. Our system is engineered using UV-stabilized virgin polymers, tested for resistance against high-calcification and iron-rich water sources.',
      technicalSpecs: [
        { label: 'Flow Rates', value: '1.2 Lph to 4.0 Lph per emitter' },
        { label: 'Emitter Spacing', value: '20cm to 100cm customizable' },
        { label: 'Filtration Needs', value: '120 Mesh / 130 Micron standard' },
        { label: 'Operating Pressure', value: '0.5 bar - 2.5 bar' },
        { label: 'Wall Thickness', value: '16 mil to 40 mil (Reusable)' }
      ],
      useCases: [
        {
          title: 'High-Value Orchards',
          desc: 'Utilizing online pressure-compensated (PC) emitters for Mango, Citrus, and Pomegranate plantations on undulating land.'
        },
        {
          title: 'Sub-Surface Irrigation',
          desc: 'Buried drip lines for Sugarcane and Cotton, reducing soil evaporation and allowing for efficient machine harvesting.'
        },
        {
          title: 'Precision Fertigation',
          desc: 'Combined with Venturi injectors for automated nutrient delivery in closed-loop vegetable production.'
        }
      ],
      benefits: [
        '90% Water efficiency',
        '80% Fertilizer efficiency via fertigation',
        'Significant reduction in weed competition',
        'Uniform crop growth across field length'
      ],
      downloads: [
        { label: 'Technical Datasheet (PDF)', url: '#' },
        { label: 'System Installation Guide', url: '#' },
        { label: 'Maintenance & Cleaning Manual', url: '#' }
      ],
      idealFor: 'Commercial orchards, row-crop vegetables, and low-pressure landscapes.'
    },
    {
      id: 'sprinkler',
      name: 'Precision Mini Sprinkler Systems',
      short: 'Uniform coverage for delicate crops.',
      gallery: [
        'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200'
      ],
      description: 'Engineered for crops requiring a gentle micro-climate, our Mini Sprinklers provide an even water distribution with small droplet sizes to avoid soil capping and delicate leaf damage. The system utilizes rotating or static heads with high-wear resistance Acetal components, making them ideal for long-term installations in demanding environments.',
      technicalSpecs: [
        { label: 'Throw Radius', value: '3.0m to 7.5m full circle' },
        { label: 'Flow Rate', value: '35 Lph to 150 Lph' },
        { label: 'Nozzle Type', value: 'Bayonet-mount for easy cleaning' },
        { label: 'Operating Pressure', value: '2.0 bar - 3.5 bar' },
        { label: 'Distribution Uniformity', value: 'CU > 92% in optimal spacing' }
      ],
      useCases: [
        {
          title: 'Nursery Propagation',
          desc: 'Creating fine mists and overhead cooling for seedling development in greenhouses and polyhouses.'
        },
        {
          title: 'Leafy Green Canopy Cooling',
          desc: 'Reducing canopy temperature for Lettuce, Spinach, and Mint during peak summer hours to prevent bolting.'
        },
        {
          title: 'Frost Mitigation',
          desc: 'Continuous application of water to maintain leaf temperatures above freezing during frost events in early spring.'
        }
      ],
      benefits: [
        'Gentle droplets prevent soil erosion',
        'Effective micro-climate management',
        'Quick-connect system for easy relocation',
        'Uniform coverage at lower flow than flood'
      ],
      downloads: [
        { label: 'Sprinkler Range Catalog', url: '#' },
        { label: 'Hydraulic Layout Guide', url: '#' },
        { label: 'Nozzle Selection Chart', url: '#' }
      ],
      idealFor: 'Leafy greens, tea plantations, nurseries, and large-scale flower gardens.'
    }
  ];

  return (
    <div className="pb-24 relative">
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold font-serif mb-6">Distributor Solutions</h1>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            High-specification irrigation equipment engineered for durability, performance, and maximum resource optimization.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="space-y-32">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              <div className="lg:w-2/5 shrink-0 h-[500px] lg:h-auto">
                <ProductGallery images={product.gallery} name={product.name} />
              </div>
              <div className="lg:w-3/5 p-8 lg:p-14 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase px-3 py-1 bg-emerald-50 rounded-full inline-block">
                      Industrial Series: {product.id.toUpperCase()}
                    </span>
                    <h2 className="text-4xl font-bold font-serif text-slate-900">{product.name}</h2>
                  </div>
                  <ShareButtons productName={product.name} />
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-emerald-500 pl-6">
                  {product.description}
                </p>

                {/* Technical Specs & Documentation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Technical Specifications
                    </h3>
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 space-y-3">
                      {product.technicalSpecs.map((spec, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-500">{spec.label}</span>
                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Technical Documentation
                    </h3>
                    <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50 space-y-3">
                      {product.downloads.map((doc, i) => (
                        <a 
                          key={i} 
                          href={doc.url} 
                          className="flex items-center text-sm text-emerald-700 hover:text-emerald-900 hover:underline transition-all group"
                        >
                          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          {doc.label}
                        </a>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 pl-2">Click to view or download resource files.</p>
                  </div>
                </div>

                {/* Core Benefits */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Core Performance Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600">
                        <svg className="w-5 h-5 text-emerald-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-bold text-slate-800">Advanced Use Cases</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {product.useCases.map((useCase, i) => (
                      <div key={i} className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/50">
                        <h4 className="font-bold text-emerald-800 text-sm mb-2">{useCase.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{useCase.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <p className="text-sm text-slate-500 italic">
                      <span className="font-bold text-slate-700 not-italic uppercase tracking-tighter mr-2">Market Fit:</span> 
                      {product.idealFor}
                    </p>
                  </div>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-500/20 group"
                  >
                    Request Distributor Portal Access
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold font-serif text-slate-900">Comparative Performance Metrics</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Standard performance data based on 1.0 hectare cultivation benchmarks.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-100">
            <thead>
              <tr className="bg-stone-50">
                <th className="p-8 border-b border-stone-100 font-bold text-slate-900">Feature Segment</th>
                <th className="p-8 border-b border-stone-100 font-bold text-emerald-700">Drip Systems (Inline/PC)</th>
                <th className="p-8 border-b border-stone-100 font-bold text-emerald-700">Mini Sprinkler Range</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="hover:bg-stone-50/50 transition-colors">
                <td className="p-8 border-b border-stone-100 font-medium text-slate-900">Water Consumption Efficiency</td>
                <td className="p-8 border-b border-stone-100">Highest (Direct Root Saturation)</td>
                <td className="p-8 border-b border-stone-100">Optimal (Low Canopy Impact)</td>
              </tr>
              <tr className="hover:bg-stone-50/50 transition-colors">
                <td className="p-8 border-b border-stone-100 font-medium text-slate-900">Labor Requirement (Automation Ready)</td>
                <td className="p-8 border-b border-stone-100">Very Low (Fully Automated fertigation)</td>
                <td className="p-8 border-b border-stone-100">Low (Fast relocation & flushing)</td>
              </tr>
              <tr className="hover:bg-stone-50/50 transition-colors">
                <td className="p-8 border-b border-stone-100 font-medium text-slate-900">Climatic Resilience</td>
                <td className="p-8 border-b border-stone-100">Extreme Heat (Reduces evapotranspiration)</td>
                <td className="p-8 border-b border-stone-100">Frost (Leaf coating capability)</td>
              </tr>
              <tr className="hover:bg-stone-50/50 transition-colors">
                <td className="p-8 font-medium text-slate-900">Serviceable Lifespan</td>
                <td className="p-8">7 - 10+ Seasons (with filtration)</td>
                <td className="p-8">5 - 8 Seasons (component replaceable)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top of products"
        role="button"
        className={`fixed bottom-24 left-6 z-[60] bg-emerald-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${
          showScrollButton 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
        } hover:bg-emerald-700 hover:scale-110 active:scale-95 group`}
      >
        <svg 
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Products;
