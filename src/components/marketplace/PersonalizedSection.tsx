import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, MapPinIcon, ClockIcon } from 'lucide-react';
interface PersonalizedSectionProps {
  title: string;
  subtitle?: string;
  icon: 'ai' | 'location' | 'time';
  children: React.ReactNode;
}
export function PersonalizedSection({
  title,
  subtitle,
  icon,
  children
}: PersonalizedSectionProps) {
  const icons = {
    ai: SparklesIcon,
    location: MapPinIcon,
    time: ClockIcon
  };
  const Icon = icons[icon];
  return <div className="px-5 py-6">
      <motion.div className="flex items-center gap-3 mb-4" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <div className="w-10 h-10 bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </motion.div>
      {children}
    </div>;
}