import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Check, ShoppingBag, X } from 'lucide-react';
import { Product } from '../types';

export const SkinMatchFinder: React.FC = () => {
  const { products, addToCart, setSelectedProductDetail, isSkinMatchOpen, setIsSkinMatchOpen } = useStore();

  const [selectedConcern, setSelectedConcern] = useState<string>('acne');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('oily');

  const concernOptions = [
    { id: 'acne', label: 'Acne / Breakouts', productKey: 'acnova' },
    { id: 'oil-control', label: 'Excess Oil & Shine', productKey: 'oilvera' },
    { id: 'tan-removal', label: 'Tan / Dullness', productKey: 'glowvera' },
    { id: 'hydration', label: 'Dryness & Sensitivity', productKey: 'hydrovia' },
    { id: 'barrier-repair', label: 'Rough / Dehydrated Texture', productKey: 'moisturizing-yogurt-cream' }
  ];

  const skinTypeOptions = [
    { id: 'oily', label: 'Oily Skin' },
    { id: 'combination', label: 'Combination Skin' },
    { id: 'dry', label: 'Dry / Flaky Skin' },
    { id: 'sensitive', label: 'Sensitive Skin' },
    { id: 'normal', label: 'Normal Skin' }
  ];

  // Determine matched products: 1 primary face wash/treatment + 1 moisturizer
  const currentConcernObj = concernOptions.find(c => c.id === selectedConcern) || concernOptions[0];
  const primaryProduct = products.find(p => p.id === currentConcernObj.productKey) || products[0];
  const moisturizer = products.find(p => p.id === 'moisturizing-yogurt-cream');

  const handleAddRoutineToCart = () => {
    if (primaryProduct) addToCart(primaryProduct, 1);
    if (moisturizer && primaryProduct.id !== moisturizer.id) addToCart(moisturizer, 1);
    if (isSkinMatchOpen) setIsSkinMatchOpen(false);
  };

  const content = (
    <div className="bg-[#FAF7F2] rounded-lg border border-[#E5DFD3] p-6 sm:p-10 shadow-sm">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A468]" />
            <span>INTERACTIVE ROUTINE MATCH</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
            Find Your Skin Match
          </h2>
          <p className="text-sm text-[#706B62] font-light max-w-lg mx-auto">
            Answer two quick questions to discover your personalized ADSIM CARE regimen.
          </p>
        </div>

        {/* Step 1: Main Concern */}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest font-semibold text-[#153323] mb-3">
            1. What is your primary skin concern?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {concernOptions.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedConcern(option.id)}
                className={`py-3 px-3 text-xs tracking-wide rounded border text-left sm:text-center transition-all flex items-center justify-between sm:justify-center ${
                  selectedConcern === option.id
                    ? 'bg-[#153323] text-white border-[#153323] font-medium shadow-xs'
                    : 'bg-white text-[#4A4742] border-[#E0D9CC] hover:border-[#153323]'
                }`}
              >
                <span>{option.label}</span>
                {selectedConcern === option.id && <Check className="w-3.5 h-3.5 sm:hidden ml-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Skin Type */}
        <div className="mb-10">
          <label className="block text-xs uppercase tracking-widest font-semibold text-[#153323] mb-3">
            2. How does your skin feel by midday?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {skinTypeOptions.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedSkinType(type.id)}
                className={`py-2.5 px-3 text-xs tracking-wide rounded border text-center transition-all ${
                  selectedSkinType === type.id
                    ? 'bg-[#FAF7F2] text-[#153323] border-[#153323] font-semibold'
                    : 'bg-white text-[#6E685F] border-[#E0D9CC] hover:border-[#8C8578]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Routine Result Box */}
        <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-4 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A69F91] block">RECOMMENDED ROUTINE</span>
              <h3 className="font-serif text-2xl text-[#153323]">Your Everyday Ritual</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#8C8578]">Estimated routine value</span>
              <div className="font-serif text-lg font-medium text-[#2C2C2A]">
                ₹{(primaryProduct.price + (moisturizer && primaryProduct.id !== moisturizer.id ? moisturizer.price : 0))}
              </div>
            </div>
          </div>

          {/* Routine Products Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Step A: Cleanser */}
            <div 
              onClick={() => setSelectedProductDetail(primaryProduct)}
              className="flex items-center gap-4 p-3 rounded border border-[#F0EBE1] hover:border-[#153323] transition-all cursor-pointer group bg-[#FAF7F2]/60"
            >
              <img
                src={primaryProduct.images[0]}
                alt={primaryProduct.name}
                className="w-16 h-20 object-contain bg-white rounded p-1"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A8477]">STEP 1: CLEANSE</span>
                <h4 className="font-serif text-base font-semibold text-[#153323] group-hover:text-[#1E422F]">
                  {primaryProduct.name}
                </h4>
                <p className="text-[11px] text-[#6E685F] line-clamp-1">{primaryProduct.positioning}</p>
                <span className="text-xs font-serif font-medium text-[#2C2C2A] mt-1 block">₹{primaryProduct.price}</span>
              </div>
            </div>

            {/* Step B: Moisturize */}
            {moisturizer && primaryProduct.id !== moisturizer.id ? (
              <div 
                onClick={() => setSelectedProductDetail(moisturizer)}
                className="flex items-center gap-4 p-3 rounded border border-[#F0EBE1] hover:border-[#153323] transition-all cursor-pointer group bg-[#FAF7F2]/60"
              >
                <img
                  src={moisturizer.images[0]}
                  alt={moisturizer.name}
                  className="w-16 h-20 object-contain bg-white rounded p-1"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8477]">STEP 2: HYDRATE</span>
                  <h4 className="font-serif text-base font-semibold text-[#153323] group-hover:text-[#1E422F]">
                    {moisturizer.name}
                  </h4>
                  <p className="text-[11px] text-[#6E685F] line-clamp-1">{moisturizer.positioning}</p>
                  <span className="text-xs font-serif font-medium text-[#2C2C2A] mt-1 block">₹{moisturizer.price}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-3 rounded border border-[#F0EBE1] bg-[#FAF7F2]/60 text-xs text-[#706B62]">
                Apply your matched face wash twice daily followed by sunscreen in the morning for optimal results.
              </div>
            )}
          </div>

          {/* Action Button & Medical Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ECE7DC]">
            <p className="text-[11px] text-[#999285] max-w-md">
              * Note: Routine recommendations are cosmetic suggestions based on skin concern profiles and are not intended as medical diagnosis or treatment.
            </p>
            <button
              onClick={handleAddRoutineToCart}
              className="w-full sm:w-auto px-6 py-3 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.18em] font-medium rounded transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD ROUTINE TO CART</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );

  // If in Modal mode
  if (isSkinMatchOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl my-8">
          <button
            onClick={() => setIsSkinMatchOpen(false)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-[#2C2C2A] flex items-center justify-center shadow-md hover:bg-[#F2ECE1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  // Normal embedded section on homepage
  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24 border-b border-[#ECE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
