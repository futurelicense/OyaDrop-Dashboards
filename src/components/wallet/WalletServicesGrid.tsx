import React from 'react';
import { motion } from 'framer-motion';
interface ServiceTileProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
}
function ServiceTile({
  icon,
  label,
  delay
}: ServiceTileProps) {
  return <motion.button initial={{
    opacity: 0,
    scale: 0.8
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    duration: 0.3,
    delay
  }} whileHover={{
    scale: 1.05,
    y: -4
  }} whileTap={{
    scale: 0.95
  }} className="relative p-6 rounded-3xl bg-gradient-to-br from-[#132337] to-[#0F1D2E] border border-white/5 hover:border-teal-500/30 transition-all group" style={{
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  }}>
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
        <span className="text-white text-sm font-medium text-center">
          {label}
        </span>
      </div>
    </motion.button>;
}
// 3D-style SVG Icons
function SendIcon() {
  return <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9C0" />
          <stop offset="100%" stopColor="#00A896" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#sendGradient)" opacity="0.2" />
      <path d="M20 32 L44 20 L32 44 L28 32 Z" fill="url(#sendGradient)" />
      <path d="M28 32 L44 20" stroke="#00D9C0" strokeWidth="2" strokeLinecap="round" />
    </svg>;
}
function ReceiveIcon() {
  return <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="receiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      <rect x="16" y="22" width="32" height="24" rx="4" fill="url(#receiveGradient)" opacity="0.3" />
      <rect x="18" y="24" width="28" height="20" rx="3" fill="url(#receiveGradient)" />
      <circle cx="32" cy="34" r="4" fill="white" opacity="0.9" />
      <path d="M32 14 L32 30 M26 24 L32 30 L38 24" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>;
}
function AirtimeIcon() {
  return <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="airtimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="20" y="12" width="24" height="40" rx="4" fill="url(#airtimeGradient)" opacity="0.3" />
      <rect x="22" y="14" width="20" height="36" rx="3" fill="url(#airtimeGradient)" />
      <rect x="26" y="18" width="12" height="8" rx="1" fill="white" opacity="0.2" />
      <circle cx="32" cy="44" r="2" fill="white" opacity="0.9" />
      <path d="M28 32 Q32 28 36 32 M28 36 Q32 32 36 36" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>;
}
function StatementIcon() {
  return <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="statementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect x="18" y="14" width="28" height="36" rx="3" fill="url(#statementGradient)" opacity="0.3" />
      <rect x="20" y="16" width="24" height="32" rx="2" fill="url(#statementGradient)" />
      <line x1="26" y1="24" x2="38" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <line x1="26" y1="30" x2="38" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="36" x2="34" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="38" cy="40" r="6" fill="#10B981" />
      <text x="38" y="43" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
        ₦
      </text>
    </svg>;
}
export function WalletServicesGrid() {
  const services = [{
    icon: <SendIcon />,
    label: 'Send OyaCoin',
    delay: 0.1
  }, {
    icon: <ReceiveIcon />,
    label: 'Receive OyaCoin',
    delay: 0.2
  }, {
    icon: <AirtimeIcon />,
    label: 'Buy Airtime & Data',
    delay: 0.3
  }, {
    icon: <StatementIcon />,
    label: 'e-Statement',
    delay: 0.4
  }];
  return <div className="px-4 pb-8">
      <h2 className="text-white text-lg font-semibold mb-4">Wallet Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, index) => <ServiceTile key={index} {...service} />)}
      </div>
    </div>;
}