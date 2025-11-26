import React from 'react';
import { TopNav } from '../components/dashboard/TopNav';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { NavigationTiles } from '../components/dashboard/NavigationTiles';
import { StorefrontActions } from '../components/dashboard/StorefrontActions';
import { InsightsStrip } from '../components/dashboard/InsightsStrip';
import { PromoBanner } from '../components/dashboard/PromoBanner';
interface DashboardPageProps {
  onMenuClick: () => void;
}
export function DashboardPage({
  onMenuClick
}: DashboardPageProps) {
  return <div className="min-h-screen bg-[#0a0a0f]">
      <TopNav onMenuClick={onMenuClick} />

      <main className="max-w-md mx-auto">
        <WelcomeHeader />
        <StatsGrid />
        <NavigationTiles />
        <StorefrontActions />
        <InsightsStrip />
        <PromoBanner />
      </main>
    </div>;
}