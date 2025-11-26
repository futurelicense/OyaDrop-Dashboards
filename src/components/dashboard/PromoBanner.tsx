import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon } from 'lucide-react';
export function PromoBanner() {
  return <motion.div className="px-5 pb-8" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 1.2
  }}>
      <div className="bg-gradient-to-br from-[#1a1a24] via-[#1f1f2e] to-[#1a1a24] rounded-2xl p-6 border border-white/10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30" style={{
        background: 'radial-gradient(circle, #00d9ff, #00ffcc)'
      }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <SparklesIcon className="w-5 h-5 text-[#00d9ff]" />
            <span className="text-xs font-semibold text-[#00d9ff] uppercase tracking-wider">
              New Feature
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Boost Your Sales with AI
          </h3>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">
            Get personalized recommendations to grow your business faster with
            our new AI-powered insights.
          </p>

          <motion.button className="bg-gradient-to-r from-[#00d9ff] to-[#00ffcc] rounded-full py-3 px-6 font-semibold text-[#0a0a0f] flex items-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.3)]" whileHover={{
          scale: 1.05,
          boxShadow: '0 0 28px rgba(0,217,255,0.5)'
        }} whileTap={{
          scale: 0.98
        }}>
            Learn More
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>;
}