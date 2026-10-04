import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDIAN_STATES = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 
  'Haryana', 'West Bengal', 'Rajasthan', 'Telangana', 'Punjab', 'Kerala', 
  'Madhya Pradesh', 'Bihar', 'Andhra Pradesh', 'Assam', 'Goa', 'Himachal Pradesh', 
  'Jammu & Kashmir', 'Jharkhand', 'Odisha', 'Uttarakhand'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, settings, createOrder, setCurrentPage } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: 'Delhi',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const shippingFee = cartSubtotal >= settings.freeShippingThreshold ? 0 : settings.standardShippingFee;
  const totalAmount = cartSubtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!formData.name || !formData.mobile || !formData.email || !formData.address || !formData.city || !formData.pincode) {
      setFormError('Please fill in all delivery address fields.');
      return;
    }

    if (formData.pincode.length !== 6 || isNaN(Number(formData.pincode))) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    if (formData.mobile.replace(/[^0-9]/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    // Save order into persistent state
    setTimeout(() => {
      const order = createOrder({
        customerName: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: cart.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal: cartSubtotal,
        shipping: shippingFee,
        discount: 0,
        total: totalAmount,
        paymentMethod: paymentMethod
      });

      setIsProcessing(false);
      setConfirmedOrderId(order.id);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-lg border border-[#D9D3C5] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-[#ECE7DC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#153323]" />
            <h2 className="font-serif text-xl font-semibold text-[#153323]">
              {confirmedOrderId ? 'Order Confirmation' : 'Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F2ECE1] text-[#4A4742]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {confirmedOrderId ? (
            /* Order Placed View */
            <div className="text-center py-8 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] flex items-center justify-center mx-auto text-[#2E7D32]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="font-serif text-3xl text-[#153323]">Thank you for your order!</h3>
              <p className="text-sm text-[#5A554C]">
                Your ADSIM CARE order <strong className="font-mono text-[#153323]">#{confirmedOrderId}</strong> has been received and confirmed.
              </p>

              <div className="bg-white border border-[#E5DFD3] rounded p-4 text-left text-xs space-y-2 mt-6">
                <div className="flex justify-between border-b border-[#ECE7DC] pb-2 font-semibold text-[#153323]">
                  <span>Delivery to:</span>
                  <span>{formData.name}</span>
                </div>
                <p className="text-[#635E55]">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
                <p className="text-[#635E55]">Contact: {formData.mobile} • {formData.email}</p>
                <div className="pt-2 border-t border-[#ECE7DC] flex justify-between font-medium text-[#153323]">
                  <span>Total Payable:</span>
                  <span className="font-serif text-sm">₹{totalAmount} ({paymentMethod})</span>
                </div>
              </div>

              <p className="text-xs text-[#8C8578]">
                A confirmation has been sent to your email and our dispatch team in New Delhi is preparing your parcel.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    onClose();
                    setCurrentPage('account');
                  }}
                  className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider font-medium rounded hover:bg-[#1E422F]"
                >
                  Track in Customer Account
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentPage('home');
                  }}
                  className="px-6 py-2.5 border border-[#D9D3C5] text-[#2C2C2A] text-xs uppercase tracking-wider font-medium rounded hover:bg-white"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C53929] text-xs rounded">
                  {formError}
                </div>
              )}

              {/* Order items preview summary */}
              <div className="bg-white border border-[#E5DFD3] p-4 rounded text-xs space-y-2">
                <div className="font-semibold uppercase tracking-wider text-[#153323] text-[10px]">
                  Order Items ({cart.length})
                </div>
                <div className="divide-y divide-[#F5F2EB]">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-1.5 flex justify-between items-center">
                      <span>{item.quantity}x {item.product.name} ({item.product.category})</span>
                      <span className="font-serif font-medium tabular-nums">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#ECE7DC] flex justify-between text-sm font-semibold text-[#153323]">
                  <span>Total Amount</span>
                  <span className="font-serif tabular-nums">₹{totalAmount}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="font-serif text-lg text-[#153323] mb-3">Shipping Address (India)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarti Sharma"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#635E55] mb-1 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. aarti@example.com"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#635E55] mb-1 font-medium">Street Address / House No / Apartment *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Flat 301, Palm Court, Sector 15"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded focus:outline-hidden focus:border-[#153323]"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#635E55] mb-1 font-medium">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="e.g. 110096"
                      className="w-full p-2.5 bg-white border border-[#D9D3C5] rounded font-mono focus:outline-hidden focus:border-[#153323]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2 border-t border-[#ECE7DC]">
                <h3 className="font-serif text-lg text-[#153323] mb-3">Select Payment Method</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'UPI' ? 'border-[#153323] bg-white font-semibold text-[#153323]' : 'border-[#D9D3C5] bg-[#FAF7F2] text-[#635E55]'
                    }`}
                  >
                    UPI (GPay / PhonePe)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'Card' ? 'border-[#153323] bg-white font-semibold text-[#153323]' : 'border-[#D9D3C5] bg-[#FAF7F2] text-[#635E55]'
                    }`}
                  >
                    Credit / Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-3 rounded border text-center transition-all ${
                      paymentMethod === 'NetBanking' ? 'border-[#153323] bg-white font-semibold text-[#153323]' : 'border-[#D9D3C5] bg-[#FAF7F2] text-[#635E55]'
                    }`}
                  >
                    Net Banking
                  </button>

                  {settings.enableCod && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-3 rounded border text-center transition-all ${
                        paymentMethod === 'COD' ? 'border-[#153323] bg-white font-semibold text-[#153323]' : 'border-[#D9D3C5] bg-[#FAF7F2] text-[#635E55]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  )}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-3 p-3 bg-white border border-[#E5DFD3] rounded text-xs">
                    <label className="block text-[#635E55] mb-1">Enter your UPI ID / VPA (Optional):</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. name@okhdfcbank or 9876543210@paytm"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#D9D3C5] rounded font-mono"
                    />
                    <p className="text-[11px] text-[#8C8578] mt-1">
                      A payment request will be sent to your UPI app for authorization upon completing checkout.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#ECE7DC]">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#153323] hover:bg-[#1E422F] text-white text-xs uppercase tracking-[0.2em] font-medium rounded transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>CONFIRMING ORDER...</span>
                  ) : (
                    <>
                      <span>CONFIRM ORDER • ₹{totalAmount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C8578] mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#153323]" />
                  <span>256-Bit SSL Encrypted Indian Gateway Connection</span>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
