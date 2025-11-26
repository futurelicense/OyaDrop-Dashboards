import React from 'react';
import { GamifiedWalletHeader } from '../components/wallet/GamifiedWalletHeader';
import { AnimatedBalanceCard } from '../components/wallet/AnimatedBalanceCard';
import { GamifiedServicesGrid } from '../components/wallet/GamifiedServicesGrid';
import { OyaCoinVault } from '../components/wallet/OyaCoinVault';
import { WalletMissions } from '../components/wallet/WalletMissions';
import { WalletAchievements } from '../components/wallet/WalletAchievements';
import { TransactionFeed } from '../components/wallet/TransactionFeed';
export function WalletDashboardPage() {
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      <GamifiedWalletHeader />

      <main className="pb-6">
        <AnimatedBalanceCard />
        <GamifiedServicesGrid />
        <OyaCoinVault />
        <WalletMissions />
        <WalletAchievements />
        <TransactionFeed />
      </main>
    </div>;
}