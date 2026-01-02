
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold font-serif text-slate-900 mb-6">Our Mission is to Sustain Life through Smarter Farming.</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Founded with the vision of solving the global water crisis, Agromic Industry Pvt Ltd stands at the intersection of agriculture and engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-serif">The Agromic Story</h2>
            <p className="text-slate-600 leading-relaxed">
              For decades, traditional farming has relied on flood irrigation—a process where over 90% of water is lost to evaporation and runoff. Our founders saw this inefficiency not just as a financial loss for farmers, but as a critical environmental threat.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, Agromic Industry is a leader in precision irrigation. We don't just sell pipes and sprinklers; we provide comprehensive resource-management ecosystems that help rural and commercial farmers achieve sustainability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Our Vision</h3>
              <p className="text-sm text-emerald-800">To be the global standard for water-efficient agriculture, ensuring food security for generations.</p>
            </div>
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Our Goal</h3>
              <p className="text-sm text-amber-800">To convert 1 million hectares of traditional farms to precision drip systems by 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Values */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Values that Drive Us</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Integrity",
                desc: "We build systems that last, using only high-grade materials that withstand the test of time and climate."
              },
              {
                title: "Innovation",
                desc: "Constantly researching new ways to lower pressure requirements and improve nutrient absorption."
              },
              {
                title: "Empowerment",
                desc: "We provide education and training to farmers, ensuring they have the knowledge to succeed."
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto text-emerald-600 text-2xl font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
