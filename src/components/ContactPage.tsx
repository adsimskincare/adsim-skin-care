import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Mail, Phone, Instagram, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    concern: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', concern: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello ADSIM CARE, I would like to get skincare advice for my skin concern.');
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE7DC] pb-8 mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#153323] font-normal tracking-tight mb-2">
            Contact ADSIM CARE
          </h1>
          <p className="text-sm text-[#706B62] font-light max-w-xl">
            Have questions about our formulations, ingredients, or need tailored routine assistance? Our Delhi support team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-serif text-2xl text-[#153323]">Registered Office</h2>

              <div className="space-y-4 text-xs text-[#5A554C]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#153323] block mb-0.5">Headquarters & Postal Address</strong>
                    <p className="leading-relaxed">915, Vasundhara Enclave, New Delhi, Delhi 110096, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#153323] block mb-0.5">Customer Support Email</strong>
                    <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#153323]">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#153323] block mb-0.5">Helpline Phone</strong>
                    <a href="tel:+917079572343" className="hover:text-[#153323]">
                      +91 70795 72343
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323] shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#153323] block mb-0.5">Instagram Community</strong>
                    <a href="https://instagram.com/adsim.care" target="_blank" rel="noreferrer" className="hover:text-[#153323]">
                      @adsim.care
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#153323] text-white p-6 sm:p-7 rounded-lg shadow-sm space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C4A468] block">
                INSTANT SKINCARE ASSISTANCE
              </span>
              <h3 className="font-serif text-xl text-[#FAF7F2]">Chat with ADSIM CARE on WhatsApp</h3>
              <p className="text-xs text-[#C2BDB2] leading-relaxed font-light">
                Speak directly with our team for advice on product choices, patch testing guidelines, or delivery updates.
              </p>
              <button
                onClick={openWhatsApp}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT WITH US NOW</span>
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 sm:p-10 shadow-xs">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#153323] mb-2">Send Us a Message</h2>
              <p className="text-xs text-[#706B62] font-light mb-6">
                Fill in the form below and an ADSIM CARE product specialist will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-[#FAF7F2] border border-[#ECE7DC] rounded-lg space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#2E7D32] mx-auto" />
                  <h3 className="font-serif text-2xl text-[#153323]">Message Received</h3>
                  <p className="text-xs text-[#5A554C] max-w-md mx-auto">
                    Thank you for reaching out. We have logged your enquiry and our team will get in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#635E55] mb-1 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Gupta"
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#635E55] mb-1 font-medium">Mobile Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#635E55] mb-1 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#635E55] mb-1 font-medium">Primary Skin Concern</label>
                      <select
                        value={form.concern}
                        onChange={(e) => setForm({ ...form, concern: e.target.value })}
                        className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                      >
                        <option value="General Inquiry">General Product Inquiry</option>
                        <option value="Acne-Prone Skin">Acne / Breakouts (Acnova)</option>
                        <option value="Oily Skin">Excess Oil Control (Oilvera)</option>
                        <option value="Tan & Dullness">Tan & Dullness (Glowvera)</option>
                        <option value="Dry & Sensitive">Dry & Sensitive (Hydrovia)</option>
                        <option value="Dehydrated Texture">Rough / Dehydrated (Yogurt Cream)</option>
                        <option value="Bulk or Retail Distribution">Retail / Distribution Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your skin, questions regarding our formulations, or any other feedback..."
                      className="w-full p-3 bg-[#FAF7F2] border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.2em] font-medium rounded transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
