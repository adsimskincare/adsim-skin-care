import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThemeCategoryBanners } from './components/ThemeCategoryBanners';
import { NewArrivals } from './components/NewArrivals';
import { BrandStory } from './components/BrandStory';
import { BestSellers } from './components/BestSellers';
import { ModelSpotlightSection } from './components/ModelSpotlightSection';
import { SkinConcernStrip } from './components/SkinConcernStrip';
import { SkinMatchFinder } from './components/SkinMatchFinder';
import { RoutineSteps } from './components/RoutineSteps';
import { CustomerReviews } from './components/CustomerReviews';
import { TrustBar } from './components/TrustBar';
import { Footer } from './components/Footer';

// Dedicated Pages
import { ShopPage } from './components/ShopPage';
import { SkinConcernsPage } from './components/SkinConcernsPage';
import { AboutPage } from './components/AboutPage';
import { JournalPage } from './components/JournalPage';
import { ContactPage } from './components/ContactPage';
import { AccountPage } from './components/AccountPage';
import { AdminDashboard } from './components/AdminDashboard';

// Modals & Overlays
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const MainLayout: React.FC = () => {
  const { currentPage, isSkinMatchOpen } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2C2C2A]">
      {/* Header */}
      <Header />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero />
            <ThemeCategoryBanners />
            <NewArrivals />
            <BrandStory />
            <BestSellers />
            <ModelSpotlightSection />
            <SkinConcernStrip />
            <SkinMatchFinder />
            <RoutineSteps />
            <CustomerReviews />
            <TrustBar />
          </>
        )}

        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'concerns' && <SkinConcernsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'journal' && <JournalPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Overlays & Drawers */}
      <ProductDetailModal />
      
      <CartDrawer 
        onProceedToCheckout={() => setIsCheckoutOpen(true)} 
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <QuickSearchModal />

      {/* Skin Match Finder in Modal mode if triggered */}
      {isSkinMatchOpen && currentPage !== 'home' && (
        <SkinMatchFinder />
      )}

      {/* Floating WhatsApp Assistance */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
