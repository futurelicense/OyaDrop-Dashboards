import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeDashboardPage } from './pages/HomeDashboardPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReferralDashboardPage } from './pages/ReferralDashboardPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { WalletDashboardPage } from './pages/WalletDashboardPage';
import { FastFoodPage } from './pages/FastFoodPage';
import { MerchantDashboardPage } from './pages/MerchantDashboardPage';
import { Sidebar } from './components/Sidebar';
export function App() {
  const [activeView, setActiveView] = useState<'home' | 'kiosk' | 'referral' | 'marketplace' | 'wallet' | 'fastfood' | 'merchant'>('merchant');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleNavigate = (view: 'home' | 'kiosk' | 'referral' | 'marketplace' | 'wallet' | 'fastfood' | 'merchant') => {
    setActiveView(view);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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
            <HomeDashboardPage onMenuClick={toggleSidebar} />
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
            <FastFoodPage onMenuClick={toggleSidebar} />
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