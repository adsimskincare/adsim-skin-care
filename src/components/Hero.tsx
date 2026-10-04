import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentPage, settings } = useStore();

  const modelImage = settings.customModelUrl || '/src/assets/images/hero_adsim_model_banner_1791143281137.jpg';

  return (
    <section className="relative bg-[#FCFAF6] border-b border-[#ECE7DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Product Arrangement & Headline */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578]">
                ADSIM CARE • 100% ORIGINAL FORMULATIONS
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#153323] font-normal tracking-tight leading-[1.14] mb-4">
              Skincare Collections
            </h1>

            <p className="text-sm sm:text-base text-[#5A554C] font-light leading-relaxed mb-6 max-w-lg">
              Thoughtfully formulated skincare designed to cleanse, hydrate and care for everyday Indian skin — with carefully selected active ingredients and a premium everyday experience.
            </p>

            {/* Shop Now CTA */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-black hover:bg-[#153323] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-[#2C2C2A] text-xs uppercase tracking-[0.16em] font-medium rounded-full border border-[#D9D3C5] hover:border-[#153323] hover:text-[#153323] transition-colors"
              >
                Our Story
              </button>
            </div>

            {/* Genuine Key Benefits Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#ECE7DC] text-xs text-[#5A554C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A468] shrink-0" />
                <span>Salicylic Acid Acne Care</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A468] shrink-0" />
                <span>Ethyl Ascorbic Tan Glow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A468] shrink-0" />
                <span>Hyaluronic Yogurt Moisture</span>
              </div>
            </div>

          </div>

          {/* Right Column: Model Face */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Campaign Visual with Model */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E8E2D5] bg-[#FAF7F2] aspect-[16/10] sm:aspect-[4/3] relative group">
                <img
                  src={modelImage}
                  alt="ADSIM CARE contracted brand ambassador with radiant healthy skin"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Brand Ambassador Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-lg shadow-sm border border-[#E5DFD3] text-left">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#153323] tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C4A468]" />
                    <span>Official Brand Face</span>
                  </div>
                  <span className="text-[11px] text-[#6E685F] block font-light">
                    Real Skin. Real Routine. Everyday Care.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
