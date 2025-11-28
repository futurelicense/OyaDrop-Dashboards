import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Coins, Banknote } from 'lucide-react';
const paymentMethods = [{
  id: 'cash',
  name: 'Cash',
  icon: Banknote,
  color: '#10B981'
}, {
  id: 'wallet',
  name: 'Wallet',
  icon: Wallet,
  color: '#00D9C0'
}, {
  id: 'paystack',
  name: 'Paystack',
  icon: CreditCard,
  color: '#00F0FF'
}, {
  id: 'oyacoin',
  name: 'OyaCoin',
  icon: Coins,
  color: '#FFB800'
}];
export function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState('cash');
  return <div className="px-4 py-4">
      <h3 className="text-sm font-bold text-white mb-3">Payment Method</h3>

      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method, index) => {
        const Icon = method.icon;
        const isSelected = selectedMethod === method.id;
        return <motion.button key={method.id} className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border-2 transition-all ${isSelected ? 'border-cyan-500 shadow-lg shadow-cyan-500/30' : 'border-white/10'}`} onClick={() => setSelectedMethod(method.id)} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -2
        }} whileTap={{
          scale: 0.98
        }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 mx-auto" style={{
            backgroundColor: method.color + '20'
          }}>
                <Icon className="w-6 h-6" style={{
              color: method.color
            }} />
              </div>
              <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                {method.name}
              </p>
            </motion.button>;
      })}
      </div>
    </div>;
}