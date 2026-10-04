import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const ThemeCategoryBanners: React.FC = () => {
  const { setCurrentPage, setSelectedConcernFilter } = useStore();

  const categories = [
    {
      title: 'Targeted Skincare',
      subtitle: 'Acne, Sebum & Tan Solutions',
      image: '/src/assets/images/adsim_about_collection_banner_1791143311373.jpg',
      filter: 'all'
    },
    {
      title: 'Face Washes',
      subtitle: 'Gentle everyday cleansing with natural actives',
      image: '/src/assets/images/adsim_category_facewash_1791143323268.jpg',
      filter: 'face-wash'
    },
    {
      title: 'Moisturizers',
      subtitle: 'Deep barrier hydration with Yogurt Cream',
      image: '/src/assets/images/adsim_yogurt_cream_jar_1791141949881.jpg',
      filter: 'barrier-repair'
    }
  ];

  const handleCategoryClick = (filter: string) => {
    setSelectedConcernFilter(filter === 'all' ? null : filter);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-10 lg:py-14 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.filter)}
              className="group relative h-48 sm:h-56 rounded-xl overflow-hidden border border-[#E5DFD3] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center p-6 text-center"
            >
              {/* Background Photography */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] group-hover:bg-white/60 transition-colors" />

              {/* Content text in center */}
              <div className="relative z-10 max-w-xs space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C8578] block">
                  Collection
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#153323] font-normal group-hover:text-[#1E422F]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#635E55] font-light">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#153323]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
