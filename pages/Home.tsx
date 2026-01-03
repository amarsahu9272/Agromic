
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className={`relative overflow-hidden bg-stone-200 ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-300">
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
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-700' : 'text-slate-800 group-hover:text-emerald-600'}`}>
          {question}
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const faqs = [
    {
      question: "How much water can I really save with Agromic systems?",
      answer: "Our drip irrigation systems are designed to reduce water wastage by up to 90% compared to traditional flood irrigation. By delivering water directly to the root zone, we eliminate surface evaporation and runoff, using only about 10% of the resources to achieve even better results."
    },
    {
      question: "Is drip irrigation suitable for my specific crop?",
      answer: "Yes! Drip irrigation is highly versatile. It is ideal for orchards (citrus, mango, pomegranate), vineyards, vegetables (tomatoes, peppers, leafy greens), and even field crops. Our systems can be customized based on your specific crop spacing and water requirements."
    },
    {
      question: "Does the system require high maintenance?",
      answer: "Agromic systems are engineered for low maintenance. Our self-cleaning emitters and high-grade filtration units prevent clogging from sand or debris. A simple periodic flush of the lines is usually all that is required to keep the system running efficiently for years."
    },
    {
      question: "Can these systems be used on uneven or hilly terrain?",
      answer: "Absolutely. One of the major advantages of our pressure-compensated (PC) drip lines is their ability to deliver a uniform amount of water to every plant, regardless of elevation changes or field length. This makes them perfect for slopes and undulating landscapes."
    },
    {
      question: "What is the expected lifespan of Agromic products?",
      answer: "We use high-quality, UV-resistant polymers that are built to withstand harsh agricultural environments. With proper installation and basic maintenance, our lateral lines and emitters typically last 7 to 10 years or more, providing a significant return on investment."
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef" 
            alt="Lush green farm field" 
            className="w-full h-full brightness-[0.7]"
            width={2000}
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

      {/* Interactive Savings Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">How much could you save?</h2>
            <p className="text-emerald-100 text-lg font-light leading-relaxed">
              Use our interactive calculator to see how much water, fertilizer, and labor costs you can reduce by switching to Agromic precision irrigation.
            </p>
          </div>
          <div className="md:w-1/3 w-full flex justify-center">
            <Link 
              to="/impact" 
              className="w-full text-center bg-white text-emerald-800 px-8 py-5 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Calculate My Savings
            </Link>
          </div>
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
            <div className="relative aspect-square">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1b" 
                alt="Irrigation system closeup" 
                className="w-full h-full rounded-3xl shadow-2xl relative z-10"
                width={1000}
              />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">Common Questions</h2>
          <p className="text-slate-600">Everything you need to know about starting your water-efficient farming journey.</p>
        </div>
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden px-8 lg:px-12">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">Have more specific questions about your land?</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
          >
            Ask our specialists
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
