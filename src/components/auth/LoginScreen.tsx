import React, { useState, Children } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  MailIcon,
  PhoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ZapIcon,
  UsersIcon } from
'lucide-react';
interface LoginScreenProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}
const stagger = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
export function LoginScreen({
  onSwitchToSignup,
  onLoginSuccess
}: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };
  return (
    <motion.div
      className="w-full max-w-md"
      variants={stagger}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2
        }
      }}>
      
      {/* Logo & Welcome */}
      <motion.div className="text-center mb-8" variants={fadeUp}>
        <motion.div
          className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-[1.25rem] flex items-center justify-center shadow-[0_0_40px_rgba(0,217,192,0.3)] relative overflow-hidden"
          whileHover={{
            scale: 1.05
          }}
          transition={{
            type: 'spring',
            stiffness: 300
          }}>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{
              x: ['-150%', '150%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }} />
          
          <span className="text-white font-bold text-3xl relative z-10">O</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-1.5">Welcome back</h2>
        <p className="text-gray-500 text-sm">
          Sign in to access your OyaDrop account
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden"
        variants={fadeUp}>
        
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

        {/* Toggle Login Method */}
        <LayoutGroup>
          <div className="flex p-1 bg-white/[0.04] rounded-xl mb-6 relative">
            {['email', 'phone'].map((method) =>
            <button
              key={method}
              onClick={() => setLoginMethod(method as 'email' | 'phone')}
              className="flex-1 py-2.5 text-sm font-medium rounded-lg relative z-10 transition-colors duration-200"
              style={{
                color: loginMethod === method ? '#fff' : '#6b7280'
              }}>
              
                <span className="flex items-center justify-center gap-1.5">
                  {method === 'email' ?
                <MailIcon className="w-3.5 h-3.5" /> :

                <PhoneIcon className="w-3.5 h-3.5" />
                }
                  {method === 'email' ? 'Email' : 'Phone'}
                </span>
                {loginMethod === method &&
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-lg border border-white/[0.08]"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }} />

              }
              </button>
            )}
          </div>
        </LayoutGroup>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Phone Input */}
          <AnimatePresence mode="wait">
            <motion.div
              key={loginMethod}
              initial={{
                opacity: 0,
                x: loginMethod === 'email' ? -10 : 10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: loginMethod === 'email' ? 10 : -10
              }}
              transition={{
                duration: 0.2
              }}>
              
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-0.5">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div
                className={`relative rounded-xl transition-all duration-300 ${inputFocus === 'identity' ? 'ring-1 ring-cyan-500/30 shadow-[0_0_15px_rgba(0,217,192,0.1)]' : ''}`}>
                
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {loginMethod === 'email' ?
                  <MailIcon
                    className={`h-[18px] w-[18px] transition-colors duration-200 ${inputFocus === 'identity' ? 'text-cyan-400' : 'text-gray-600'}`} /> :


                  <PhoneIcon
                    className={`h-[18px] w-[18px] transition-colors duration-200 ${inputFocus === 'identity' ? 'text-cyan-400' : 'text-gray-600'}`} />

                  }
                </div>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  placeholder={
                  loginMethod === 'email' ?
                  'you@example.com' :
                  '+234 800 000 0000'
                  }
                  className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/40 transition-all"
                  onFocus={() => setInputFocus('identity')}
                  onBlur={() => setInputFocus(null)}
                  required />
                
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-400 ml-0.5">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-cyan-400/80 hover:text-cyan-300 transition-colors font-medium">
                
                Forgot password?
              </button>
            </div>
            <div
              className={`relative rounded-xl transition-all duration-300 ${inputFocus === 'password' ? 'ring-1 ring-cyan-500/30 shadow-[0_0_15px_rgba(0,217,192,0.1)]' : ''}`}>
              
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockIcon
                  className={`h-[18px] w-[18px] transition-colors duration-200 ${inputFocus === 'password' ? 'text-cyan-400' : 'text-gray-600'}`} />
                
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/40 transition-all"
                onFocus={() => setInputFocus('password')}
                onBlur={() => setInputFocus(null)}
                required />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center">
                
                {showPassword ?
                <EyeOffIcon className="h-[18px] w-[18px] text-gray-600 hover:text-gray-400 transition-colors" /> :

                <EyeIcon className="h-[18px] w-[18px] text-gray-600 hover:text-gray-400 transition-colors" />
                }
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group mt-2 relative overflow-hidden disabled:opacity-80"
            whileTap={{
              scale: 0.98
            }}>
            
            {isLoading ?
            <motion.div
              className="flex items-center gap-2"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}>
              
                <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'linear'
                }} />
              
                <span>Signing in...</span>
              </motion.div> :

            <>
                <span>Sign In</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            }
            {/* Button shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }} />
            
          </motion.button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
          <span className="text-[11px] text-gray-600 uppercase tracking-wider font-medium">
            or
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
        </div>

        {/* Google Login */}
        <motion.button
          type="button"
          className="w-full mt-5 py-3.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white font-medium hover:bg-white/[0.07] transition-all flex items-center justify-center gap-3 text-sm"
          whileTap={{
            scale: 0.98
          }}>
          
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4" />
            
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853" />
            
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05" />
            
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335" />
            
          </svg>
          Continue with Google
        </motion.button>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-6"
        variants={fadeUp}>
        
        {[
        {
          icon: ShieldCheckIcon,
          label: 'Secure'
        },
        {
          icon: ZapIcon,
          label: 'Fast'
        },
        {
          icon: UsersIcon,
          label: '500K+ Users'
        }].
        map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-1.5 text-gray-600">
              <Icon className="w-3 h-3" />
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </div>);

        })}
      </motion.div>

      {/* Sign Up Link */}
      <motion.p
        className="text-center text-sm text-gray-500 mt-5"
        variants={fadeUp}>
        
        New to OyaDrop?{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          
          Create an account
        </button>
      </motion.p>
    </motion.div>);

}