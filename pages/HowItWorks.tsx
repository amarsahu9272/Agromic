
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="pb-24">
      <section className="bg-stone-50 py-20 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-5xl font-bold font-serif text-slate-900">The Science of Efficiency</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Traditional farming wastes water. We fixed it with precision engineering.
          </p>
        </div>
      </section>

      {/* Step-by-Step */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
