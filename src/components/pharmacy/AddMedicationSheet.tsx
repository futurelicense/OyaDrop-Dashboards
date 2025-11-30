import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus } from 'lucide-react';
interface AddMedicationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function AddMedicationSheet({
  isOpen,
  onClose
}: AddMedicationSheetProps) {
  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    form: 'Tablet',
    strength: '',
    price: '',
    stock: '',
    classification: 'OTC',
    expiryDate: '',
    batchNumber: ''
  });
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Bottom Sheet */}
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col" initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Add Medication</h2>
                <p className="text-sm text-gray-400">Enter drug details</p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {/* Drug Image Upload */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Drug Image
                </label>
                <motion.button className="w-full p-8 bg-[#0A0E1A] border-2 border-dashed border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors" whileTap={{
              scale: 0.98
            }}>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 text-center">
                    Tap to upload image
                  </p>
                </motion.button>
              </div>

              {/* Brand Name */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Brand Name *
                </label>
                <input type="text" placeholder="e.g., Panadol" value={formData.brandName} onChange={e => setFormData({
              ...formData,
              brandName: e.target.value
            })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              </div>

              {/* Generic Name */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Generic Name *
                </label>
                <input type="text" placeholder="e.g., Paracetamol" value={formData.genericName} onChange={e => setFormData({
              ...formData,
              genericName: e.target.value
            })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              </div>

              {/* Form & Strength */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Form *
                  </label>
                  <select value={formData.form} onChange={e => setFormData({
                ...formData,
                form: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none">
                    <option>Tablet</option>
                    <option>Capsule</option>
                    <option>Syrup</option>
                    <option>Injection</option>
                    <option>Cream</option>
                    <option>Drops</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Strength *
                  </label>
                  <input type="text" placeholder="e.g., 500mg" value={formData.strength} onChange={e => setFormData({
                ...formData,
                strength: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>

              {/* Classification */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Classification *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['OTC', 'Prescription', 'Controlled'].map(type => <motion.button key={type} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.classification === type ? type === 'OTC' ? 'bg-green-500/20 border-green-500 text-green-400' : type === 'Prescription' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`} onClick={() => setFormData({
                ...formData,
                classification: type
              })} whileTap={{
                scale: 0.95
              }}>
                      {type}
                    </motion.button>)}
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Price (₦) *
                  </label>
                  <input type="number" placeholder="0" value={formData.price} onChange={e => setFormData({
                ...formData,
                price: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Stock Qty *
                  </label>
                  <input type="number" placeholder="0" value={formData.stock} onChange={e => setFormData({
                ...formData,
                stock: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>

              {/* Expiry Date & Batch Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Expiry Date *
                  </label>
                  <input type="date" value={formData.expiryDate} onChange={e => setFormData({
                ...formData,
                expiryDate: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-400 mb-2 block">
                    Batch Number
                  </label>
                  <input type="text" placeholder="e.g., BT-2024-001" value={formData.batchNumber} onChange={e => setFormData({
                ...formData,
                batchNumber: e.target.value
              })} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2" whileTap={{
            scale: 0.98
          }}>
                <Plus className="w-5 h-5" />
                Add Medication
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}