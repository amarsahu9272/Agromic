
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Impact: React.FC = () => {
  const data = [
    { name: 'Traditional', water: 100, yield: 60, fertilizer: 100 },
    { name: 'Agromic', water: 10, yield: 95, fertilizer: 20 },
  ];

  return (
    <div className="pb-24">
      <section className="relative py-24 bg-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl font-bold font-serif text-white mb-6">Real World Impact</h1>
          <p className="text-emerald-200 text-xl max-w-2xl mx-auto font-light">
            Numbers don't lie. Our systems change the economics of farming.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-serif">Environmental Stewardship</h2>
            <p className="text-slate-600 leading-relaxed">
              By reducing fertilizer use by up to 80%, we prevent nitrogen leaching into local water tables and oceans. This protects biodiversity and ensures that your land remains fertile for decades.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-3xl font-bold text-slate-900">900M+</div>
                <div className="text-slate-500 text-sm">Gallons Saved Annually</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-3xl font-bold text-slate-900">15%</div>
                <div className="text-slate-500 text-sm">CO2 Emission Reduction</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100">
            <h3 className="text-center font-bold mb-8 text-slate-800">Resource Consumption Comparison</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="water" fill="#3b82f6" radius={[10, 10, 0, 0]} name="Water Use %" />
                  <Bar dataKey="fertilizer" fill="#fbbf24" radius={[10, 10, 0, 0]} name="Fertilizer Use %" />
                  <Bar dataKey="yield" fill="#10b981" radius={[10, 10, 0, 0]} name="Yield Efficiency %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4 italic">Comparison based on standard field trials for tomato cultivation.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-center mb-16">Stories from the Field</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                text: "Before Agromic, we were struggling with water scarcity during peak summer. Their drip system not only saved my crop but actually increased the fruit size significantly.",
                author: "Rajesh Kumar",
                role: "Citrus Farmer, Maharashtra"
              },
              {
                text: "The automation and precision of the mini sprinklers reduced our daily labor time from 6 hours to just 20 minutes. It's a game changer for our nursery.",
                author: "Sarah D'Souza",
                role: "Commercial Greenhouse Manager"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 italic text-slate-700 relative">
                <svg className="absolute top-6 left-6 w-8 h-8 text-emerald-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.9124 14 15.017 13.1046 15.017 12V9C15.017 7.89543 15.9124 7 17.017 7H20.017C21.1216 7 22.017 7.89543 22.017 9V18C22.017 20.2091 20.2261 22 18.017 22H15.017C14.4647 22 14.017 21.5523 14.017 21ZM2.01693 21L2.01693 18C2.01693 16.8954 2.91236 16 4.01693 16H7.01693V14H5.01693C3.91236 14 3.01693 13.1046 3.01693 12V9C3.01693 7.89543 3.91236 7 5.01693 7H8.01693C9.1215 7 10.0169 7.89543 10.0169 9V18C10.0169 20.2091 8.22596 22 6.01693 22H3.01693C2.46465 22 2.01693 21.5523 2.01693 21Z" />
                </svg>
                <p className="mb-6 relative z-10">"{t.text}"</p>
                <div className="not-italic">
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="text-sm text-emerald-600 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
