import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const ShopByConcern: React.FC = () => {
  const { setCurrentPage, setSelectedConcernFilter, setSelectedProductDetail, products } = useStore();

  const concernCards = [
    {
      id: 'acne',
      title: 'ACNE-PRONE SKIN',
      description: 'Deep pore cleansing, oil balance, and blemish care without over-drying.',
      productKey: 'acnova',
      productName: 'Acnova Face Wash',
      image: '/src/assets/images/adsim_acnova_bottle_1791141898362.jpg',
      tag: 'Salicylic Acid + Green Tea'
    },
    {
      id: 'oil-control',
      title: 'OILY & COMBINATION',
      description: 'Long-lasting sebum regulation and clear skin comfort for active days.',
      productKey: 'oilvera',
      productName: 'Oilvera Face Wash',
      image: '/src/assets/images/adsim_oilvera_bottle_1791141936152.jpg',
      tag: 'Oil Control Cleansing'
    },
    {
      id: 'tan-removal',
      title: 'TAN & DULLNESS',
      description: 'Gentle exfoliation and antioxidant radiance to restore natural glow.',
      productKey: 'glowvera',
      productName: 'Glowvera Face Wash',
      image: '/src/assets/images/adsim_glowvera_bottle_1791141909418.jpg',
      tag: 'Ethyl Ascorbic Acid + Aloe'
    },
    {
      id: 'hydration',
      title: 'DRY & SENSITIVE',
      description: 'Soothing hydration, gentle micro-beads, and moisture barrier protection.',
      productKey: 'hydrovia',
      productName: 'Hydrovia Face Wash',
      image: '/src/assets/images/adsim_hydrovia_bottle_1791141921760.jpg',
      tag: 'Hyaluronic Acid + Licorice'
    },
    {
      id: 'barrier-repair',
      title: 'DRY / ROUGH TEXTURE',
      description: 'Rich yet lightweight moisture cushion for non-greasy, all-day softness.',
      productKey: 'moisturizing-yogurt-cream',
      productName: 'Moisturizing Yogurt Cream',
      image: '/src/assets/images/adsim_yogurt_cream_jar_1791141949881.jpg',
      tag: 'Trehalose + Sodium Hyaluronate'
    }
  ];

  const handleCardClick = (concernId: string, productKey: string) => {
    const prod = products.find(p => p.id === productKey);
    if (prod) {
      setSelectedProductDetail(prod);
    } else {
      setSelectedConcernFilter(concernId);
      setCurrentPage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#F5F1E8] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2 block">
            TARGETED FORMULATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-3">
            Find Care for Your Skin
          </h2>
          <p className="text-sm text-[#6E685F] font-light">
            Every face is unique. Select your predominant skin concern to discover dermatologically guided daily solutions.
          </p>
        </div>

        {/* 5 Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {concernCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id, card.productKey)}
              className="group cursor-pointer bg-[#FAF7F2] rounded border border-[#E5DFD3] hover:border-[#C4A468] transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/5] bg-[#EFE9DD] overflow-hidden p-4 flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#153323] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-[10px] text-[#706B62] font-medium tracking-wide">
                  {card.tag}
                </div>
              </div>

              {/* Text info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#153323] mb-1.5 group-hover:text-[#1E422F]">
                    {card.title}
                  </h3>
                  <p className="text-[12px] text-[#6E685F] font-light leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE7DC] flex items-center justify-between text-xs font-medium text-[#153323]">
                  <span>Explore {card.productName.split(' ')[0]}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
