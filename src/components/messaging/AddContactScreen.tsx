import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, QrCode, Phone, ShoppingBag, Car, UtensilsCrossed, Wrench, User } from 'lucide-react';
interface RecentInteraction {
  id: string;
  name: string;
  avatar: string;
  type: 'ride' | 'order' | 'service' | 'kiosk';
  role: 'Rider' | 'Driver' | 'Restaurant' | 'Kiosk' | 'Service Provider';
  date: string;
  detail: string;
}
const recentInteractions: RecentInteraction[] = [{
  id: '1',
  name: 'Chinedu - Driver',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  type: 'ride',
  role: 'Driver',
  date: 'Yesterday',
  detail: 'Lekki to VI trip'
}, {
  id: '2',
  name: 'Mama Put Restaurant',
  avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
  type: 'order',
  role: 'Restaurant',
  date: '2 days ago',
  detail: 'Jollof rice order'
}, {
  id: '3',
  name: 'David - Electrician',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  type: 'service',
  role: 'Service Provider',
  date: '3 days ago',
  detail: 'Wiring installation'
}, {
  id: '4',
  name: 'Fashion Hub',
  avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
  type: 'kiosk',
  role: 'Kiosk',
  date: '1 week ago',
  detail: 'Clothing purchase'
}];
const typeIcons = {
  ride: Car,
  order: UtensilsCrossed,
  service: Wrench,
  kiosk: ShoppingBag
};
const typeColors = {
  ride: '#00D9C0',
  order: '#FF6B00',
  service: '#B026FF',
  kiosk: '#FFB800'
};
interface AddContactScreenProps {
  onBack: () => void;
}
export function AddContactScreen({
  onBack
}: AddContactScreenProps) {
  const [activeMethod, setActiveMethod] = useState<'recent' | 'search' | 'qr'>('recent');
  return <div className="flex flex-col h-screen bg-[#0A0E1A]">
      {/* Header */}
      <motion.header className="flex items-center gap-3 p-4 bg-[#131B2E] border-b border-white/10" initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }}>
        <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onBack} whileTap={{
        scale: 0.95
      }}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>

        <h1 className="text-xl font-bold text-white">Add Contact</h1>
      </motion.header>

      {/* Method Selector */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-3 gap-3">
          <motion.button className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${activeMethod === 'recent' ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-2 border-cyan-500' : 'bg-[#131B2E] border-2 border-white/10'}`} onClick={() => setActiveMethod('recent')} whileTap={{
          scale: 0.98
        }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeMethod === 'recent' ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
              <User className={`w-6 h-6 ${activeMethod === 'recent' ? 'text-cyan-400' : 'text-gray-400'}`} />
            </div>
            <span className={`text-xs font-semibold ${activeMethod === 'recent' ? 'text-white' : 'text-gray-400'}`}>
              Recent
            </span>
          </motion.button>

          <motion.button className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${activeMethod === 'search' ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-2 border-cyan-500' : 'bg-[#131B2E] border-2 border-white/10'}`} onClick={() => setActiveMethod('search')} whileTap={{
          scale: 0.98
        }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeMethod === 'search' ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
              <Phone className={`w-6 h-6 ${activeMethod === 'search' ? 'text-cyan-400' : 'text-gray-400'}`} />
            </div>
            <span className={`text-xs font-semibold ${activeMethod === 'search' ? 'text-white' : 'text-gray-400'}`}>
              Phone/ID
            </span>
          </motion.button>

          <motion.button className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${activeMethod === 'qr' ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-2 border-cyan-500' : 'bg-[#131B2E] border-2 border-white/10'}`} onClick={() => setActiveMethod('qr')} whileTap={{
          scale: 0.98
        }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeMethod === 'qr' ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
              <QrCode className={`w-6 h-6 ${activeMethod === 'qr' ? 'text-cyan-400' : 'text-gray-400'}`} />
            </div>
            <span className={`text-xs font-semibold ${activeMethod === 'qr' ? 'text-white' : 'text-gray-400'}`}>
              QR Code
            </span>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeMethod === 'recent' && <motion.div className="p-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-sm font-bold text-white mb-3">
              Recent Interactions
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Add people you've recently interacted with
            </p>

            <div className="space-y-3">
              {recentInteractions.map((interaction, index) => {
            const Icon = typeIcons[interaction.type];
            const color = typeColors[interaction.type];
            return <motion.div key={interaction.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={interaction.avatar} alt={interaction.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">
                          {interaction.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Icon className="w-3 h-3" style={{
                      color
                    }} />
                          <span className="text-xs text-gray-400">
                            {interaction.detail}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {interaction.date}
                      </span>
                    </div>

                    <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/30" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                      Add to Contacts
                    </motion.button>
                  </motion.div>;
          })}
            </div>
          </motion.div>}

        {activeMethod === 'search' && <motion.div className="p-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-sm font-bold text-white mb-3">
              Search by Phone or ID
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Enter phone number or OyaDrop ID
            </p>

            <div className="space-y-4">
              {/* Phone Number */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <label className="text-xs font-semibold text-gray-400 mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" placeholder="+234 800 000 0000" className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>

              {/* OyaDrop ID */}
              <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
                <label className="text-xs font-semibold text-gray-400 mb-2 block">
                  OyaDrop ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="@username or ID" className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>

              <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
                Search Contact
              </motion.button>
            </div>
          </motion.div>}

        {activeMethod === 'qr' && <motion.div className="p-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <h2 className="text-sm font-bold text-white mb-3">Scan QR Code</h2>
            <p className="text-xs text-gray-400 mb-4">
              Scan merchant, rider, or user QR code
            </p>

            {/* QR Scanner Placeholder */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-3xl p-8 border border-white/10 mb-4">
              <div className="aspect-square bg-[#0A0E1A] rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Scanner Frame */}
                <div className="absolute inset-8 border-4 border-cyan-500 rounded-2xl">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl" />
                </div>

                {/* Scanning Line */}
                <motion.div className="absolute left-8 right-8 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" animate={{
              y: [-100, 100]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }} />

                <QrCode className="w-16 h-16 text-gray-600" />
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-cyan-400 text-center">
                Position the QR code within the frame to scan
              </p>
            </div>

            <motion.button className="w-full bg-[#131B2E] border border-white/10 text-white font-bold py-4 rounded-xl" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
              Show My QR Code
            </motion.button>
          </motion.div>}
      </div>
    </div>;
}