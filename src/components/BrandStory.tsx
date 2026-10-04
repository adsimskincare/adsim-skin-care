import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Leaf, Shield, Heart } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <section className="bg-[#FCFAF6] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: About Us Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
              ADSIM SKIN CARE • NEW DELHI
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#153323] font-normal tracking-tight leading-[1.18] mb-5">
              About Us
            </h2>

            <p className="text-sm sm:text-base text-[#5A554C] leading-relaxed font-light mb-4">
              Crafting thoughtfully formulated skincare that combines carefully selected ingredients with everyday comfort and premium care — for households across India.
            </p>

            <p className="text-xs sm:text-sm text-[#706B62] leading-relaxed font-light mb-8">
              Headquartered at 915, Vasundhara Enclave, New Delhi, ADSIM CARE is built around transparent formulations, zero harmful shortcuts, and clinical efficacy. We create focused solutions for acne-prone skin, excess sebum, sun tanning, and moisture barrier repair.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-white rounded-lg border border-[#E5DFD3] text-center">
                <Leaf className="w-5 h-5 text-[#153323] mx-auto mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#153323] mb-1">Purity</h4>
                <p className="text-[11px] text-[#706B62]">Traceable active ingredients</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#E5DFD3] text-center">
                <Shield className="w-5 h-5 text-[#153323] mx-auto mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#153323] mb-1">Science</h4>
                <p className="text-[11px] text-[#706B62]">Dermat-approved formulas</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#E5DFD3] text-center">
                <Heart className="w-5 h-5 text-[#153323] mx-auto mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#153323] mb-1">Care</h4>
                <p className="text-[11px] text-[#706B62]">Made for Indian weather</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-[#153323] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all shadow-xs"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Collection Showcase Visual */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border border-[#E5DFD3] shadow-md bg-white aspect-[16/11]">
              <img
                src="/src/assets/images/adsim_about_collection_banner_1791143311373.jpg"
                alt="ADSIM CARE Collection: Acnova, Glowvera, Hydrovia, Oilvera, Moisturizing Yogurt Cream"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
