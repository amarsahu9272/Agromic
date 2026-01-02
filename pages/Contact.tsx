
import React, { useState } from 'react';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  cropType: string;
  farmSize: string;
  message: string;
  hp_field: string; // Honeypot field for spam prevention
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (formData.message.trim().length > 0 && formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic Spam Prevention (Honeypot)
    if (formData.hp_field) {
      console.warn("Spam detected via honeypot.");
      return; 
    }

    // 2. Client-side Validation
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate "Server-side" validation and API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate a server-side logic check
      if (formData.email.includes("test@spam.com")) {
        throw new Error("This email is blacklisted.");
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: '',
        cropType: 'Orchards / Fruit Trees',
        farmSize: '',
        message: '',
        hp_field: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      alert(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-50" alt="Map background" />
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field - Hidden from users */}
                <div className="hidden">
                  <input 
                    type="text" 
                    name="hp_field" 
                    value={formData.hp_field} 
                    onChange={handleChange} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required 
                    placeholder="John Doe" 
                    className={`w-full bg-stone-50 border ${errors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-200'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`} 
                  />
                  {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="john@example.com" 
                      className={`w-full bg-stone-50 border ${errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-200'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`} 
                    />
                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="+91 00000 00000" 
                      className={`w-full bg-stone-50 border ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-200'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`} 
                    />
                    {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Inquiry Type</label>
                  <select 
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required 
                    className={`w-full bg-stone-50 border ${errors.inquiryType ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-200'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select inquiry type</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Distributor Inquiry">Distributor Inquiry</option>
                    <option value="Support Request">Support Request</option>
                  </select>
                  {errors.inquiryType && <p className="text-xs text-red-500 ml-1">{errors.inquiryType}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Crop Type</label>
                    <select 
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Orchards / Fruit Trees">Orchards / Fruit Trees</option>
                      <option value="Row Crops (Vegetables)">Row Crops (Vegetables)</option>
                      <option value="Greenhouse / Nursery">Greenhouse / Nursery</option>
                      <option value="Cereals / Grains">Cereals / Grains</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Farm Size <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text" 
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      placeholder="e.g. 5 Acres" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Tell us about your land and irrigation needs..." 
                    className={`w-full bg-stone-50 border ${errors.message ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-200'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Send Inquiry</span>
                  )}
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
