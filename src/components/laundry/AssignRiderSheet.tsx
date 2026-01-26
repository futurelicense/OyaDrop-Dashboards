import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Bike } from 'lucide-react';
interface Rider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  distance: string;
  activeDeliveries: number;
  available: boolean;
}
const mockRiders: Rider[] = [
{
  id: '1',
  name: 'Tunde Rider',
  avatar:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  rating: 4.8,
  distance: '1.2 km away',
  activeDeliveries: 2,
  available: true
},
{
  id: '2',
  name: 'Emeka Express',
  avatar:
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  rating: 4.9,
  distance: '2.5 km away',
  activeDeliveries: 1,
  available: true
},
{
  id: '3',
  name: 'Chidi Fast',
  avatar:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  rating: 4.7,
  distance: '3.8 km away',
  activeDeliveries: 3,
  available: false
}];

interface AssignRiderSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function AssignRiderSheet({ isOpen, onClose }: AssignRiderSheetProps) {
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose} />


          <motion.div
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[75vh] flex flex-col"
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}>

            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Assign Rider</h2>
                <p className="text-sm text-gray-400">Select available rider</p>
              </div>
              <motion.button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              onClick={onClose}
              whileTap={{
                scale: 0.95
              }}>

                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {mockRiders.map((rider, index) =>
            <motion.button
              key={rider.id}
              className={`w-full bg-[#0A0E1A] rounded-2xl p-4 border text-left ${rider.available ? 'border-white/10 hover:border-cyan-500/50' : 'border-white/5 opacity-50'}`}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              whileTap={{
                scale: rider.available ? 0.98 : 1
              }}
              disabled={!rider.available}>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                    src={rider.avatar}
                    alt={rider.name}
                    className="w-14 h-14 rounded-full object-cover" />

                      {rider.available &&
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0A0E1A] flex items-center justify-center">
                          <Bike className="w-3 h-3 text-white" />
                        </div>
                  }
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1">
                        {rider.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>{rider.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{rider.distance}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {rider.activeDeliveries} active{' '}
                        {rider.activeDeliveries === 1 ?
                    'delivery' :
                    'deliveries'}
                      </p>
                    </div>

                    {rider.available ?
                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <span className="text-xs font-bold text-green-400">
                          Available
                        </span>
                      </div> :

                <div className="px-3 py-1 bg-gray-600/20 border border-gray-600/30 rounded-lg">
                        <span className="text-xs font-bold text-gray-400">
                          Busy
                        </span>
                      </div>
                }
                  </div>
                </motion.button>
            )}
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}