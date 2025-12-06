import React, { useState } from 'react';
import { HomeTopNav } from '../components/home/HomeTopNav';
import { MarqueeBar } from '../components/home/MarqueeBar';
import { PromoBannerSlider } from '../components/home/PromoBannerSlider';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { RewardsProgress } from '../components/home/RewardsProgress';
import { FeatureCards } from '../components/home/FeatureCards';
import { RecentActivity } from '../components/home/RecentActivity';
import { QuickServiceRequests } from '../components/home/QuickServiceRequests';
import { PharmacyRequestSheet } from '../components/home/PharmacyRequestSheet';
import { SupermarketRequestSheet } from '../components/home/SupermarketRequestSheet';
import { BeautyRequestSheet } from '../components/home/BeautyRequestSheet';
import { TransportRequestSheet } from '../components/home/TransportRequestSheet';
import { FastFoodRequestSheet } from '../components/home/FastFoodRequestSheet';
import { LaundryRequestSheet } from '../components/home/LaundryRequestSheet';
import { RequestSuccessSheet } from '../components/home/RequestSuccessSheet';
interface HomeDashboardPageProps {
  onMenuClick: () => void;
  onNavigate?: (view: string) => void;
}
type ServiceSheet = 'pharmacy' | 'supermarket' | 'beauty' | 'transport' | 'fastfood' | 'laundry' | null;
type SuccessConfig = {
  title: string;
  message: string;
  actionLabel: string;
  color: string;
  navigateTo?: string;
} | null;
export function HomeDashboardPage({
  onMenuClick,
  onNavigate
}: HomeDashboardPageProps) {
  const [activeSheet, setActiveSheet] = useState<ServiceSheet>(null);
  const [successConfig, setSuccessConfig] = useState<SuccessConfig>(null);
  const handleServiceSelect = (serviceId: string) => {
    setActiveSheet(serviceId as ServiceSheet);
  };
  const handlePharmacySubmit = (data: any) => {
    console.log('Pharmacy request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Pharmacy Request Sent!',
      message: data.hasPrescription ? "We'll review your prescription and get back to you shortly." : 'Browse our pharmacy to find the medications you need.',
      actionLabel: 'Browse Pharmacy',
      color: '#B026FF',
      navigateTo: 'pharmacy-customer'
    });
  };
  const handleSupermarketSubmit = (data: any) => {
    console.log('Supermarket request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Shopping List Saved!',
      message: 'Your shopping list is ready. Browse supermarkets to start adding items to your cart.',
      actionLabel: 'Browse Supermarkets',
      color: '#10B981',
      navigateTo: 'supermarket'
    });
  };
  const handleBeautySubmit = (data: any) => {
    console.log('Beauty request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Beauty Request Sent!',
      message: "We're finding the best beauty providers near you for your selected services.",
      actionLabel: 'Browse Providers',
      color: '#FF6B00',
      navigateTo: 'beauty-customer'
    });
  };
  const handleTransportSubmit = (data: any) => {
    console.log('Transport request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Finding Drivers!',
      message: "We're matching you with nearby drivers. Your ride will be confirmed in a moment.",
      actionLabel: 'View Ride Details',
      color: '#00D9C0',
      navigateTo: 'transport'
    });
  };
  const handleFastFoodSubmit = (data: any) => {
    console.log('Fast food request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Ready to Order!',
      message: 'Browse restaurants and start adding delicious items to your cart.',
      actionLabel: 'Browse Restaurants',
      color: '#EF4444',
      navigateTo: 'fastfood'
    });
  };
  const handleLaundrySubmit = (data: any) => {
    console.log('Laundry request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Pickup Scheduled!',
      message: `We'll pick up your laundry ${data.when} during ${data.time}. You'll receive a confirmation call 30 minutes before.`,
      actionLabel: 'View Laundry Details',
      color: '#14B8A6',
      navigateTo: 'laundry'
    });
  };
  const handleSuccessAction = () => {
    if (successConfig?.navigateTo && onNavigate) {
      onNavigate(successConfig.navigateTo);
    }
    setSuccessConfig(null);
  };
  return <>
      <div className="min-h-screen bg-black">
        <HomeTopNav onMenuClick={onMenuClick} />
        <MarqueeBar />

        <main className="max-w-md mx-auto">
          <PromoBannerSlider />
          <QuickServiceRequests onServiceSelect={handleServiceSelect} />
          <ServicesGrid />
          <RewardsProgress />
          <FeatureCards />
          <RecentActivity />
        </main>
      </div>

      {/* Service Request Sheets */}
      <PharmacyRequestSheet isOpen={activeSheet === 'pharmacy'} onClose={() => setActiveSheet(null)} onSubmit={handlePharmacySubmit} />
      <SupermarketRequestSheet isOpen={activeSheet === 'supermarket'} onClose={() => setActiveSheet(null)} onSubmit={handleSupermarketSubmit} />
      <BeautyRequestSheet isOpen={activeSheet === 'beauty'} onClose={() => setActiveSheet(null)} onSubmit={handleBeautySubmit} />
      <TransportRequestSheet isOpen={activeSheet === 'transport'} onClose={() => setActiveSheet(null)} onSubmit={handleTransportSubmit} />
      <FastFoodRequestSheet isOpen={activeSheet === 'fastfood'} onClose={() => setActiveSheet(null)} onSubmit={handleFastFoodSubmit} />
      <LaundryRequestSheet isOpen={activeSheet === 'laundry'} onClose={() => setActiveSheet(null)} onSubmit={handleLaundrySubmit} />

      {/* Success Confirmation */}
      {successConfig && <RequestSuccessSheet isOpen={true} onClose={() => setSuccessConfig(null)} title={successConfig.title} message={successConfig.message} actionLabel={successConfig.actionLabel} onAction={handleSuccessAction} color={successConfig.color} />}
    </>;
}