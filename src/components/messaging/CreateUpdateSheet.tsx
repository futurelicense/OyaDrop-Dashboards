import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Type, Smile, Send } from 'lucide-react';
interface CreateUpdateSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CreateUpdateSheet({
  isOpen,
  onClose
}: CreateUpdateSheetProps) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const quickMessages = ['🍽️ Just had an amazing meal!', '🚗 Available for rides now', '🎉 Special offer today!', '✅ Job completed successfully', '📦 New products in stock', '💯 Great service experience'];
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
                <h2 className="text-xl font-bold text-white">Create Update</h2>
                <p className="text-sm text-gray-400">
                  Share with your contacts
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
              {/* Text Input */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  What's on your mind?
                </label>
                <textarea placeholder="Share an update with your contacts..." value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
              </div>

              {/* Quick Messages */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  Quick messages
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickMessages.map((msg, index) => <motion.button key={index} className="p-3 bg-[#0A0E1A] border border-white/10 rounded-xl text-left text-sm text-white hover:border-cyan-500/50 transition-colors" initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.05
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setContent(msg)}>
                      {msg}
                    </motion.button>)}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Add image (optional)
                </label>
                <motion.button className="w-full p-8 bg-[#0A0E1A] border-2 border-dashed border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors" whileTap={{
              scale: 0.98
            }}>
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 text-center">
                    Tap to add image
                  </p>
                </motion.button>
              </div>

              {/* Privacy Info */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <p className="text-sm text-cyan-400 mb-1">
                  <strong>Who can see this?</strong>
                </p>
                <p className="text-xs text-gray-400">
                  Your update will be visible to all your contacts for 24 hours
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" whileTap={{
            scale: content ? 0.98 : 1
          }} disabled={!content}>
                <Send className="w-5 h-5" />
                Post Update
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}