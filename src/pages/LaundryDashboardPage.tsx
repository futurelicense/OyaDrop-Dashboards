import React, { useState } from 'react';
import { LaundryHeader } from '../components/laundry/LaundryHeader';
import { LaundryDashboardCards } from '../components/laundry/LaundryDashboardCards';
import { LaundryQuickActions } from '../components/laundry/LaundryQuickActions';
import { LaundryOrderList } from '../components/laundry/LaundryOrderList';
import { LaundryMessages } from '../components/laundry/LaundryMessages';
import { LaundrySettings } from '../components/laundry/LaundrySettings';
import { CreateOrderSheet } from '../components/laundry/CreateOrderSheet';
import { UpdateStatusSheet } from '../components/laundry/UpdateStatusSheet';
import { AssignRiderSheet } from '../components/laundry/AssignRiderSheet';
import { LaundryBottomNav } from '../components/laundry/LaundryBottomNav';
import { OrderDetailsSheet, Order } from '../components/OrderDetailsSheet';
type Tab = 'home' | 'orders' | 'create' | 'messages' | 'settings';
type QuickAction = 'create-order' | 'update-status' | 'assign-rider' | null;
interface LaundryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  garmentCount: number;
  serviceType: 'Wash Only' | 'Wash & Iron' | 'Dry Cleaning' | 'Express';
  status:
  'pickup' |
  'sorting' |
  'washing' |
  'ironing' |
  'packaging' |
  'delivery';
  urgency: 'normal' | 'urgent' | 'express';
  timeElapsed: string;
  deliveryType: 'pickup' | 'delivery';
}
interface LaundryDashboardPageProps {
  onMenuClick: () => void;
}
const statusOptions = [
{
  value: 'washing',
  label: 'Start Washing',
  color: '#00D9C0'
},
{
  value: 'ironing',
  label: 'Move to Iron',
  color: '#FFB800'
},
{
  value: 'packaging',
  label: 'Package',
  color: '#B026FF'
},
{
  value: 'delivery',
  label: 'Ready for Delivery',
  color: '#10B981'
}];

export function LaundryDashboardPage({
  onMenuClick
}: LaundryDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeQuickAction, setActiveQuickAction] = useState<QuickAction>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const handleSelectOrder = (order: LaundryOrder) => {
    // Convert LaundryOrder to Order format
    const orderDetails: Order = {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: '+234 801 234 5678',
      customerAddress: '123 Lekki Phase 1, Lagos',
      itemCount: order.garmentCount,
      totalValue: 5000,
      status: order.status,
      urgency: order.urgency,
      timeElapsed: order.timeElapsed,
      deliveryType: order.deliveryType,
      createdAt: '2 hours ago',
      estimatedCompletion: '4 hours',
      specialInstructions:
      order.serviceType === 'Express' ?
      'Customer needs this urgently for an event tonight' :
      undefined,
      items: [
      {
        id: '1',
        name: 'Shirts',
        quantity: 5,
        price: 500,
        notes: 'White shirts - handle with care'
      },
      {
        id: '2',
        name: 'Trousers',
        quantity: 3,
        price: 800
      },
      {
        id: '3',
        name: 'Bed Sheets',
        quantity: 2,
        price: 1200
      }],

      paymentMethod: 'card',
      paymentStatus: 'paid'
    };
    setSelectedOrder(orderDetails);
    setShowOrderDetails(true);
  };
  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log('Status changed:', orderId, newStatus);
    setShowOrderDetails(false);
  };
  const handleContactCustomer = (orderId: string) => {
    console.log('Contact customer:', orderId);
    // Navigate to messaging or open phone dialer
  };
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'create') {
      setActiveQuickAction('create-order');
      setActiveTab('home');
    }
  };
  const handleQuickAction = (
  action: 'create-order' | 'update-status' | 'assign-rider') =>
  {
    setActiveQuickAction(action);
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        <LaundryHeader onMenuClick={onMenuClick} />

        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' &&
          <>
              <LaundryDashboardCards />
              <LaundryQuickActions onActionClick={handleQuickAction} />
            </>
          }
          {activeTab === 'orders' &&
          <LaundryOrderList onSelectOrder={handleSelectOrder} />
          }
          {activeTab === 'messages' && <LaundryMessages />}
          {activeTab === 'settings' && <LaundrySettings />}
        </div>

        <LaundryBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Quick Action Sheets */}
      <CreateOrderSheet
        isOpen={activeQuickAction === 'create-order'}
        onClose={() => setActiveQuickAction(null)} />

      <UpdateStatusSheet
        isOpen={activeQuickAction === 'update-status'}
        onClose={() => setActiveQuickAction(null)} />

      <AssignRiderSheet
        isOpen={activeQuickAction === 'assign-rider'}
        onClose={() => setActiveQuickAction(null)} />


      {/* Order Details Sheet */}
      <OrderDetailsSheet
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
        onContactCustomer={handleContactCustomer}
        statusOptions={statusOptions} />

    </>);

}