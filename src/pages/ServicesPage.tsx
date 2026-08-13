import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { QuickServiceRequests } from '../components/home/QuickServiceRequests';
import { PharmacyRequestSheet } from '../components/home/PharmacyRequestSheet';
import { SupermarketRequestSheet } from '../components/home/SupermarketRequestSheet';
import { BeautyRequestSheet } from '../components/home/BeautyRequestSheet';
import { TransportRequestSheet } from '../components/home/TransportRequestSheet';
import { FastFoodRequestSheet } from '../components/home/FastFoodRequestSheet';
import { LaundryRequestSheet } from '../components/home/LaundryRequestSheet';
import { CleanersRequestSheet } from '../components/home/CleanersRequestSheet';
import { MechanicRequestSheet } from '../components/home/MechanicRequestSheet';
import { RequestSuccessSheet } from '../components/home/RequestSuccessSheet';
interface ServicesPageProps {
  onBack: () => void;
  onNavigate?: (view: string) => void;
}
type ServiceSheet =
'pharmacy' |
'supermarket' |
'beauty' |
'transport' |
'fastfood' |
'laundry' |
'cleaners' |
'mechanic' |
null;
type SuccessConfig = {
  title: string;
  message: string;
  actionLabel: string;
  color: string;
  navigateTo?: string;
} | null;
export function ServicesPage({ onBack, onNavigate }: ServicesPageProps) {
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
      message: data.hasPrescription ?
      "We'll review your prescription and get back to you shortly." :
      'Browse our pharmacy to find the medications you need.',
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
      message:
      'Your shopping list is ready. Browse fresh groceries and add items to your cart.',
      actionLabel: 'Start Shopping',
      color: '#10B981',
      navigateTo: 'supermarket-customer'
    });
  };
  const handleBeautySubmit = (data: any) => {
    console.log('Beauty request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Beauty Request Sent!',
      message:
      "We're finding the best beauty providers near you for your selected services.",
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
      message:
      "We're matching you with nearby drivers. Your ride will be confirmed in a moment.",
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
      message:
      'Browse restaurants and start adding delicious items to your cart.',
      actionLabel: 'Browse Restaurants',
      color: '#EF4444',
      navigateTo: 'fastfood'
    });
  };
  const handleLaundrySubmit = (data: any) => {
    console.log('Laundry request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Request Received!',
      message: 'Browse laundry services and schedule your pickup.',
      actionLabel: 'View Laundry Services',
      color: '#14B8A6',
      navigateTo: 'laundry-customer'
    });
  };
  const handleCleanersSubmit = (data: any) => {
    console.log('Cleaning request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Cleaning Request Sent!',
      message:
      "We're matching your home with trusted cleaners near you. You’ll receive a confirmation shortly.",
      actionLabel: 'View Clean & Co.',
      color: '#34D399',
      navigateTo: 'cleaners-storefront'
    });
  };
  const handleMechanicSubmit = (data: any) => {
    console.log('Mechanic request:', data);
    setActiveSheet(null);
    setSuccessConfig({
      title: 'Mechanic Request Sent!',
      message:
      "We're matching you with verified OyaFix mechanics nearby. You’ll get a quote to approve before any work starts.",
      actionLabel: 'View TorqueLine Auto Works',
      color: '#F59E0B',
      navigateTo: 'mechanic-kioskfront'
    });
  };
  const handleSuccessAction = () => {
    if (successConfig?.navigateTo && onNavigate) {
      onNavigate(successConfig.navigateTo);
    }
    setSuccessConfig(null);
  };
  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3 px-4 py-4">
            <motion.button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              onClick={onBack}
              whileTap={{
                scale: 0.95
              }}>
              
              <ArrowLeft className="w-6 h-6 text-white" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-white">OyaDrop Services</h1>
              <p className="text-xs text-gray-400">What do you need today?</p>
            </div>
          </div>
        </div>

        <main className="max-w-md mx-auto">
          <QuickServiceRequests onServiceSelect={handleServiceSelect} />
        </main>
      </div>

      {/* Service Request Sheets */}
      <PharmacyRequestSheet
        isOpen={activeSheet === 'pharmacy'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handlePharmacySubmit} />
      
      <SupermarketRequestSheet
        isOpen={activeSheet === 'supermarket'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleSupermarketSubmit} />
      
      <BeautyRequestSheet
        isOpen={activeSheet === 'beauty'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleBeautySubmit} />
      
      <TransportRequestSheet
        isOpen={activeSheet === 'transport'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleTransportSubmit} />
      
      <FastFoodRequestSheet
        isOpen={activeSheet === 'fastfood'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleFastFoodSubmit} />
      
      <LaundryRequestSheet
        isOpen={activeSheet === 'laundry'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleLaundrySubmit} />
      
      <CleanersRequestSheet
        isOpen={activeSheet === 'cleaners'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleCleanersSubmit} />
      
      <MechanicRequestSheet
        isOpen={activeSheet === 'mechanic'}
        onClose={() => setActiveSheet(null)}
        onSubmit={handleMechanicSubmit} />
      

      {/* Success Confirmation */}
      {successConfig &&
      <RequestSuccessSheet
        isOpen={true}
        onClose={() => setSuccessConfig(null)}
        title={successConfig.title}
        message={successConfig.message}
        actionLabel={successConfig.actionLabel}
        onAction={handleSuccessAction}
        color={successConfig.color} />

      }
    </>);

}