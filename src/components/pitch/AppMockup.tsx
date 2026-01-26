import React from 'react';
import { motion } from 'framer-motion';
interface AppMockupProps {
  type: 'phone' | 'desktop';
  children: React.ReactNode;
  delay?: number;
}
export function AppMockup({ type, children, delay = 0 }: AppMockupProps) {
  if (type === 'phone') {
    return (
      <motion.div
        className="relative"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay
        }}>

        {/* Phone Frame */}
        <div
          className="relative mx-auto"
          style={{
            width: '280px'
          }}>

          {/* Phone Bezel */}
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />

            {/* Screen */}
            <div
              className="relative bg-black rounded-[2rem] overflow-hidden"
              style={{
                height: '560px'
              }}>

              <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                {children}
              </div>
            </div>
          </div>
        </div>
      </motion.div>);

  }
  return (
    <motion.div
      className="relative"
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay
      }}>

      {/* Desktop Frame */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl p-2 shadow-2xl">
        {/* Browser Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-t-lg mb-1">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-gray-600 rounded px-2 py-0.5">
            <p className="text-[8px] text-gray-400">oyadrop.com</p>
          </div>
        </div>

        {/* Screen */}
        <div
          className="relative bg-black rounded-b-lg overflow-hidden"
          style={{
            height: '400px'
          }}>

          <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </motion.div>);

}