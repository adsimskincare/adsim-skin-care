import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Instagram, Sparkles } from 'lucide-react';

export const UgcSection: React.FC = () => {
  const { ugcItems, products, setSelectedProductDetail } = useStore();

  const activeUgc = ugcItems.filter(u => u.isPublished && u.isHomepageFeatured);

  const handleShopProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProductDetail(product);
    }
  };

  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#ECE7DC]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#153323]" />
              <span>COMMUNITY STORIES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight">
              See ADSIM CARE in Real Life
            </h2>
            <p className="text-sm text-[#706B62] mt-1 font-light">
              Real routines. Real products. Everyday skincare.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-[#8C8578] tracking-wider">
            Tag <span className="text-[#153323] font-medium">@adsim.care</span> to be featured
          </div>
        </div>

        {/* UGC Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeUgc.map((item) => {
            const linkedProduct = products.find(p => p.id === item.productId);

            return (
              <div
                key={item.id}
                className="group relative bg-[#FFFFFF] border border-[#E5DFD3] rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                {/* Media Container (Portrait 3:4) */}
                <div className="relative aspect-[3/4] bg-[#EDE7DA] overflow-hidden">
                  <img
                    src={item.mediaUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Scrim for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Creator Info Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2 py-1 rounded text-[11px]">
                      <Sparkles className="w-3 h-3 text-[#C4A468]" />
                      <span className="font-medium">{item.creatorName}</span>
                    </div>
                    {item.creatorHandle && (
                      <span className="text-[10px] text-white/80">{item.creatorHandle}</span>
                    )}
                  </div>

                  {/* Caption & Tagged Product Overlay at Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] leading-snug line-clamp-2 text-white/90 mb-3 font-light">
                      “{item.caption}”
                    </p>

                    {/* Linked Product Button */}
                    {linkedProduct && (
                      <button
                        onClick={() => handleShopProduct(linkedProduct.id)}
                        className="w-full py-2 px-3 bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#153323] text-[11px] uppercase tracking-wider font-semibold rounded shadow-sm transition-colors flex items-center justify-between group/btn"
                      >
                        <span className="truncate">Shop {linkedProduct.name} (₹{linkedProduct.price})</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
