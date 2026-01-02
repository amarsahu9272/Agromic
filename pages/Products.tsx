
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <div className="relative h-80 lg:h-full group overflow-hidden bg-stone-100">
        {/* Images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setIsZoomed(true)}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-zoom-in ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`${name} view ${idx + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-800 z-10"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-slate-800 z-10"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-emerald-500 w-6' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 px-4 md:px-10"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-emerald-400 p-2 transition-colors z-[210]"
            onClick={() => setIsZoomed(false)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-10 text-center text-stone-400 text-sm">
            <p className="font-medium text-white mb-1">{name} - Detailed View</p>
            <p>Image {currentIndex + 1} of {images.length} • Press ESC to close</p>
          </div>
        </div>
      )}
    </>
  );
};

const Products: React.FC = () => {
  const products = [
    {
      id: 'drip',
      name: 'Advanced Drip Irrigation Systems',
      short: 'Surgical precision for your roots.',
      gallery: [
        'https://images.unsplash.com/photo-1590682680395-03ad7e0b7681?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200'
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
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=1200'
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
    <div className="pb-24">
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
              <div className="lg:w-2/5 shrink-0">
                <ProductGallery images={product.gallery} name={product.name} />
              </div>
              <div className="lg:w-3/5 p-8 lg:p-14 space-y-8">
                <div className="space-y-4">
                  <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase px-3 py-1 bg-emerald-50 rounded-full inline-block">
                    Industrial Series: {product.id.toUpperCase()}
                  </span>
                  <h2 className="text-4xl font-bold font-serif text-slate-900">{product.name}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-emerald-500 pl-6">
                    {product.description}
                  </p>
                </div>

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
    </div>
  );
};

export default Products;
