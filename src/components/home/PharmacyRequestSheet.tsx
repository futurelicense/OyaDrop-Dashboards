import React, { useState } from 'react';
import { Pill, Upload, Search } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface PharmacyRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: string;
    items?: string;
    hasPrescription: boolean;
  }) => void;
}
export function PharmacyRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: PharmacyRequestSheetProps) {
  const [requestType, setRequestType] = useState<'prescription' | 'otc'>('otc');
  const [items, setItems] = useState('');
  const handleSubmit = () => {
    onSubmit({
      type: requestType,
      items,
      hasPrescription: requestType === 'prescription'
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Pharmacy Request"
      subtitle="Order medications"
      color="#B026FF"
      icon={<Pill className="w-6 h-6 text-purple-400" />}
      onSubmit={handleSubmit}
      submitLabel="Browse Pharmacy">

      <div className="space-y-6">
        {/* Request Type */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            What do you need?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              className={`p-4 rounded-xl border-2 transition-all ${requestType === 'otc' ? 'bg-purple-500/20 border-purple-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setRequestType('otc')}
              whileTap={{
                scale: 0.98
              }}>

              <Search
                className={`w-6 h-6 mx-auto mb-2 ${requestType === 'otc' ? 'text-purple-400' : 'text-gray-400'}`} />

              <p
                className={`text-sm font-semibold ${requestType === 'otc' ? 'text-white' : 'text-gray-400'}`}>

                Over-the-Counter
              </p>
            </motion.button>

            <motion.button
              className={`p-4 rounded-xl border-2 transition-all ${requestType === 'prescription' ? 'bg-purple-500/20 border-purple-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setRequestType('prescription')}
              whileTap={{
                scale: 0.98
              }}>

              <Upload
                className={`w-6 h-6 mx-auto mb-2 ${requestType === 'prescription' ? 'text-purple-400' : 'text-gray-400'}`} />

              <p
                className={`text-sm font-semibold ${requestType === 'prescription' ? 'text-white' : 'text-gray-400'}`}>

                Prescription
              </p>
            </motion.button>
          </div>
        </div>

        {/* Items */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            What are you looking for?
          </label>
          <textarea
            placeholder="e.g., Paracetamol, Vitamin C, Cough syrup..."
            value={items}
            onChange={(e) => setItems(e.target.value)}
            rows={4}
            className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />

        </div>

        {requestType === 'prescription' &&
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <p className="text-sm text-purple-400">
              You'll be able to upload your prescription on the next screen
            </p>
          </div>
        }
      </div>
    </ServiceRequestSheet>);

}