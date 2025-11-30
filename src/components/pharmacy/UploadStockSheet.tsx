import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileSpreadsheet, Plus, Check } from 'lucide-react';
interface UploadStockSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function UploadStockSheet({
  isOpen,
  onClose
}: UploadStockSheetProps) {
  const [uploadMethod, setUploadMethod] = useState<'bulk' | 'manual'>('bulk');
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
                <h2 className="text-xl font-bold text-white">Upload Stock</h2>
                <p className="text-sm text-gray-400">
                  Bulk update or add new items
                </p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {/* Method Selection */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-3 block">
                  Upload Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button className={`p-4 rounded-xl border-2 transition-all ${uploadMethod === 'bulk' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`} onClick={() => setUploadMethod('bulk')} whileTap={{
                scale: 0.98
              }}>
                    <FileSpreadsheet className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Bulk Upload</p>
                    <p className="text-xs opacity-70 mt-1">CSV/Excel file</p>
                  </motion.button>
                  <motion.button className={`p-4 rounded-xl border-2 transition-all ${uploadMethod === 'manual' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`} onClick={() => setUploadMethod('manual')} whileTap={{
                scale: 0.98
              }}>
                    <Plus className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Manual Entry</p>
                    <p className="text-xs opacity-70 mt-1">Add one by one</p>
                  </motion.button>
                </div>
              </div>

              {uploadMethod === 'bulk' ? <>
                  {/* Bulk Upload Section */}
                  <div>
                    <label className="text-sm font-semibold text-gray-400 mb-3 block">
                      Upload File
                    </label>
                    <motion.button className="w-full p-12 bg-[#0A0E1A] border-2 border-dashed border-white/10 rounded-xl hover:border-yellow-500/50 transition-colors" whileTap={{
                scale: 0.98
              }}>
                      <Upload className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <p className="text-base font-semibold text-white text-center mb-1">
                        Upload CSV or Excel File
                      </p>
                      <p className="text-sm text-gray-400 text-center">
                        Tap to browse or drag and drop
                      </p>
                    </motion.button>
                  </div>

                  {/* Template Download */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-sm font-bold text-yellow-400 mb-2">
                      Need a template?
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Download our CSV template with the correct format for bulk
                      uploads
                    </p>
                    <motion.button className="w-full py-2.5 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-400 font-semibold text-sm" whileTap={{
                scale: 0.98
              }}>
                      Download Template
                    </motion.button>
                  </div>

                  {/* File Requirements */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-400">
                      File Requirements:
                    </p>
                    {['CSV or Excel format (.csv, .xlsx)', 'Maximum 1000 items per upload', 'Include: Brand Name, Generic Name, Form, Strength, Price, Stock, Expiry', 'Classification: OTC, Prescription, or Controlled'].map((req, index) => <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">{req}</p>
                      </div>)}
                  </div>
                </> : <>
                  {/* Manual Entry Section */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Medication Name
                      </label>
                      <input type="text" placeholder="Search existing medication..." className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                          Add Stock
                        </label>
                        <input type="number" placeholder="0" className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-400 mb-2 block">
                          Batch Number
                        </label>
                        <input type="text" placeholder="BT-2024-001" className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none placeholder:text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-400 mb-2 block">
                        Expiry Date
                      </label>
                      <input type="date" className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-yellow-500/50 focus:outline-none" />
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <p className="text-sm text-cyan-400">
                      <strong>Tip:</strong> Use bulk upload for adding multiple
                      medications at once
                    </p>
                  </div>
                </>}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2" whileTap={{
            scale: 0.98
          }}>
                <Upload className="w-5 h-5" />
                {uploadMethod === 'bulk' ? 'Upload Stock File' : 'Update Stock'}
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}