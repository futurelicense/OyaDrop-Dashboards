import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Car, ShoppingBag, Wrench, MapPin, Image, Repeat } from 'lucide-react';
interface InChatActionButtonsProps {
  contactType: 'Restaurant' | 'Rider' | 'Driver' | 'Kiosk' | 'Service Provider';
  onAction: (action: string) => void;
}
export function InChatActionButtons({
  contactType,
  onAction
}: InChatActionButtonsProps) {
  const getActions = () => {
    switch (contactType) {
      case 'Restaurant':
        return [{
          id: 'view-menu',
          label: 'View Menu',
          icon: UtensilsCrossed,
          color: '#FF6B00'
        }, {
          id: 'repeat-order',
          label: 'Repeat Last Order',
          icon: Repeat,
          color: '#00D9C0'
        }, {
          id: 'group-order',
          label: 'Start Group Order',
          icon: UtensilsCrossed,
          color: '#B026FF'
        }, {
          id: 'share-location',
          label: 'Share Location',
          icon: MapPin,
          color: '#FFB800'
        }];
      case 'Rider':
      case 'Driver':
        return [{
          id: 'request-pickup',
          label: 'Request Pickup',
          icon: Car,
          color: '#00D9C0'
        }, {
          id: 'share-location',
          label: 'Share Live Location',
          icon: MapPin,
          color: '#FFB800'
        }, {
          id: 'send-trip-link',
          label: 'Send Trip Link',
          icon: Car,
          color: '#00F0FF'
        }];
      case 'Kiosk':
        return [{
          id: 'browse-products',
          label: 'Browse Products',
          icon: ShoppingBag,
          color: '#FFB800'
        }, {
          id: 'send-cart',
          label: 'Send Cart as Order',
          icon: ShoppingBag,
          color: '#00D9C0'
        }, {
          id: 'request-price',
          label: 'Request Price',
          icon: ShoppingBag,
          color: '#B026FF'
        }];
      case 'Service Provider':
        return [{
          id: 'create-job',
          label: 'Create Job Request',
          icon: Wrench,
          color: '#B026FF'
        }, {
          id: 'share-address',
          label: 'Share Address',
          icon: MapPin,
          color: '#FFB800'
        }, {
          id: 'share-photos',
          label: 'Share Photos',
          icon: Image,
          color: '#00D9C0'
        }];
      default:
        return [];
    }
  };
  const actions = getActions();
  return <div className="px-4 py-3 border-t border-white/10 bg-[#131B2E]">
      <p className="text-xs font-semibold text-gray-400 mb-3">Quick Actions</p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => {
        const Icon = action.icon;
        return <motion.button key={action.id} className="flex items-center gap-2 p-3 bg-[#0A0E1A] rounded-xl border border-white/10 hover:border-white/20 transition-colors" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} whileTap={{
          scale: 0.98
        }} onClick={() => onAction(action.id)}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
            backgroundColor: action.color + '20'
          }}>
                <Icon className="w-4 h-4" style={{
              color: action.color
            }} />
              </div>
              <span className="text-xs font-semibold text-white text-left">
                {action.label}
              </span>
            </motion.button>;
      })}
      </div>
    </div>;
}