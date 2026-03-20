import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginScreen } from '../components/auth/LoginScreen';
import { SignupScreen } from '../components/auth/SignupScreen';
interface AuthPageProps {
  onBack: () => void;
}
export function AuthPage({ onBack }: AuthPageProps) {
  const [view, setView] = useState<'login' | 'signup'>('login');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Close Button (for demo purposes to return to app) */}
      <button
        onClick={onBack}
        className="absolute top-6 right-6 p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-50">
        
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12" />
          
        </svg>
      </button>

      <AnimatePresence mode="wait">
        {view === 'login' ?
        <motion.div key="login" className="w-full flex justify-center z-10">
            <LoginScreen
            onSwitchToSignup={() => setView('signup')}
            onLoginSuccess={onBack} />
          
          </motion.div> :

        <motion.div key="signup" className="w-full flex justify-center z-10">
            <SignupScreen
            onSwitchToLogin={() => setView('login')}
            onSignupSuccess={onBack} />
          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}