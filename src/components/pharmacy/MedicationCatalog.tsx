import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Search, Filter, AlertCircle } from 'lucide-react';
interface Medication {
  id: string;
  brandName: string;
  genericName: string;
  form: 'Tablet' | 'Syrup' | 'Injection' | 'Cream' | 'Capsule';
  strength: string;
  price: number;
  stock: number;
  image: string;
  available: boolean;
  classification: 'OTC' | 'Prescription' | 'Controlled';
  expiryDays: number;
}
const mockMedications: Medication[] = [{
  id: '1',
  brandName: 'Panadol',
  genericName: 'Paracetamol',
  form: 'Tablet',
  strength: '500mg',
  price: 150,
  stock: 120,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
  available: true,
  classification: 'OTC',
  expiryDays: 180
}, {
  id: '2',
  brandName: 'Augmentin',
  genericName: 'Amoxicillin/Clavulanate',
  form: 'Tablet',
  strength: '625mg',
  price: 2500,
  stock: 8,
  image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop',
  available: true,
  classification: 'Prescription',
  expiryDays: 45
}, {
  id: '3',
  brandName: 'Benylin',
  genericName: 'Dextromethorphan',
  form: 'Syrup',
  strength: '100ml',
  price: 1200,
  stock: 0,
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop',
  available: false,
  classification: 'OTC',
  expiryDays: 90
}, {
  id: '4',
  brandName: 'Tramadol',
  genericName: 'Tramadol HCl',
  form: 'Capsule',
  strength: '50mg',
  price: 800,
  stock: 24,
  image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop',
  available: true,
  classification: 'Controlled',
  expiryDays: 15
}];
const classificationColors = {
  OTC: {
    bg: '#10B98120',
    text: '#10B981',
    border: '#10B981'
  },
  Prescription: {
    bg: '#B026FF20',
    text: '#B026FF',
    border: '#B026FF'
  },
  Controlled: {
    bg: '#FF6B0020',
    text: '#FF6B00',
    border: '#FF6B00'
  }
};
export function MedicationCatalog() {
  const [medications, setMedications] = useState(mockMedications);
  const toggleAvailability = (id: string) => {
    setMedications(prev => prev.map(m => m.id === id ? {
      ...m,
      available: !m.available
    } : m));
  };
  const getExpiryColor = (days: number) => {
    if (days <= 14) return '#FF6B00';
    if (days <= 30) return '#FFB800';
    return '#10B981';
  };
  return <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Search & Filter */}
      <div className="p-4 space-y-3 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by name, brand, ingredient..." className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
        </div>
        <div className="flex gap-2">
          <motion.button className="flex items-center gap-2 px-4 py-2 bg-[#131B2E] border border-white/10 rounded-xl text-white text-sm font-semibold" whileTap={{
          scale: 0.95
        }}>
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
          <motion.button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-semibold" whileTap={{
          scale: 0.95
        }}>
            Batch Update
          </motion.button>
        </div>
      </div>

      {/* Medication Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {medications.map((med, index) => {
          const classColors = classificationColors[med.classification];
          const expiryColor = getExpiryColor(med.expiryDays);
          return <motion.div key={med.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: index * 0.05
          }}>
                {/* Image */}
                <div className="relative aspect-square">
                  <img src={med.image} alt={med.brandName} className="w-full h-full object-cover" />
                  {!med.available && <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        Unavailable
                      </span>
                    </div>}

                  {/* Classification Badge */}
                  <div className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-lg border" style={{
                backgroundColor: classColors.bg,
                color: classColors.text,
                borderColor: classColors.border
              }}>
                    {med.classification}
                  </div>

                  {/* Stock Alerts */}
                  {med.stock === 0 && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      Out of Stock
                    </div>}
                  {med.stock > 0 && med.stock <= 10 && <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      Low Stock
                    </div>}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white mb-0.5 line-clamp-1">
                    {med.brandName}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                    {med.genericName}
                  </p>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">{med.form}</span>
                    <span className="text-xs text-cyan-400 font-semibold">
                      {med.strength}
                    </span>
                  </div>

                  <p className="text-lg font-bold text-cyan-400 mb-2">
                    ₦{med.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">
                      Stock: {med.stock}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{
                    backgroundColor: expiryColor
                  }} />
                      <span className="text-xs text-gray-400">
                        {med.expiryDays}d
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${med.available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'}`} whileTap={{
                  scale: 0.95
                }} onClick={() => toggleAvailability(med.id)}>
                      {med.available ? 'Available' : 'Unavailable'}
                    </motion.button>
                    <motion.button className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg" whileTap={{
                  scale: 0.95
                }}>
                      <Edit2 className="w-4 h-4 text-cyan-400" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>;
        })}
        </div>
      </div>
    </div>;
}