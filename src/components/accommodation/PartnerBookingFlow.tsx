import React, { useState, Children } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, CheckCircle, Calendar, Users, CreditCard } from 'lucide-react';
interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'Hotel' | 'Shortlet Agency' | 'Shared Living';
  rating: number;
  reviews: number;
  properties: number;
  verified: boolean;
}
interface PartnerBookingFlowProps {
  partner: Partner;
  onBack: () => void;
}
export function PartnerBookingFlow({
  partner,
  onBack
}: PartnerBookingFlowProps) {
  const [step, setStep] = useState<'select-property' | 'booking-details' | 'payment'>('select-property');
  const typeColors: Record<string, string> = {
    Hotel: '#00D9C0',
    'Shortlet Agency': '#00F0FF',
    'Shared Living': '#B026FF'
  };
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <motion.header className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-4" initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }}>
        <div className="flex items-center gap-4">
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onBack} whileTap={{
          scale: 0.95
        }}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>

          <div className="flex items-center gap-3 flex-1">
            <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-xl border-2 border-white/10" />
            <div>
              <h1 className="text-lg font-bold text-white">{partner.name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                backgroundColor: typeColors[partner.type] + '20',
                color: typeColors[partner.type]
              }}>
                  {partner.type}
                </span>
                {partner.verified && <CheckCircle className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mt-4">
          {['Select Property', 'Booking Details', 'Payment'].map((label, index) => {
          const stepIndex = ['select-property', 'booking-details', 'payment'].indexOf(step);
          const isActive = index === stepIndex;
          const isCompleted = index < stepIndex;
          return <div key={label} className="flex items-center flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-cyan-500 text-white' : 'bg-[#131B2E] text-gray-400'}`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                  {index < 2 && <div className={`h-0.5 flex-1 mx-2 transition-all ${isCompleted ? 'bg-green-500' : 'bg-[#131B2E]'}`} />}
                </div>;
        })}
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6">
        {step === 'select-property' && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-xl font-bold text-white mb-2">
              Select a Property
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Choose from {partner.properties} available properties
            </p>

            {/* Mock Property Cards */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => <motion.button key={i} className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10 text-left" whileHover={{
            y: -2,
            borderColor: '#00D9C040'
          }} whileTap={{
            scale: 0.98
          }} onClick={() => setStep('booking-details')}>
                  <div className="flex gap-4 p-4">
                    <img src={`https://images.unsplash.com/photo-${1582719478250 + i}?w=200&h=200&fit=crop`} alt="Property" className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">
                        Luxury Suite {i}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          Lekki Phase 1, Lagos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-white">
                            4.8
                          </span>
                        </div>
                        <span className="text-lg font-bold text-cyan-400">
                          ₦{(35000 + i * 5000).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">/ night</span>
                      </div>
                    </div>
                  </div>
                </motion.button>)}
            </div>
          </motion.div>}

        {step === 'booking-details' && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-xl font-bold text-white mb-6">
              Booking Details
            </h2>

            <div className="space-y-4">
              {/* Check-in/Check-out */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Dates</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Check-in
                    </label>
                    <input type="date" className="w-full bg-[#0A0E1A] text-white px-3 py-2 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Check-out
                    </label>
                    <input type="date" className="w-full bg-[#0A0E1A] text-white px-3 py-2 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Guests</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Adults
                    </label>
                    <input type="number" defaultValue={2} min={1} className="w-full bg-[#0A0E1A] text-white px-3 py-2 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Children
                    </label>
                    <input type="number" defaultValue={0} min={0} className="w-full bg-[#0A0E1A] text-white px-3 py-2 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-cyan-500/30">
                <h3 className="text-sm font-bold text-white mb-3">
                  Price Summary
                </h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">₦35,000 × 3 nights</span>
                    <span className="text-white">₦105,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Service fee</span>
                    <span className="text-white">₦5,250</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-cyan-400">
                    ₦110,250
                  </span>
                </div>
              </div>

              <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={() => setStep('payment')}>
                Continue to Payment
              </motion.button>
            </div>
          </motion.div>}

        {step === 'payment' && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-xl font-bold text-white mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">
              {/* Payment Options */}
              {['Wallet', 'Card', 'Bank Transfer', 'OyaCoin'].map((method, index) => <motion.button key={method} className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border-2 border-white/10 hover:border-cyan-500/50 transition-colors text-left" whileTap={{
            scale: 0.98
          }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-white">
                          {method}
                        </p>
                        <p className="text-xs text-gray-400">
                          {method === 'Wallet' && 'Balance: ₦250,000'}
                          {method === 'Card' && 'Visa, Mastercard, Verve'}
                          {method === 'Bank Transfer' && 'Direct bank payment'}
                          {method === 'OyaCoin' && 'Pay with rewards'}
                        </p>
                      </div>
                    </div>
                  </motion.button>)}

              <motion.button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
                <CheckCircle className="w-5 h-5" />
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>}
      </main>
    </div>;
}