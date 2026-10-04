import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const SkinConcernsPage: React.FC = () => {
  const { products, setSelectedProductDetail, addToCart, setIsSkinMatchOpen } = useStore();

  const concernsDetail = [
    {
      id: 'acne',
      name: 'Acne-Prone Skin & Breakouts',
      subtitle: 'Deep pore purification without surface disruption',
      causes: 'Excess sebum combines with dead epidermal cells and environmental grime, trapping bacteria within the pore lining.',
      ingredients: ['Salicylic Acid (BHA)', 'Green Tea Extract', 'Ethyl Ascorbic Acid', 'Aloe Vera'],
      productKey: 'acnova',
      productName: 'Acnova Acne Care Face Wash',
      size: '100 ml',
      price: 299,
      image: '/src/assets/images/adsim_acnova_bottle_1791141898362.jpg',
      routineTip: 'Cleanse twice daily with lukewarm water. Follow with an oil-free barrier cream and broad-spectrum sunscreen in the morning.'
    },
    {
      id: 'oil-control',
      name: 'Oily & Combination Skin',
      subtitle: 'Long-lasting sebum regulation with refreshing balance',
      causes: 'Elevated tropical temperatures and humidity stimulate facial sebaceous glands, resulting in mid-day shine and congested T-zones.',
      ingredients: ['Salicylic Acid', 'Glycerine', 'Purified DM Water'],
      productKey: 'oilvera',
      productName: 'Oilvera Oil Control Face Wash',
      size: '100 ml',
      price: 299,
      image: '/src/assets/images/adsim_oilvera_bottle_1791141936152.jpg',
      routineTip: 'Avoid stripping soaps that trigger rebound oiliness. Use Oilvera to gently lift impurities and keep skin comfortably matte.'
    },
    {
      id: 'tan-removal',
      name: 'Tan & Environmental Dullness',
      subtitle: 'Antioxidant brightening and post-sun recovery',
      causes: 'Extended exposure to UV rays increases melanin synthesis and oxidative stress, leading to dullness, uneven patches, and tanning.',
      ingredients: ['Ethyl Ascorbic Acid (Stabilized Vitamin C)', 'Aloe Vera Extract', 'Glycerine'],
      productKey: 'glowvera',
      productName: 'Glowvera Tan Remove Face Wash',
      size: '100 ml',
      price: 299,
      image: '/src/assets/images/adsim_glowvera_bottle_1791141909418.jpg',
      routineTip: 'Cleanse every morning and evening after outdoor commuting. Follow with hydrating cream to lock in radiance.'
    },
    {
      id: 'hydration',
      name: 'Dry & Sensitive Skin',
      subtitle: 'Gentle hydration and irritation-soothing comfort',
      causes: 'Weakened lipid barriers allow transepidermal water loss (TEWL), leaving cheeks tight, flaky, reactive, and easily flushed.',
      ingredients: ['Hyaluronic Acid', 'Liquorice Extract', 'Aloe Vera', 'Gentle Scrubbing Beads'],
      productKey: 'hydrovia',
      productName: 'Hydrovia Hydration Face Wash',
      size: '100 ml',
      price: 249,
      image: '/src/assets/images/adsim_hydrovia_bottle_1791141921760.jpg',
      routineTip: 'Hydrovia gently exfoliates flaky micro-patches while drenching dehydrated cells in Hyaluronic moisture.'
    },
    {
      id: 'barrier-repair',
      name: 'Dehydrated / Rough Skin Texture',
      subtitle: 'Intensive moisture replenishment and barrier resilience',
      causes: 'Air conditioning, hard water, pollution, and harsh cleansers deplete skin moisture cushions, creating a rough, crepey surface.',
      ingredients: ['Sodium Hyaluronate', 'Trehalose', 'Allantoin', 'Vitamin E Oil', 'Panthenol'],
      productKey: 'moisturizing-yogurt-cream',
      productName: 'Moisturizing Yogurt Cream',
      size: '50 g',
      price: 499,
      image: '/src/assets/images/adsim_yogurt_cream_jar_1791141949881.jpg',
      routineTip: 'Apply a pea-sized amount over face and neck morning and night. The lightweight yogurt texture melts instantly without clogging pores.'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE7DC] pb-8 mb-12">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
            SKIN HEALTH GUIDE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#153323] font-normal tracking-tight mb-3">
            Targeted Skin Concerns
          </h1>
          <p className="text-sm text-[#706B62] font-light max-w-2xl leading-relaxed">
            Every skin condition has distinct biological triggers. At ADSIM CARE, our formulations pair targeted active compounds with soothing botanicals to address each concern safely and effectively.
          </p>
        </div>

        {/* Interactive Banner Callout */}
        <div className="bg-[#153323] text-white p-6 sm:p-8 rounded-lg mb-14 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4A468] block mb-1">
              NOT SURE WHAT YOUR SKIN NEEDS?
            </span>
            <h3 className="font-serif text-2xl text-[#FAF7F2]">Take the ADSIM Skin Match Diagnostic</h3>
            <p className="text-xs text-[#C2BDB2] mt-1 font-light">
              Receive a customized two-step cleanse and hydrate recommendation in under 30 seconds.
            </p>
          </div>
          <button
            onClick={() => setIsSkinMatchOpen(true)}
            className="px-6 py-3 bg-[#FAF7F2] text-[#153323] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#EAE4D7] shrink-0 flex items-center gap-2"
          >
            <span>LAUNCH FINDER</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C4A468]" />
          </button>
        </div>

        {/* Detailed Concern Cards List */}
        <div className="space-y-12">
          {concernsDetail.map((concern, idx) => {
            const product = products.find(p => p.id === concern.productKey);

            return (
              <div
                key={concern.id}
                className="bg-white border border-[#E5DFD3] rounded-lg p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              >
                {/* Product Image Stage */}
                <div className="w-full lg:w-1/3 flex justify-center bg-[#F3EFE6] rounded-lg p-6 border border-[#ECE7DC] aspect-square relative">
                  <img
                    src={concern.image}
                    alt={concern.productName}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F2] border border-[#D9D3C5] px-2.5 py-1 text-[10px] uppercase font-semibold text-[#153323] rounded">
                    Concern 0{idx + 1}
                  </div>
                </div>

                {/* Information Content */}
                <div className="w-full lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8578] block mb-1">
                      {concern.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#153323] font-normal mb-3">
                      {concern.name}
                    </h2>

                    <div className="space-y-3 text-xs text-[#5A554C] leading-relaxed mb-6">
                      <p>
                        <strong className="text-[#153323]">Root Triggers: </strong>
                        {concern.causes}
                      </p>
                      <p>
                        <strong className="text-[#153323]">ADSIM Routine Advice: </strong>
                        {concern.routineTip}
                      </p>
                    </div>

                    {/* Key actives */}
                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8578] block mb-2">
                        Target Active Ingredients in Formulation:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {concern.ingredients.map((ing, i) => (
                          <span key={i} className="text-xs bg-[#FAF7F2] border border-[#E0D9CC] px-2.5 py-1 rounded text-[#153323]">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-[#ECE7DC] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#8C8578] block">Matched Solution:</span>
                      <div className="font-serif text-lg font-semibold text-[#153323]">
                        {concern.productName} • ₹{concern.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {product && (
                        <button
                          onClick={() => setSelectedProductDetail(product)}
                          className="px-4 py-2.5 border border-[#D9D3C5] hover:border-[#153323] text-xs uppercase tracking-wider font-medium text-[#2C2C2A] rounded transition-all"
                        >
                          View Details
                        </button>
                      )}

                      {product && (
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-6 py-2.5 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-widest font-medium rounded transition-all flex items-center gap-2"
                        >
                          <span>Add to Cart</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
