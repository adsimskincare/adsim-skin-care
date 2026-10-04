import React from 'react';
import { FlaskConical, FileSearch, Target, Sparkles, MapPin, Smile } from 'lucide-react';

export const WhyAdsimCare: React.FC = () => {
  const features = [
    {
      icon: FlaskConical,
      title: 'Thoughtful Formulations',
      description: 'Carefully selected skincare ingredients chosen for safety, purity, and clinical efficacy.'
    },
    {
      icon: FileSearch,
      title: 'Ingredient Transparency',
      description: 'Clear, full INCI ingredient declarations with zero hidden chemical surprises or unverified claims.'
    },
    {
      icon: Target,
      title: 'Focused Solutions',
      description: 'Targeted products engineered specifically around distinct concerns: acne, excess oil, tan, and barrier dryness.'
    },
    {
      icon: Sparkles,
      title: 'Premium Experience',
      description: 'Silky, comfortable textures and functional packaging designed for effortless everyday use.'
    },
    {
      icon: MapPin,
      title: 'Made for India',
      description: 'Formulated to excel in tropical humidity, intense sunlight exposure, and changing regional seasons.'
    },
    {
      icon: Smile,
      title: 'Customer First',
      description: 'Uncompromising commitment to quality, genuine customer feedback, and continuous product refinement.'
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
            THE DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-3">
            Why ADSIM CARE
          </h2>
          <p className="text-sm text-[#706B62] font-light">
            Quality, Transparency & Everyday Skin Confidence.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#FFFFFF] border border-[#ECE7DC] rounded hover:border-[#C4A468] transition-all duration-300 hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center text-[#153323] mb-5">
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#153323] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#6E685F] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F5F2EB] text-[11px] tracking-wider text-[#999285] font-mono">
                  0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
