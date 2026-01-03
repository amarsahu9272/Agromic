
import React, { useState } from 'react';

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
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
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
          className={`w-full h-full object-cover grayscale opacity-50 transition-opacity duration-700 ${isLoaded ? 'opacity-50' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  cropType: string;
  farmSize: string;
  message: string;
  hp_field: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    cropType: 'Orchards / Fruit Trees',
    farmSize: '',
    message: '',
    hp_field: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Valid email is required';
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
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
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Main Office</h4>
                  <p className="text-slate-600">Veibhav Kailash Dham, Sankosai Road No. 4, Mango, Jamshedpur, East Singhbhum, Jharkhand - 831012</p>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-stone-200 rounded-3xl overflow-hidden relative">
               <OptimizedImage 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b" 
                 alt="Map background" 
                 className="w-full h-full"
                 width={1000}
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg font-bold text-slate-800">Agromic Hub Location</div>
               </div>
            </div>
          </div>

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
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all" 
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all" 
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-emerald-700 transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
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
