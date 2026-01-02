
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Lush green farm field" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-sm font-semibold tracking-wider uppercase text-emerald-300">
              Future of Irrigation
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight">
              Grow More with <span className="text-emerald-400 italic">90% Less</span> Water.
            </h1>
            <p className="text-lg md:text-xl text-stone-200 font-light max-w-lg leading-relaxed">
              Agromic Industry provides world-class drip and mini sprinkler systems designed to maximize crop yield while minimizing waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/products" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center justify-center"
              >
                Explore Solutions
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                to="/how-it-works" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all text-center"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Revolutionizing the Field</h2>
          <p className="text-slate-600 text-lg">
            Our technology isn't just about watering plants; it's about surgical precision in nutrient and water delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "90% Water Savings",
              desc: "Compared to traditional flood irrigation, our systems use only a fraction of the resource.",
              icon: "💧",
              color: "bg-blue-50"
            },
            {
              title: "Precision Fertilization",
              desc: "Inject nutrients directly to the root zone, reducing fertilizer runoff and wastage by 80%.",
              icon: "🌱",
              color: "bg-emerald-50"
            },
            {
              title: "30% Higher Yields",
              desc: "Consistent water delivery reduces plant stress, resulting in healthier crops and more fruit.",
              icon: "📈",
              color: "bg-amber-50"
            }
          ].map((item, idx) => (
            <div key={idx} className={`${item.color} p-8 rounded-3xl border border-stone-100 hover:shadow-lg transition-shadow`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Highlight */}
      <section className="bg-stone-900 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-white">Advanced Drip & Sprinkler Systems</h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                Whether you're growing orchards, vegetables, or broad-acre crops, our engineered systems provide uniform coverage even in challenging terrains.
              </p>
              <ul className="space-y-4">
                {[
                  "Self-cleaning emitters to prevent clogging",
                  "UV-resistant, high-durability polymers",
                  "Modular design for easy field expansion",
                  "Low pressure requirement for energy savings"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center text-stone-300">
                    <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/products" className="inline-block text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                View Full Product Range &rarr;
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b?auto=format&fit=crop&q=80&w=1000" 
                alt="Irrigation system closeup" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">10M+</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Liters of Water Saved</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">500+</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Farms Optimized</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">40%</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Reduced Labor Costs</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">2x</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Crop Quality Grade</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
