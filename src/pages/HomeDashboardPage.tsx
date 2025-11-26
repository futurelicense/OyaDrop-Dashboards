import React from 'react';
import { HomeTopNav } from '../components/home/HomeTopNav';
import { MarqueeBar } from '../components/home/MarqueeBar';
import { PromoBannerSlider } from '../components/home/PromoBannerSlider';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { RewardsProgress } from '../components/home/RewardsProgress';
import { FeatureCards } from '../components/home/FeatureCards';
import { RecentActivity } from '../components/home/RecentActivity';
interface HomeDashboardPageProps {
  onMenuClick: () => void;
}
export function HomeDashboardPage({
  onMenuClick
}: HomeDashboardPageProps) {
  return <div className="min-h-screen bg-black">
      <HomeTopNav onMenuClick={onMenuClick} />
      <MarqueeBar />

      <main className="max-w-md mx-auto">
        <PromoBannerSlider />
        <ServicesGrid />
        <RewardsProgress />
        <FeatureCards />
        <RecentActivity />
      </main>
    </div>;
}