import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLinkIcon, Share2Icon, CheckIcon } from 'lucide-react';
export function StorefrontActions() {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText('https://oyadrop.com/store/merchant123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="px-5 pb-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Your Storefront
      </h2>

      <div className="flex gap-3">
        <motion.button className="flex-1 bg-gradient-to-r from-[#00d9ff] to-[#00ffcc] rounded-full py-4 px-6 font-semibold text-[#0a0a0f] flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,217,255,0.4)]" whileHover={{
        scale: 1.02,
        boxShadow: '0 0 32px rgba(0,217,255,0.6)'
      }} whileTap={{
        scale: 0.98
      }} initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.8
      }}>
          <ExternalLinkIcon className="w-5 h-5" />
          View Store
        </motion.button>

        <motion.button onClick={handleShare} className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-4 px-6 font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.8
      }}>
          <AnimatePresence mode="wait">
            {copied ? <motion.div key="check" initial={{
            scale: 0,
            rotate: -180
          }} animate={{
            scale: 1,
            rotate: 0
          }} exit={{
            scale: 0,
            rotate: 180
          }} className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-[#00ff88]" />
                Copied!
              </motion.div> : <motion.div key="share" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }} className="flex items-center gap-2">
                <Share2Icon className="w-5 h-5" />
                Share Link
              </motion.div>}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>;
}