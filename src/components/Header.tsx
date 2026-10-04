import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, User, Heart, ShoppingBag, Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
import { PageRoute } from '../types';
import { AdsimLogo } from './AdsimLogo';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedConcernFilter,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    settings
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchInput, setHeaderSearchInput] = useState('');

  const handleNavClick = (page: PageRoute, concern?: string) => {
    setCurrentPage(page);
    if (concern !== undefined) {
      setSelectedConcernFilter(concern);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', page: 'home' as PageRoute },
    { label: 'About us', page: 'about' as PageRoute },
    { label: 'New Arrival', page: 'shop' as PageRoute, filter: 'new-arrivals' },
    { label: 'Shop', page: 'shop' as PageRoute },
    { label: 'Skincare', page: 'concerns' as PageRoute },
    { label: 'Face Wash', page: 'shop' as PageRoute, filter: 'face-wash' },
    { label: 'Best Sellers', page: 'shop' as PageRoute, filter: 'best-sellers' },
    { label: 'Contact us', page: 'contact' as PageRoute },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAE6DF] shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#153323] text-[#FAF7F2] px-4 py-2 text-center text-[11px] tracking-wider font-light flex items-center justify-center gap-2">
        <span>{settings.announcementText}</span>
      </div>

      {/* Main Row: Search on Left, Official Logo in Center, Account & Cart on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Left: Search Box (Inspired by Reference Screenshot) */}
        <div className="hidden md:flex items-center w-64 lg:w-72">
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-1.5 border border-[#D9D3C5] rounded-xs bg-[#FAF7F2]/60 hover:bg-white text-xs text-[#7A756B] cursor-pointer transition-colors"
          >
            <Search className="w-4 h-4 text-[#8C8578] shrink-0" />
            <span className="truncate">Search products, ingredients...</span>
          </div>
        </div>

        {/* Center: Official ADSIM Company Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center justify-center"
        >
          <AdsimLogo size="md" />
        </div>

        {/* Right: User, Currency, Cart */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-[#2C2C2A]">
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search skincare products"
            className="md:hidden p-1.5 hover:text-[#153323] transition-colors rounded-full"
          >
            <Search className="w-5 h-5 stroke-[1.6]" />
          </button>

          {/* Account */}
          <button
            onClick={() => handleNavClick('account')}
            aria-label="Customer Account"
            className="flex items-center gap-1 text-xs hover:text-[#153323] transition-colors"
          >
            <User className="w-4 h-4 stroke-[1.6]" />
            <span className="hidden sm:inline font-medium">Account</span>
          </button>

          {/* Currency indicator (India ₹) */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-[#635E55] border-l border-[#ECE7DC] pl-4">
            <span className="font-semibold text-[#153323]">IN</span>
            <span>·</span>
            <span>₹ INR</span>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('account')}
            aria-label="Saved Wishlist"
            className="hover:text-[#153323] transition-colors relative hidden sm:block"
          >
            <Heart className="w-5 h-5 stroke-[1.6]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C4A468] rounded-full" />
            )}
          </button>

          {/* Shopping Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart Bag"
            className="flex items-center gap-1.5 hover:text-[#153323] transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
            <span className="text-xs font-semibold tabular-nums text-[#153323]">
              ({cartCount})
            </span>
          </button>

          {/* Admin link */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Admin Portal"
            className="hidden xl:flex items-center gap-1 text-[10px] text-[#6E685F] hover:text-[#153323] px-2 py-0.5 border border-[#DDD6C9] rounded hover:border-[#153323] transition-all tracking-wider"
          >
            <ShieldCheck className="w-3 h-3 text-[#153323]" />
            <span>ADMIN</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1 hover:text-[#153323]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar (Centered clean links matching the theme screenshot) */}
      <nav className="hidden lg:flex items-center justify-center space-x-8 py-2.5 border-t border-[#F0EBE1] text-xs font-medium text-[#4A4742]">
        {navItems.map((item) => {
          const isActive = currentPage === item.page && (!item.filter || item.filter === 'best-sellers');
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page, item.filter)}
              className={`transition-colors py-1 relative tracking-wide ${
                isActive 
                  ? 'text-[#153323] font-semibold' 
                  : 'hover:text-[#153323]'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#153323] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ECE7DC] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-xs tracking-wider text-[#3D3A35] font-medium">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.filter)}
                className="text-left py-2 hover:text-[#153323] border-b border-[#F0EBE1] flex justify-between items-center"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#99948B]">→</span>
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-[#153323] font-semibold flex items-center gap-2 pt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
