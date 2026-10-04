import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Zap, MessageCircle, Star, ShieldCheck, RotateCw, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductDetail,
    setSelectedProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentPage,
    settings
  } = useStore();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'how-to' | 'specs'>('benefits');

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductDetail(null);
    setCurrentPage('cart');
  };

  const handleWhatsAppAsk = () => {
    const text = encodeURIComponent(
      `Hello ADSIM CARE! I'm interested in ${product.name} (${product.category}, ₹${product.price}). Could you tell me more about how it works for my skin concern?`
    );
    window.open(`https://wa.me/${settings.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-2xl border border-[#D9D3C5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          aria-label="Close product preview"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#2C2C2A] flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Gallery (6 cols) */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              {/* Main Image Stage */}
              <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden border border-[#E5DFD3] flex items-center justify-center p-6 relative">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={`${product.name} view`}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Flip button */}
                {product.images.length > 1 && (
                  <button
                    onClick={() => setSelectedImageIdx(selectedImageIdx === 0 ? 1 : 0)}
                    className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs font-semibold text-[#153323] bg-white/95 px-3 py-1.5 border border-[#D9D3C5] rounded-full shadow-sm hover:bg-[#FAF7F2]"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#153323]" />
                    <span>{selectedImageIdx === 0 ? 'View Back Label' : 'View Front Bottle'}</span>
                  </button>
                )}

                {product.isBestSeller && (
                  <span className="absolute top-4 left-4 bg-white border border-[#D9D3C5] text-[#153323] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Thumbnails row (Front & Back) */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`flex-1 py-2 px-3 rounded-lg border bg-white flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                        selectedImageIdx === idx 
                          ? 'border-[#153323] ring-1 ring-[#153323] text-[#153323]' 
                          : 'border-[#E0D9CC] text-[#8C8578] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{idx === 0 ? 'Front View' : 'Back Label / Specs'}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Verified Trust Badge */}
              <div className="p-3.5 bg-white border border-[#ECE7DC] rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#153323] shrink-0" />
                <div className="text-xs text-[#5A554C]">
                  <strong className="text-[#153323]">100% Genuine ADSIM CARE Formulation</strong>
                  <p className="text-[11px] text-[#7A756B]">Manufactured with GMP standards and marketed by ADSIM CARE PVT LTD, New Delhi.</p>
                </div>
              </div>
            </div>

            {/* Right: Info & Actions (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-[#8C8578] uppercase tracking-wider mb-2">
                  <span>{product.category} • {product.size}</span>
                  {product.rating > 0 && (
                    <div className="flex items-center gap-1 text-[#2C2C2A]">
                      <Star className="w-3.5 h-3.5 fill-[#C4A468] text-[#C4A468]" />
                      <span className="font-semibold tabular-nums">{product.rating}</span>
                      <span className="text-[#8C8578]">({product.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight mb-2">
                  {product.name}
                </h1>

                {/* Positioning Statement */}
                <div className="text-sm font-medium text-[#706B62] mb-3">
                  {product.positioning}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#ECE7DC]">
                  <span className="font-serif text-3xl text-[#153323] font-semibold tabular-nums">
                    ₹{product.price}
                  </span>
                  {product.salePrice && product.salePrice > product.price && (
                    <span className="text-sm text-[#999285] line-through font-serif tabular-nums">
                      MRP ₹{product.salePrice}
                    </span>
                  )}
                  <span className="text-xs text-[#8C8578]">inclusive of all taxes</span>
                  <span className="text-xs text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded font-medium">In Stock</span>
                </div>

                {/* Target Skin Concern */}
                <div className="mb-4 text-xs text-[#635E55]">
                  <span className="font-semibold uppercase tracking-wider text-[#153323]">Target Concern: </span>
                  <span>{product.skinConcernLabel} ({product.suitableFor})</span>
                </div>

                {/* Key Ingredients */}
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C8578] block mb-2">
                    Key Active Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.keyIngredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-white border border-[#DFD8CC] px-2.5 py-1 rounded text-[#153323]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity and Primary Buttons */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D9D3C5] rounded-full bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-sm text-[#4A4742] hover:bg-[#F2ECE1] rounded-l-full"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 text-xs font-semibold text-[#2C2C2A] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-sm text-[#4A4742] hover:bg-[#F2ECE1] rounded-r-full"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 py-3.5 px-6 bg-black hover:bg-[#153323] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-3 border border-[#D9D3C5] rounded-full bg-white hover:bg-[#F2ECE1] text-[#2C2C2A] transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#B85D5D] text-[#B85D5D]' : ''}`} />
                    </button>
                  </div>

                  {/* Buy Now & WhatsApp Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleBuyNow}
                      className="py-3 px-4 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.16em] font-medium rounded-full transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#C4A468]" />
                      <span>BUY NOW</span>
                    </button>

                    <button
                      onClick={handleWhatsAppAsk}
                      className="py-3 px-4 border border-[#25D366] text-[#128C7E] bg-white hover:bg-[#F0FFF4] text-xs uppercase tracking-[0.14em] font-medium rounded-full transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>ASK ON WHATSAPP</span>
                    </button>
                  </div>
                </div>

                {/* Free shipping reminder */}
                <div className="text-[11px] text-[#706B62] flex items-center gap-1.5 mb-6">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Free delivery across India on orders over ₹{settings.freeShippingThreshold}</span>
                </div>

              </div>

              {/* Tabs Section: Benefits, How to Use, INCI Full Ingredients, Batch Info */}
              <div className="border-t border-[#ECE7DC] pt-5">
                <div className="flex border-b border-[#E5DFD3] text-xs font-medium space-x-6 mb-4">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 uppercase tracking-wider transition-all relative ${
                      activeTab === 'benefits' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
                    }`}
                  >
                    Benefits
                    {activeTab === 'benefits' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('how-to')}
                    className={`pb-2 uppercase tracking-wider transition-all relative ${
                      activeTab === 'how-to' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
                    }`}
                  >
                    How to Use
                    {activeTab === 'how-to' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 uppercase tracking-wider transition-all relative ${
                      activeTab === 'ingredients' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
                    }`}
                  >
                    Full INCI
                    {activeTab === 'ingredients' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 uppercase tracking-wider transition-all relative ${
                      activeTab === 'specs' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
                    }`}
                  >
                    Batch & Mfg
                    {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="text-xs text-[#5A554C] leading-relaxed min-h-[90px]">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#153323] font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'how-to' && (
                    <ol className="space-y-2">
                      {product.howToUse.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#EFE9DD] text-[#153323] font-medium flex items-center justify-center text-[10px] shrink-0">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="font-mono text-[11px] text-[#635E55] bg-white p-3 rounded-lg border border-[#E5DFD3] leading-relaxed">
                        {product.fullIngredients}
                      </p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-lg border border-[#E5DFD3] text-[11px]">
                      <div>
                        <span className="text-[#8C8578] block">Batch Number:</span>
                        <strong className="text-[#153323] font-mono">{product.batchNo}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8578] block">Mfg / Exp Date:</span>
                        <strong className="text-[#153323] font-mono">{product.mfgExp}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#8C8578] block">Manufactured / Marketed By:</span>
                        <strong className="text-[#153323]">{product.mfgBy}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8578] block">License No:</span>
                        <strong className="text-[#153323] font-mono">{product.licNo}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8578] block">Origin:</span>
                        <strong className="text-[#153323]">100% Made in India</strong>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
