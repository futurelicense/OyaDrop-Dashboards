import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, FileText, Check, AlertCircle } from 'lucide-react';
interface CheckPrescriptionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CheckPrescriptionSheet({
  isOpen,
  onClose
}: CheckPrescriptionSheetProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
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
        

          {/* Bottom Sheet */}
          <motion.div
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col"
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
          
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Check Prescription
                </h2>
                <p className="text-sm text-gray-400">
                  Upload & verify prescription
                </p>
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

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {/* Upload Methods */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-3 block">
                  Upload Prescription
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                  className="p-6 bg-[#0A0E1A] border-2 border-dashed border-white/10 rounded-xl hover:border-purple-500/50 transition-colors"
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                    <Camera className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white text-center">
                      Take Photo
                    </p>
                  </motion.button>
                  <motion.button
                  className="p-6 bg-[#0A0E1A] border-2 border-dashed border-white/10 rounded-xl hover:border-purple-500/50 transition-colors"
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white text-center">
                      Upload File
                    </p>
                  </motion.button>
                </div>
              </div>

              {/* Preview (if uploaded) */}
              {uploadedImage &&
            <motion.div
              className="bg-[#0A0E1A] rounded-2xl overflow-hidden border border-white/10"
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}>
              
                  <img
                src={uploadedImage}
                alt="Prescription"
                className="w-full h-48 object-cover" />
              
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-semibold text-white">
                        Prescription uploaded
                      </span>
                    </div>
                    <motion.button
                  className="p-2 bg-red-500/20 rounded-lg"
                  whileTap={{
                    scale: 0.9
                  }}
                  onClick={() => setUploadedImage(null)}>
                  
                      <X className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                </motion.div>
            }

              {/* Customer Name */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Customer Name *
                </label>
                <input
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-500" />
              
              </div>

              {/* Customer Note */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Customer Note (Optional)
                </label>
                <textarea
                placeholder="Any special instructions or notes..."
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
              
              </div>

              {/* Verification Checklist */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-purple-400 mb-1">
                      Verification Required
                    </p>
                    <p className="text-xs text-gray-400">
                      Ensure prescription is valid, legible, and signed by a
                      licensed physician
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                "Doctor's signature present",
                'Patient name matches',
                'Date is current',
                'Dosage instructions clear'].
                map((item, index) =>
                <motion.button
                  key={index}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 transition-colors text-left"
                  whileTap={{
                    scale: 0.98
                  }}>
                  
                      <div className="w-5 h-5 rounded border-2 border-purple-500/50 flex items-center justify-center">
                        <Check className="w-3 h-3 text-purple-400 opacity-0" />
                      </div>
                      <span className="text-xs text-gray-300">{item}</span>
                    </motion.button>
                )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] space-y-2">
              <motion.button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              whileTap={{
                scale: 0.98
              }}>
              
                <Check className="w-5 h-5" />
                Submit for Review
              </motion.button>
              <p className="text-xs text-center text-gray-500">
                Prescription will be added to review queue
              </p>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}