import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MessageCircle,
  Tag,
  ArrowRight } from
'lucide-react';
interface SignupScreenProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}
export function SignupScreen({
  onSwitchToLogin,
  onSignupSuccess
}: SignupScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup success
    onSignupSuccess();
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
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400">Join the OyaDrop ecosystem</p>
      </div>

      <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  required />
                
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  required />
                
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Unique Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-bold">@</span>
              </div>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  required />
                
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
                WhatsApp Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageCircle className="h-4 w-4 text-green-500/70" />
                </div>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
                
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Create Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                
                {showPassword ?
                <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" /> :

                <Eye className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" />
                }
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Re-create Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                required />
              
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                
                {showConfirmPassword ?
                <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" /> :

                <Eye className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" />
                }
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Referral Code (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="OYA-XXXX"
                className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm uppercase focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-bold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group mt-6">
            
            Create Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
          
          Sign in
        </button>
      </p>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>);

}