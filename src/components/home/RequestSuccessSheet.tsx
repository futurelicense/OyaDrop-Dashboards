import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ArrowRight } from 'lucide-react';
interface RequestSuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
  color: string;
}
export function RequestSuccessSheet({
  isOpen,
  onClose,
  title,
  message,
  actionLabel,
  onAction,
  color
}: RequestSuccessSheetProps) {
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
        

          {/* Sheet */}
          <motion.div
          className="fixed inset-x-0 bottom-0 z-[90] bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[70vh] flex flex-col"
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
              <h2 className="text-xl font-bold text-white">
                Request Submitted
              </h2>
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
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center justify-center text-center">
              <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                backgroundColor: color + '20'
              }}
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                damping: 15,
                delay: 0.1
              }}>
              
                <CheckCircle
                className="w-12 h-12"
                style={{
                  color
                }} />
              
              </motion.div>

              <motion.h3
              className="text-2xl font-bold text-white mb-3"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2
              }}>
              
                {title}
              </motion.h3>

              <motion.p
              className="text-gray-400 mb-8 max-w-sm"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.3
              }}>
              
                {message}
              </motion.p>

              <motion.button
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}DD)`
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={onAction}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4
              }}>
              
                {actionLabel}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}