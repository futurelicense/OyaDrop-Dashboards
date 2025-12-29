import React, { useState } from 'react';
import { HomeTopNav } from '../components/home/HomeTopNav';
import { MarqueeBar } from '../components/home/MarqueeBar';
import { QuickAccessBar } from '../components/home/QuickAccessBar';
import { PromoBannerSlider } from '../components/home/PromoBannerSlider';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { RewardsProgress } from '../components/home/RewardsProgress';
import { FeatureCards } from '../components/home/FeatureCards';
import { RecentActivity } from '../components/home/RecentActivity';
interface HomeDashboardPageProps {
  onMenuClick: () => void;
  onNavigate?: (view: string) => void;
}
export function HomeDashboardPage({
  onMenuClick,
  onNavigate
}: HomeDashboardPageProps) {
  return <div className="min-h-screen bg-black">
      <HomeTopNav onMenuClick={onMenuClick} />
      <MarqueeBar />
      <QuickAccessBar onNavigate={onNavigate} />

      <main className="max-w-md mx-auto">
        <PromoBannerSlider />
        <ServicesGrid onNavigate={onNavigate} />
        <RewardsProgress />
        <FeatureCards onNavigate={onNavigate} />
        <RecentActivity />
      </main>
    </div>;
}