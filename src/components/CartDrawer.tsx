import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
    settings
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const differenceToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : settings.standardShippingFee;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const totalAmount = cartSubtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (couponCode.trim().toUpperCase() === 'ADSIMCARE') {
      setDiscountPercent(15);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#ECE7DC] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#ECE7DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#153323]" />
              <h2 className="font-serif text-xl font-semibold text-[#153323]">Your Cart</h2>
              <span className="text-xs text-[#8C8578] font-mono">({cart.length} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#4A4742] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3.5 bg-[#F5F1E8] border-b border-[#ECE7DC] text-xs">
            {differenceToFreeShipping > 0 ? (
              <p className="text-[#635E55] mb-1.5 font-light">
                Add <strong className="text-[#153323] font-semibold">₹{differenceToFreeShipping}</strong> more for <strong>FREE Pan-India Delivery</strong>
              </p>
            ) : (
              <p className="text-[#2E7D32] font-medium flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>You unlocked FREE Pan-India Delivery!</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-[#E5DFD3] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#153323] transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DD] flex items-center justify-center mx-auto mb-4 text-[#8C8578]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.4]" />
                </div>
                <h3 className="font-serif text-xl text-[#153323] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#7A756B] mb-6">Explore our targeted skincare products formulated for everyday Indian living.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-[#1E422F]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded border border-[#ECE7DC] relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-contain bg-[#FAF7F2] rounded p-1"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase text-[#8C8578] tracking-wider">
                        {item.product.category}
                      </div>
                      <h4 className="font-serif text-sm font-semibold text-[#153323]">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-serif font-medium text-[#2C2C2A] tabular-nums mt-0.5">
                        ₹{item.product.price}
                      </div>
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F2EB]">
                      <div className="flex items-center border border-[#D9D3C5] rounded bg-[#FAF7F2]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#5A554C] hover:bg-white"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-medium text-[#153323] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#5A554C] hover:bg-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#999285] hover:text-[#C53929] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#ECE7DC] space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C8578]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon: WELCOME10"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-[#D9D3C5] rounded uppercase font-mono tracking-wider focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F2ECE1] text-[#153323] hover:bg-[#E5DFD3] text-xs uppercase tracking-wider font-semibold rounded"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-[#2E7D32]">Coupon applied successfully ({discountPercent}% off)</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#C53929]">{couponError}</p>
                )}
              </form>

              {/* Summary rows */}
              <div className="space-y-1.5 text-xs text-[#635E55] pt-2 border-t border-[#F5F2EB]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif tabular-nums font-medium text-[#2C2C2A]">₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount</span>
                    <span className="font-serif tabular-nums font-medium">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-serif tabular-nums">
                    {shippingFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#153323] pt-2 border-t border-[#ECE7DC]">
                  <span>Total Amount</span>
                  <span className="font-serif tabular-nums">₹{totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 px-4 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.2em] font-medium rounded transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-[#635E55] hover:text-[#153323] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
