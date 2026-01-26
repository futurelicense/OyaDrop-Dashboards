import React, { useState } from 'react';
import { PharmacyHeader } from '../components/pharmacy/PharmacyHeader';
import { PharmacyDashboardCards } from '../components/pharmacy/PharmacyDashboardCards';
import { PharmacyQuickActions } from '../components/pharmacy/PharmacyQuickActions';
import { MedicationCatalog } from '../components/pharmacy/MedicationCatalog';
import { PharmacyOrders } from '../components/pharmacy/PharmacyOrders';
import { PrescriptionQueue } from '../components/pharmacy/PrescriptionQueue';
import { PharmacyChat } from '../components/pharmacy/PharmacyChat';
import { PharmacySettings } from '../components/pharmacy/PharmacySettings';
import { AddMedicationSheet } from '../components/pharmacy/AddMedicationSheet';
import { CheckPrescriptionSheet } from '../components/pharmacy/CheckPrescriptionSheet';
import { UploadStockSheet } from '../components/pharmacy/UploadStockSheet';
import { PharmacyBottomNav } from '../components/pharmacy/PharmacyBottomNav';
type Tab =
'home' |
'catalog' |
'orders' |
'prescriptions' |
'messages' |
'settings';
type QuickAction =
'add-medication' |
'check-prescription' |
'upload-stock' |
null;
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  itemCount: number;
  totalValue: number;
  timeElapsed: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  hasPrescription: boolean;
  urgency: 'normal' | 'urgent' | 'critical';
}
interface Prescription {
  id: string;
  prescriptionId: string;
  customerName: string;
  itemsRequested: number;
  uploadedImage: string;
  timeAgo: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  customerNote?: string;
}
interface PharmacyDashboardPageProps {
  onMenuClick: () => void;
}
export function PharmacyDashboardPage({
  onMenuClick
}: PharmacyDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeQuickAction, setActiveQuickAction] = useState<QuickAction>(null);
  const handleSelectOrder = (order: Order) => {
    console.log('Selected order:', order);
  };
  const handleReviewPrescription = (prescription: Prescription) => {
    console.log('Review prescription:', prescription);
  };
  const handleQuickAction = (
  action: 'add-medication' | 'check-prescription' | 'upload-stock') =>
  {
    setActiveQuickAction(action);
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        <PharmacyHeader onMenuClick={onMenuClick} />

        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' &&
          <>
              <PharmacyDashboardCards />
              <PharmacyQuickActions onActionClick={handleQuickAction} />
            </>
          }
          {activeTab === 'catalog' && <MedicationCatalog />}
          {activeTab === 'orders' &&
          <PharmacyOrders onSelectOrder={handleSelectOrder} />
          }
          {activeTab === 'prescriptions' &&
          <PrescriptionQueue
            onReviewPrescription={handleReviewPrescription} />

          }
          {activeTab === 'messages' && <PharmacyChat />}
          {activeTab === 'settings' && <PharmacySettings />}
        </div>

        <PharmacyBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Quick Action Sheets */}
      <AddMedicationSheet
        isOpen={activeQuickAction === 'add-medication'}
        onClose={() => setActiveQuickAction(null)} />

      <CheckPrescriptionSheet
        isOpen={activeQuickAction === 'check-prescription'}
        onClose={() => setActiveQuickAction(null)} />

      <UploadStockSheet
        isOpen={activeQuickAction === 'upload-stock'}
        onClose={() => setActiveQuickAction(null)} />

    </>);

}