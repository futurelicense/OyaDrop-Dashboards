import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
interface LoginScreenProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}
export function LoginScreen({
  onSwitchToSignup,
  onLoginSuccess
}: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    onLoginSuccess();
  };
  return (
    <motion.div
      className="w-full max-w-md"
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      transition={{
        duration: 0.3
      }}>
      
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="text-white font-bold text-2xl">O</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to continue to OyaDrop</p>
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        {/* Toggle Login Method */}
        <div className="flex p-1 bg-black/40 rounded-xl mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginMethod === 'email' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
            
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginMethod === 'phone' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
            
            Phone Number
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Phone Input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {loginMethod === 'email' ?
                <Mail className="h-5 w-5 text-gray-500" /> :

                <Phone className="h-5 w-5 text-gray-500" />
                }
              </div>
              <input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={
                loginMethod === 'email' ?
                'you@example.com' :
                '+234 800 000 0000'
                }
                className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center">
                
                {showPassword ?
                <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" /> :

                <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
                }
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-bold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group mt-6">
            
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-4 text-xs text-gray-500 uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3">
          
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
          Google
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          
          Sign up
        </button>
      </p>
    </motion.div>);

}