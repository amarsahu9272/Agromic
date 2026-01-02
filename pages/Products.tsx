
import React from 'react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const products = [
    {
      id: 'drip',
      name: 'Advanced Drip Irrigation Systems',
      short: 'Surgical precision for your roots.',
      image: 'https://images.unsplash.com/photo-1590682680395-03ad7e0b7681?auto=format&fit=crop&q=80&w=800',
      description: 'Our drip irrigation system delivers water and nutrients directly to the root zone of the plant, minimizing evaporation and waste.',
      benefits: [
        '90% Water efficiency',
        '80% Fertilizer efficiency via fertigation',
        'Reduced weed growth between rows',
        'Operates effectively on slopes'
      ],
      idealFor: 'Orchards, vineyards, row crops like tomatoes and peppers.'
    },
    {
      id: 'sprinkler',
      name: 'Precision Mini Sprinkler Systems',
      short: 'Uniform coverage for delicate crops.',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800',
      description: 'Ideal for low-growing crops that require a gentle moisture canopy. Our mini sprinklers provide exceptional uniformity at low pressures.',
      benefits: [
        'Gentle droplets prevent soil erosion',
        'Frost protection capabilities',
        'Quick installation and mobility',
        'Wide coverage per unit'
      ],
      idealFor: 'Leafy greens, nurseries, gardens, and cooling livestock.'
    }
  ];

  return (
    <div className="pb-24">
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold font-serif mb-6">Our Solutions</h1>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto font-light">
            Engineered for durability. Optimized for performance. Built for the modern farmer.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="space-y-24">
          {products.map((product, idx) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="lg:w-1/2 p-10 lg:p-16 space-y-6">
                <div className="space-y-2">
                  <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">Category: {product.id.charAt(0).toUpperCase() + product.id.slice(1)}</span>
                  <h2 className="text-3xl font-bold font-serif text-slate-900">{product.name}</h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">{product.description}</p>
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800">Key Benefits:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-slate-600 text-sm">
                        <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-stone-100">
                  <p className="text-sm text-slate-500 italic"><span className="font-bold text-slate-700 not-italic">Ideal for:</span> {product.idealFor}</p>
                </div>
                <Link 
                  to="/contact" 
                  className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors"
                >
                  Request Specifications
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-serif mb-4">Quick Comparison</h2>
          <p className="text-slate-600">Which system is right for your land?</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-2xl shadow-sm border border-stone-100">
            <thead>
              <tr className="bg-stone-50">
                <th className="p-6 border-b border-stone-100 font-bold text-slate-900">Feature</th>
                <th className="p-6 border-b border-stone-100 font-bold text-emerald-700">Drip Irrigation</th>
                <th className="p-6 border-b border-stone-100 font-bold text-emerald-700">Mini Sprinklers</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr>
                <td className="p-6 border-b border-stone-100 font-medium">Water Use</td>
                <td className="p-6 border-b border-stone-100">Ultra-low flow</td>
                <td className="p-6 border-b border-stone-100">Moderate flow</td>
              </tr>
              <tr>
                <td className="p-6 border-b border-stone-100 font-medium">Pressure Needs</td>
                <td className="p-6 border-b border-stone-100">Low (1-2 bar)</td>
                <td className="p-6 border-b border-stone-100">Medium (2-3 bar)</td>
              </tr>
              <tr>
                <td className="p-6 border-b border-stone-100 font-medium">Wind Resistance</td>
                <td className="p-6 border-b border-stone-100">High (Direct to root)</td>
                <td className="p-6 border-b border-stone-100">Low (Affected by wind)</td>
              </tr>
              <tr>
                <td className="p-6 font-medium">Main Advantage</td>
                <td className="p-6">Max efficiency</td>
                <td className="p-6">Gentle canopy cooling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Products;
