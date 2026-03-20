import React, { useState } from 'react';
import { SupermarketHeader } from '../components/supermarket/SupermarketHeader';
import { DashboardCards } from '../components/supermarket/DashboardCards';
import { QuickActionsBar } from '../components/supermarket/QuickActionsBar';
import { ProductGrid } from '../components/supermarket/ProductGrid';
import { OrderList } from '../components/supermarket/OrderList';
import { PickPackMode } from '../components/supermarket/PickPackMode';
import { SubstitutionDrawer } from '../components/supermarket/SubstitutionDrawer';
import { CustomerMessages } from '../components/supermarket/CustomerMessages';
import { StoreSettings } from '../components/supermarket/StoreSettings';
import { BottomNav } from '../components/supermarket/BottomNav';
type Tab = 'home' | 'products' | 'orders' | 'messages' | 'settings';
type OrderView = 'list' | 'picking';
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  itemCount: number;
  totalValue: number;
  timeElapsed: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'picking' | 'ready' | 'completed';
  urgency: 'normal' | 'urgent' | 'critical';
}
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  stock: number;
  image: string;
  status: 'pending' | 'found' | 'unavailable' | 'substituted';
}
interface SupermarketDashboardPageProps {
  onMenuClick: () => void;
}
export function SupermarketDashboardPage({
  onMenuClick
}: SupermarketDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [orderView, setOrderView] = useState<OrderView>('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showSubstitution, setShowSubstitution] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setOrderView('picking');
  };
  const handleBackToList = () => {
    setOrderView('list');
    setSelectedOrder(null);
  };
  const handleSubstitute = (item: OrderItem) => {
    setSelectedItem(item);
    setShowSubstitution(true);
  };
  const handleCompleteOrder = () => {
    setOrderView('list');
    setSelectedOrder(null);
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        {orderView === 'list' &&
        <SupermarketHeader onMenuClick={onMenuClick} />
        }

        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && orderView === 'list' &&
          <>
              <DashboardCards />
              <QuickActionsBar />
            </>
          }
          {activeTab === 'products' && <ProductGrid />}
          {activeTab === 'orders' && orderView === 'list' &&
          <OrderList onSelectOrder={handleSelectOrder} />
          }
          {activeTab === 'orders' &&
          orderView === 'picking' &&
          selectedOrder &&
          <PickPackMode
            orderNumber={selectedOrder.orderNumber}
            onBack={handleBackToList}
            onComplete={handleCompleteOrder}
            onSubstitute={handleSubstitute} />

          }
          {activeTab === 'messages' && <CustomerMessages />}
          {activeTab === 'settings' && <StoreSettings />}
        </div>

        {orderView === 'list' &&
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        }
      </div>

      <SubstitutionDrawer
        isOpen={showSubstitution}
        onClose={() => setShowSubstitution(false)}
        originalItem={{
          name: selectedItem?.name || '',
          price: 500
        }} />
      
    </>);

}