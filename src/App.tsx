import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeDashboardPage } from './pages/HomeDashboardPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReferralDashboardPage } from './pages/ReferralDashboardPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { WalletDashboardPage } from './pages/WalletDashboardPage';
import { FastFoodPage } from './pages/FastFoodPage';
import { MerchantDashboardPage } from './pages/MerchantDashboardPage';
import { TransportBookingPage } from './pages/TransportBookingPage';
import { AccommodationPage } from './pages/AccommodationPage';
import { KioskStorefrontPage } from './pages/KioskStorefrontPage';
import { UniversalProviderDashboardPage } from './pages/UniversalProviderDashboardPage';
import { MessagingPage } from './pages/MessagingPage';
import { SupermarketDashboardPage } from './pages/SupermarketDashboardPage';
import { SupermarketCustomerPage } from './pages/SupermarketCustomerPage';
import { PharmacyDashboardPage } from './pages/PharmacyDashboardPage';
import { PharmacyCustomerPage } from './pages/PharmacyCustomerPage';
import { BeautyCustomerPage } from './pages/BeautyCustomerPage';
import { BeautyProviderDashboardPage } from './pages/BeautyProviderDashboardPage';
import { LaundryDashboardPage } from './pages/LaundryDashboardPage';
import { LaundryCustomerPage } from './pages/LaundryCustomerPage';
import { ServicesPage } from './pages/ServicesPage';
import { SidebarPage } from './pages/SidebarPage';
import { TrackPage } from './pages/TrackPage';
import { HistoryPage } from './pages/HistoryPage';
import { PitchDeckPage } from './pages/PitchDeckPage';
import { PasswordGate } from './components/pitch/PasswordGate';
import { Sidebar } from './components/Sidebar';
export function App() {
  // Check URL hash to determine if we should show pitch deck or main app
  const isPitchDeckMode = window.location.hash === '#pitch' || window.location.hash === '';
  // Check if pitch deck is unlocked in this session
  const [isPitchDeckUnlocked, setIsPitchDeckUnlocked] = useState(false);
  useEffect(() => {
    const unlocked = sessionStorage.getItem('pitch_deck_unlocked') === 'true';
    setIsPitchDeckUnlocked(unlocked);
  }, []);
  const [activeView, setActiveView] = useState<'pitch-deck' | 'home' | 'kiosk' | 'referral' | 'marketplace' | 'wallet' | 'fastfood' | 'merchant' | 'transport' | 'accommodation' | 'kioskstore' | 'provider' | 'messaging' | 'supermarket' | 'supermarket-customer' | 'pharmacy' | 'pharmacy-customer' | 'beauty-customer' | 'beauty-provider' | 'laundry' | 'laundry-customer' | 'services' | 'sidebar' | 'track' | 'history'>(isPitchDeckMode ? 'pitch-deck' : 'home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleNavigate = (view: 'pitch-deck' | 'home' | 'kiosk' | 'referral' | 'marketplace' | 'wallet' | 'fastfood' | 'merchant' | 'transport' | 'accommodation' | 'kioskstore' | 'provider' | 'messaging' | 'supermarket' | 'supermarket-customer' | 'pharmacy' | 'pharmacy-customer' | 'beauty-customer' | 'beauty-provider' | 'laundry' | 'laundry-customer' | 'services' | 'sidebar' | 'track' | 'history') => {
    setActiveView(view);
    setSidebarOpen(false);
    // Update URL hash
    if (view === 'pitch-deck') {
      window.location.hash = '#pitch';
    } else if (view === 'home') {
      window.location.hash = '#app';
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleOpenChat = () => {
    setActiveView('messaging');
  };
  const handleUnlock = () => {
    setIsPitchDeckUnlocked(true);
  };
  // If in pitch deck mode and not unlocked, show password gate
  if (activeView === 'pitch-deck' && !isPitchDeckUnlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }
  // If in pitch deck mode and unlocked, show pitch deck
  if (activeView === 'pitch-deck') {
    return <PitchDeckPage onBack={() => {
      handleNavigate('home');
    }} />;
  }
  return <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeView={activeView} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        {activeView === 'home' ? <motion.div key="home" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.3
      }}>
            <HomeDashboardPage onMenuClick={toggleSidebar} onNavigate={handleNavigate} />
          </motion.div> : activeView === 'sidebar' ? <motion.div key="sidebar" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <SidebarPage onNavigate={handleNavigate} />
          </motion.div> : activeView === 'track' ? <motion.div key="track" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <TrackPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'history' ? <motion.div key="history" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <HistoryPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'services' ? <motion.div key="services" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <ServicesPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />
          </motion.div> : activeView === 'pharmacy-customer' ? <motion.div key="pharmacy-customer" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <PharmacyCustomerPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'beauty-customer' ? <motion.div key="beauty-customer" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <BeautyCustomerPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'beauty-provider' ? <motion.div key="beauty-provider" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <BeautyProviderDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'supermarket-customer' ? <motion.div key="supermarket-customer" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <SupermarketCustomerPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'laundry-customer' ? <motion.div key="laundry-customer" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <LaundryCustomerPage onBack={() => handleNavigate('home')} />
          </motion.div> : activeView === 'laundry' ? <motion.div key="laundry" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <LaundryDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'pharmacy' ? <motion.div key="pharmacy" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <PharmacyDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'supermarket' ? <motion.div key="supermarket" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <SupermarketDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'wallet' ? <motion.div key="wallet" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <WalletDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'fastfood' ? <motion.div key="fastfood" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <FastFoodPage onMenuClick={toggleSidebar} onOpenChat={handleOpenChat} />
          </motion.div> : activeView === 'merchant' ? <motion.div key="merchant" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <MerchantDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'transport' ? <motion.div key="transport" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <TransportBookingPage onMenuClick={toggleSidebar} onOpenChat={handleOpenChat} />
          </motion.div> : activeView === 'accommodation' ? <motion.div key="accommodation" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <AccommodationPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'kioskstore' ? <motion.div key="kioskstore" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <KioskStorefrontPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'provider' ? <motion.div key="provider" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <UniversalProviderDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'messaging' ? <motion.div key="messaging" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <MessagingPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'kiosk' ? <motion.div key="kiosk" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} transition={{
        duration: 0.3
      }}>
            <DashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : activeView === 'referral' ? <motion.div key="referral" initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} transition={{
        duration: 0.3
      }}>
            <ReferralDashboardPage onMenuClick={toggleSidebar} />
          </motion.div> : <motion.div key="marketplace" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }}>
            <MarketplacePage onMenuClick={toggleSidebar} />
          </motion.div>}
      </AnimatePresence>
    </>;
}