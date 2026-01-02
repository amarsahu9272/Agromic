
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pb-24">
      <section className="bg-stone-50 py-20 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-5xl font-bold font-serif text-slate-900">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to optimize your farm? Speak with our irrigation experts today.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-serif text-slate-900">Regional Headquarters</h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you're a small-scale farmer or a large distributor, we have the resources to support your project from design to installation.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Main Office</h4>
                  <p className="text-slate-600">Veibhav Kailash Dham, Sankosai Road No. 4, Mango, Jamshedpur, East Singhbhum, Jharkhand - 831012</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Direct Support</h4>
                  <p className="text-slate-600">+91 7004308400</p>
                  <p className="text-slate-600">agromicindustrypvt.ltd@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-stone-200 rounded-3xl overflow-hidden grayscale relative">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-slate-800">Agromic Hub Location</div>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 lg:p-16 rounded-[3rem] shadow-2xl border border-stone-100">
            <h2 className="text-3xl font-bold font-serif mb-8 text-slate-900">Inquiry Form</h2>
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Message Received!</h3>
                <p className="text-emerald-700">One of our consultants will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <input type="tel" required placeholder="+91 ..." className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Inquiry Type</label>
                  <select required className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer">
                    <option value="" disabled selected>Select inquiry type</option>
                    <option>Product Information</option>
                    <option>Distributor Inquiry</option>
                    <option>Support Request</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Crop Type</label>
                    <select className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer">
                      <option>Orchards / Fruit Trees</option>
                      <option>Row Crops (Vegetables)</option>
                      <option>Greenhouse / Nursery</option>
                      <option>Cereals / Grains</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Farm Size <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input type="text" placeholder="e.g. 5 Acres" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea rows={4} placeholder="Tell us about your land and irrigation needs..." className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
