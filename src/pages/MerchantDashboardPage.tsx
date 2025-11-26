import React from 'react';
import { MerchantProHeader } from '../components/merchant/MerchantProHeader';
import { FastFoodKPIBar } from '../components/merchant/FastFoodKPIBar';
import { MultiBranchGrid } from '../components/merchant/MultiBranchGrid';
import { RealTimeOrderManager } from '../components/merchant/RealTimeOrderManager';
interface MerchantDashboardPageProps {
  onMenuClick: () => void;
}
export function MerchantDashboardPage({
  onMenuClick
}: MerchantDashboardPageProps) {
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-8">
      <MerchantProHeader onMenuClick={onMenuClick} />

      <main>
        <FastFoodKPIBar />
        <MultiBranchGrid />
        <RealTimeOrderManager />
      </main>
    </div>;
}