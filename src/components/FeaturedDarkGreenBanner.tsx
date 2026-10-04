import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const FeaturedDarkGreenBanner: React.FC = () => {
  const { setCurrentPage } = useStore();

  const lineup = [
    'Acnova — Acne Control',
    'Glowvera — Tan Removal',
    'Hydrovia — Deep Hydration',
    'Oilvera — Sebum Balance',
    'Yogurt Cream — Barrier Moisture'
  ];

  return (
    <section className="bg-[#153323] text-[#FAF7F2] py-16 lg:py-24 overflow-hidden relative">
      {/* Subtle organic background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C4A468_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#C4A468] font-semibold mb-3 block">
              THE ADSIM CARE COLLECTION
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF7F2] leading-[1.15] mb-4">
              Your Skin.<br />
              Your Routine.<br />
              <span className="italic text-[#E5DEC\-d] font-light text-[#D9BA7E]">Your Confidence.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C2BDB2] font-light leading-relaxed mb-8 max-w-lg">
              Build a simple skincare routine with focused products designed for your everyday skin concerns. Clean formulations made for daily living in India.
            </p>

            {/* Product lineup checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-xs text-[#E5E0D5]">
              {lineup.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A468] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FAF7F2] text-[#153323] hover:bg-[#EAE4D7] text-xs uppercase tracking-[0.2em] font-medium rounded transition-all shadow-md active:scale-[0.99]"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 text-[#153323]" />
              </button>
            </div>
          </div>

          {/* Right Column: Flatlay Collection Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#2B4B38] shadow-2xl bg-[#1A3A28] aspect-[16/10]">
              <img
                src="/src/assets/images/product_adsim_collection_flatlay_1791141852478.jpg"
                alt="ADSIM CARE complete skincare product lineup"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle label badge */}
            <div className="absolute -bottom-4 right-6 bg-[#1E422F] border border-[#335A42] px-4 py-2 rounded text-right shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#C4A468] block">
                5 Dermat Formulations
              </span>
              <span className="text-xs text-[#FAF7F2] font-serif">
                4 Face Washes + 1 Yogurt Moisturizer
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
