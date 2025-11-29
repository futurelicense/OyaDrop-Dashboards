import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
interface ChatButtonProps {
  contactName: string;
  contactType: 'Rider' | 'Driver' | 'Restaurant' | 'Kiosk' | 'Service Provider';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}
export function ChatButton({
  contactName,
  contactType,
  variant = 'primary',
  size = 'md',
  onClick
}: ChatButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30',
    secondary: 'bg-[#131B2E] border border-cyan-500/30 text-cyan-400',
    ghost: 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
  };
  return <motion.button className={`flex items-center gap-2 rounded-xl font-semibold transition-all ${sizeClasses[size]} ${variantClasses[variant]}`} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }} onClick={onClick}>
      <MessageCircle className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} />
      <span>Chat with {contactName}</span>
    </motion.button>;
}