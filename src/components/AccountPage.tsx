import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, Heart, MapPin, Truck, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, products, setCurrentPage, setSelectedProductDetail } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address' | 'profile'>('orders');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-[#2E7D32] bg-[#E8F5E9] border-[#C8E6C9]';
      case 'Shipped':
        return 'text-[#1565C0] bg-[#E3F2FD] border-[#BBDEFB]';
      case 'Processing':
      case 'Ready for Dispatch':
        return 'text-[#E65100] bg-[#FFF3E0] border-[#FFE0B2]';
      default:
        return 'text-[#153323] bg-[#EFE9DD] border-[#D9D3C5]';
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE7DC] pb-8 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C8578] mb-1.5 block">
              ADSIM MEMBER DASHBOARD
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#153323] font-normal tracking-tight">
              Customer Account
            </h1>
            <p className="text-xs text-[#706B62] font-light mt-1">
              Track deliveries, view past skincare orders, and manage saved essentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#153323] text-white flex items-center justify-center font-serif text-base font-semibold">
              AS
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#153323] block">Aarti Sharma</span>
              <span className="text-[#8C8578]">aarti.sharma@example.com</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DFD3] text-xs font-medium space-x-8 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all relative ${
              activeTab === 'orders' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Tracking ({orders.length})</span>
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all relative ${
              activeTab === 'wishlist' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
            {activeTab === 'wishlist' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`pb-3 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all relative ${
              activeTab === 'address' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
            {activeTab === 'address' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all relative ${
              activeTab === 'profile' ? 'text-[#153323] font-semibold' : 'text-[#8C8578] hover:text-[#2C2C2A]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
            {activeTab === 'profile' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#153323]" />}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#ECE7DC] rounded-lg">
                <Package className="w-12 h-12 text-[#8C8578] mx-auto mb-3 stroke-[1.4]" />
                <h3 className="font-serif text-2xl text-[#153323] mb-1">No orders placed yet</h3>
                <p className="text-xs text-[#706B62] mb-6">Discover everyday formulas made for Indian skin.</p>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider rounded font-medium"
                >
                  Shop Best Sellers
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-[#E5DFD3] rounded-lg p-6 shadow-xs space-y-4">
                  
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#ECE7DC] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-semibold text-[#153323]">Order #{ord.id}</span>
                      <span className="text-xs text-[#8C8578]">Placed on {ord.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded border ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 text-xs divide-y divide-[#F5F2EB]">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="pt-2 flex justify-between items-center">
                        <span className="font-medium text-[#2C2C2A]">{item.quantity}x {item.productName}</span>
                        <span className="font-serif font-medium text-[#153323] tabular-nums">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking status progression */}
                  <div className="pt-3 border-t border-[#ECE7DC]">
                    <div className="flex items-center justify-between text-[11px] text-[#706B62] mb-2 font-medium">
                      <span>Order Received</span>
                      <span>Order Confirmed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="w-full bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#153323] h-full transition-all rounded-full"
                        style={{
                          width: ord.status === 'Delivered' ? '100%' : ord.status === 'Shipped' ? '80%' : ord.status === 'Processing' ? '50%' : '25%'
                        }}
                      />
                    </div>
                  </div>

                  {/* Summary & Shipping details */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#635E55] gap-2">
                    <div>
                      <span>Shipped to: <strong>{ord.address}, {ord.city}</strong> • Payment via {ord.paymentMethod}</span>
                    </div>
                    <div className="font-serif text-base font-semibold text-[#153323]">
                      Total Paid: ₹{ord.total}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#ECE7DC] rounded-lg">
                <Heart className="w-12 h-12 text-[#8C8578] mx-auto mb-3 stroke-[1.4]" />
                <h3 className="font-serif text-2xl text-[#153323] mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-[#706B62] mb-6">Explore our targeted skincare range and tap the heart icon to save products.</p>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider rounded font-medium"
                >
                  Explore Skincare
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'address' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-[#153323] rounded-lg p-6 relative shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#153323] bg-[#EFE9DD] px-2 py-0.5 rounded">
                  Default Delivery Address
                </span>
                <span className="text-xs text-[#2E7D32] font-medium">Verified</span>
              </div>
              <h3 className="font-serif text-lg text-[#153323] font-semibold">Aarti Sharma</h3>
              <p className="text-xs text-[#635E55] leading-relaxed mt-1">
                Flat 402, Green Meadows Apartment, Sector 62<br />
                Noida, Uttar Pradesh - 201301<br />
                Mobile: +91 98765 43210
              </p>
            </div>

            <div className="bg-white border border-dashed border-[#D9D3C5] rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#153323] transition-colors cursor-pointer">
              <MapPin className="w-8 h-8 text-[#8C8578] mb-2 stroke-[1.4]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#153323]">+ Add New Indian Address</span>
              <p className="text-[11px] text-[#8C8578] mt-1">Save home or office addresses for fast one-click checkout.</p>
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 sm:p-8 max-w-2xl shadow-xs space-y-5">
            <h2 className="font-serif text-2xl text-[#153323]">Personal Profile</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#635E55] mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  defaultValue="Aarti Sharma"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                />
              </div>
              <div>
                <label className="block text-[#635E55] mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  defaultValue="aarti.sharma@example.com"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                />
              </div>
              <div>
                <label className="block text-[#635E55] mb-1 font-medium">Contact Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D9D3C5] rounded"
                />
              </div>
              <button
                type="button"
                className="px-6 py-2.5 bg-[#153323] text-white text-xs uppercase tracking-wider rounded font-medium hover:bg-[#1E422F]"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
