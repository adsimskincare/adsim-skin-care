import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { ArrowRight, Instagram, Facebook, Mail, Phone, MapPin, Check } from 'lucide-react';
import { AdsimLogo } from './AdsimLogo';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedConcernFilter, settings } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (page: PageRoute, concern?: string) => {
    setCurrentPage(page);
    if (concern !== undefined) {
      setSelectedConcernFilter(concern);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#153323] text-[#FAF7F2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#244A35]">
          
          {/* Brand Info (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigateTo('home')}
              className="cursor-pointer inline-block"
            >
              <AdsimLogo size="lg" variant="light" />
            </div>

            <p className="text-xs text-[#C2BDB2] leading-relaxed max-w-sm font-light">
              Crafting thoughtfully formulated skincare that combines carefully selected ingredients with everyday comfort and premium care for households across India.
            </p>

            <div className="space-y-1.5 text-xs text-[#E5E0D5] pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C4A468] shrink-0 mt-0.5" />
                <span>915, Vasundhara Enclave, New Delhi, Delhi 110096, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C4A468] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C4A468] shrink-0" />
                <a href="tel:+917079572343" className="hover:text-white">
                  +91 70795 72343
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/adsim.care"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1E422F] hover:bg-[#C4A468] text-white transition-colors flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1E422F] hover:bg-[#C4A468] text-white transition-colors flex items-center justify-center"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C4A468] mb-4">
              SHOP RANGE
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#C2BDB2]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white">
                  All 5 Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'acne')} className="hover:text-white">
                  Acnova (Acne Care)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'tan-removal')} className="hover:text-white">
                  Glowvera (Tan Care)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'barrier-repair')} className="hover:text-white">
                  Moisturizing Yogurt Cream
                </button>
              </li>
            </ul>
          </div>

          {/* Skin Concerns Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C4A468] mb-4">
              SKIN CONCERNS
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#C2BDB2]">
              <li>
                <button onClick={() => navigateTo('shop', 'acne')} className="hover:text-white">
                  Acne-Prone Skin
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'oil-control')} className="hover:text-white">
                  Oily & Sebum Control
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'tan-removal')} className="hover:text-white">
                  Sun Tan & Dullness
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'hydration')} className="hover:text-white">
                  Dry & Sensitive
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'barrier-repair')} className="hover:text-white">
                  Barrier Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C4A468] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-[#C2BDB2]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white">
                  About ADSIM CARE
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white">
                  Lab to Shelf Process
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white">
                  Leadership & Founders
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white">
                  Skincare Journal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#C4A468] mb-3">
              NEWSLETTER
            </h4>
            <p className="text-xs text-[#C2BDB2] font-light mb-4">
              Join the ADSIM CARE community for honest ingredient updates and skincare guidance.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full py-2.5 px-3 pr-10 text-xs bg-[#1E422F] border border-[#2F5A40] rounded text-white focus:outline-hidden focus:border-[#C4A468]"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter email"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#C4A468] text-[#153323] rounded hover:bg-[#D4AF37] transition-colors flex items-center justify-center font-bold"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#A5D6A7] pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#A6A095]">
          <div>
            © {new Date().getFullYear()} ADSIM SKIN CARE (ADSIM CARE PVT LTD). All rights reserved.
          </div>
          <div className="italic font-light">
            All products for external use only. Discontinue if irritation occurs.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigateTo('contact')} className="hover:text-white">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => navigateTo('admin')} className="hover:text-[#C4A468] font-medium text-[#C4A468]">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
