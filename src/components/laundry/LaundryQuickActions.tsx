import React from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, UserPlus } from 'lucide-react';
interface LaundryQuickActionsProps {
  onActionClick?: (
  action: 'create-order' | 'update-status' | 'assign-rider')
  => void;
}
export function LaundryQuickActions({
  onActionClick
}: LaundryQuickActionsProps) {
  const actions = [
  {
    id: 'create-order',
    label: 'Create Order',
    icon: Plus,
    color: '#00D9C0'
  },
  {
    id: 'update-status',
    label: 'Update Status',
    icon: RefreshCw,
    color: '#FFB800'
  },
  {
    id: 'assign-rider',
    label: 'Assign Rider',
    icon: UserPlus,
    color: '#B026FF'
  }];

  return (
    <div className="sticky bottom-20 px-4 pb-4">
      <div className="bg-gradient-to-r from-[#131B2E] to-[#0F1520] rounded-2xl p-3 border border-white/10 shadow-2xl">
        <p className="text-xs font-semibold text-gray-400 mb-3 px-2">
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0A0E1A] border border-white/10"
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: index * 0.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() =>
                onActionClick?.(
                  action.id as
                  'create-order' |
                  'update-status' |
                  'assign-rider'
                )
                }>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: action.color + '20'
                  }}>

                  <Icon
                    className="w-5 h-5"
                    style={{
                      color: action.color
                    }} />

                </div>
                <span className="text-xs font-semibold text-white text-center leading-tight">
                  {action.label}
                </span>
              </motion.button>);

          })}
        </div>
      </div>
    </div>);

}