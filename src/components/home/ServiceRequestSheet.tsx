import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
interface ServiceRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  color: string;
  icon: ReactNode;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
}
export function ServiceRequestSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  color,
  icon,
  children,
  onSubmit,
  submitLabel = 'Continue'
}: ServiceRequestSheetProps) {
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

          {/* Sheet */}
          <motion.div className="fixed inset-x-0 bottom-0 z-[90] bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[85vh] flex flex-col" initial={{
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              backgroundColor: color + '20'
            }}>
                  {icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  <p className="text-sm text-gray-400">{subtitle}</p>
                </div>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2" style={{
            background: `linear-gradient(135deg, ${color}, ${color}DD)`
          }} whileTap={{
            scale: 0.98
          }} onClick={onSubmit}>
                {submitLabel}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}