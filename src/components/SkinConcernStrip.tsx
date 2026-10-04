import React from 'react';
import { useStore } from '../context/StoreContext';
import { Droplets, ShieldAlert, Sparkles, SunMedium, Feather } from 'lucide-react';

export const SkinConcernStrip: React.FC = () => {
  const { setCurrentPage, setSelectedConcernFilter } = useStore();

  const concerns = [
    {
      id: 'acne',
      title: 'ACNE-PRONE SKIN',
      subtitle: 'Clearer-looking skin',
      icon: ShieldAlert,
      product: 'Acnova'
    },
    {
      id: 'oil-control',
      title: 'OILY SKIN',
      subtitle: 'Oil control care',
      icon: Droplets,
      product: 'Oilvera'
    },
    {
      id: 'tan-removal',
      title: 'TAN & DULLNESS',
      subtitle: 'Brighter-looking skin',
      icon: SunMedium,
      product: 'Glowvera'
    },
    {
      id: 'hydration',
      title: 'DRY & SENSITIVE',
      subtitle: 'Hydration & comfort',
      icon: Feather,
      product: 'Hydrovia'
    },
    {
      id: 'barrier-repair',
      title: 'DAILY HYDRATION',
      subtitle: 'Soft, healthy-looking skin',
      icon: Sparkles,
      product: 'Yogurt Cream'
    }
  ];

  const handleSelect = (concernId: string) => {
    setSelectedConcernFilter(concernId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#F5F1E8] border-b border-[#ECE7DC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {concerns.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="group p-4 bg-[#FAF7F2] hover:bg-[#FFFFFF] border border-[#E5DFD3] hover:border-[#C4A468] rounded transition-all duration-300 text-left flex flex-col justify-between hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE9DD] group-hover:bg-[#153323] text-[#153323] group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] text-[#A69F91] group-hover:text-[#153323] transition-colors font-medium">
                    {item.product} →
                  </span>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#153323] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#706B62] font-normal leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
