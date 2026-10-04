import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const ModelSpotlightSection: React.FC = () => {
  const { products, setSelectedProductDetail, addToCart, settings } = useStore();

  const acnova = products.find(p => p.id === 'acnova');
  const yogurtCream = products.find(p => p.id === 'moisturizing-yogurt-cream');
  const modelImg = settings.customModelUrl || '/src/assets/images/adsim_model_skincare_routine_1791143295478.jpg';

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Contracted Model Portrait */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden border border-[#E5DFD3] shadow-xl bg-[#FAF7F2] aspect-[3/4] relative group">
                <img
                  src={modelImg}
                  alt="ADSIM CARE contracted brand model with radiant dewy skin"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C4A468] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C4A468]" />
                    <span>Contracted Brand Face</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    Everyday Indian Radiance
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-0.5">
                    "I cleanse with Acnova every morning and seal moisture with Yogurt Cream. It keeps my skin clear and glowing all day long."
                  </p>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -top-3 -right-3 bg-[#FAF7F2] border border-[#C4A468] px-3 py-1.5 rounded-full shadow-md text-[11px] font-semibold text-[#153323] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C4A468]" />
                <span>100% Authentic Ambassador</span>
              </div>
            </div>
          </div>

          {/* Right Column: Her Matched Everyday Routine */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] block">
              REAL ROUTINES • REAL RESULTS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#153323] font-normal tracking-tight leading-[1.15]">
              Cleanse. Hydrate. Glow.
            </h2>

            <p className="text-sm text-[#5A554C] leading-relaxed font-light">
              Our official contracted model showcases the transformative simplicity of ADSIM CARE. Formulated specifically for Indian skin facing humidity, dust, and intense sunlight.
            </p>

            {/* Product duo cards */}
            <div className="space-y-3 pt-2">
              {acnova && (
                <div 
                  onClick={() => setSelectedProductDetail(acnova)}
                  className="flex items-center justify-between p-3.5 bg-[#FAF7F2] hover:bg-[#F5F1E8] border border-[#E5DFD3] rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={acnova.images[0]} alt="" className="w-12 h-14 object-contain bg-white rounded p-1" />
                    <div>
                      <span className="text-[10px] uppercase text-[#8C8578] tracking-wider font-semibold">Morning & Evening Cleanse</span>
                      <h4 className="font-serif text-base font-semibold text-[#153323]">{acnova.name} ({acnova.category})</h4>
                      <span className="text-xs font-serif font-medium text-[#2C2C2A]">₹{acnova.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(acnova, 1);
                    }}
                    className="px-3 py-1.5 bg-black hover:bg-[#153323] text-white text-[11px] uppercase tracking-wider font-medium rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              {yogurtCream && (
                <div 
                  onClick={() => setSelectedProductDetail(yogurtCream)}
                  className="flex items-center justify-between p-3.5 bg-[#FAF7F2] hover:bg-[#F5F1E8] border border-[#E5DFD3] rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={yogurtCream.images[0]} alt="" className="w-12 h-14 object-contain bg-white rounded p-1" />
                    <div>
                      <span className="text-[10px] uppercase text-[#8C8578] tracking-wider font-semibold">Barrier Hydration</span>
                      <h4 className="font-serif text-base font-semibold text-[#153323]">{yogurtCream.name}</h4>
                      <span className="text-xs font-serif font-medium text-[#2C2C2A]">₹{yogurtCream.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(yogurtCream, 1);
                    }}
                    className="px-3 py-1.5 bg-black hover:bg-[#153323] text-white text-[11px] uppercase tracking-wider font-medium rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  if (acnova) addToCart(acnova, 1);
                  if (yogurtCream) addToCart(yogurtCream, 1);
                }}
                className="px-8 py-3.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all shadow-sm flex items-center gap-2"
              >
                <span>Add Complete Routine (₹{((acnova?.price || 0) + (yogurtCream?.price || 0))})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
