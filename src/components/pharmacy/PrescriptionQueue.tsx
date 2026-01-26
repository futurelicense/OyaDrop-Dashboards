import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, User, Eye, MessageCircle, Check } from 'lucide-react';
interface Prescription {
  id: string;
  prescriptionId: string;
  customerName: string;
  itemsRequested: number;
  uploadedImage: string;
  timeAgo: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  customerNote?: string;
}
const mockPrescriptions: Prescription[] = [
{
  id: '1',
  prescriptionId: '#PRX-1847',
  customerName: 'Chioma Adeyemi',
  itemsRequested: 5,
  uploadedImage:
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
  timeAgo: '2 mins ago',
  status: 'pending',
  customerNote: 'Urgent - needed for tonight'
},
{
  id: '2',
  prescriptionId: '#PRX-1846',
  customerName: 'Emeka Johnson',
  itemsRequested: 3,
  uploadedImage:
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
  timeAgo: '12 mins ago',
  status: 'reviewing'
},
{
  id: '3',
  prescriptionId: '#PRX-1845',
  customerName: 'Grace Okonkwo',
  itemsRequested: 4,
  uploadedImage:
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
  timeAgo: '25 mins ago',
  status: 'approved'
}];

const statusColors = {
  pending: {
    bg: '#FFB80020',
    text: '#FFB800',
    border: '#FFB800'
  },
  reviewing: {
    bg: '#00D9C020',
    text: '#00D9C0',
    border: '#00D9C0'
  },
  approved: {
    bg: '#10B98120',
    text: '#10B981',
    border: '#10B981'
  },
  rejected: {
    bg: '#FF6B0020',
    text: '#FF6B00',
    border: '#FF6B00'
  }
};
interface PrescriptionQueueProps {
  onReviewPrescription: (prescription: Prescription) => void;
}
export function PrescriptionQueue({
  onReviewPrescription
}: PrescriptionQueueProps) {
  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Pending', 'Reviewing', 'Approved', 'Rejected'].map(
            (filter, index) =>
            <motion.button
              key={filter}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm ${index === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`}
              whileTap={{
                scale: 0.95
              }}>

                {filter}
              </motion.button>

          )}
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockPrescriptions.map((prescription, index) => {
          const colors = statusColors[prescription.status];
          return (
            <motion.div
              key={prescription.id}
              className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10"
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
              }}>

              {/* Prescription Image */}
              <div className="relative h-40">
                <img
                  src={prescription.uploadedImage}
                  alt="Prescription"
                  className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border
                    }}>

                    {prescription.status.charAt(0).toUpperCase() +
                    prescription.status.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold text-white mb-1">
                    {prescription.prescriptionId}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <User className="w-4 h-4" />
                    <span>{prescription.customerName}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>{prescription.itemsRequested} items requested</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{prescription.timeAgo}</span>
                  </div>
                </div>

                {prescription.customerNote &&
                <div className="mb-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <p className="text-xs text-orange-400">
                      <strong>Note:</strong> {prescription.customerNote}
                    </p>
                  </div>
                }

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 font-semibold text-sm"
                    whileTap={{
                      scale: 0.98
                    }}>

                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </motion.button>
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-sm shadow-lg"
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => onReviewPrescription(prescription)}>

                    <Eye className="w-4 h-4" />
                    Review Now
                  </motion.button>
                </div>
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}