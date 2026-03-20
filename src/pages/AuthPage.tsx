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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow - subtle, not overpowering */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/[0.04] blur-[100px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-teal-500/[0.03] blur-[100px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }} />
      

      {/* Close Button (for demo navigation back to app) */}
      <button
        onClick={onBack}
        className="absolute top-5 right-5 p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-gray-600 hover:text-white hover:bg-white/[0.06] transition-all z-50">
        
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12" />
          
        </svg>
      </button>

      <AnimatePresence mode="wait">
        {view === 'login' ?
        <motion.div
          key="login"
          className="w-full flex justify-center z-10"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}>
          
            <LoginScreen
            onSwitchToSignup={() => setView('signup')}
            onLoginSuccess={onBack} />
          
          </motion.div> :

        <motion.div
          key="signup"
          className="w-full flex justify-center z-10"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}>
          
            <SignupScreen
            onSwitchToLogin={() => setView('login')}
            onSignupSuccess={onBack} />
          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}