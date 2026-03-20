import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
interface PasswordGateProps {
  onUnlock: () => void;
}
export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'global') {
      // Store in sessionStorage so they don't have to re-enter during session
      sessionStorage.setItem('app_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError(false);
      }, 820);
      setPassword('');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 217, 192, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 192, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }} />
        
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) =>
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }} />

      )}

      <motion.div
        className="relative max-w-md w-full"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}>
        
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay: 0.2,
            type: 'spring'
          }}>
          
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
            <span className="text-white font-bold text-3xl">O</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-2">
            OyaDrop v2.0
          </h1>
          <p className="text-gray-400 text-sm">Super App Platform</p>
        </motion.div>

        {/* Password Form */}
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: isShaking ? [-10, 10, -10, 10, -5, 5, 0] : 0
          }}
          transition={{
            opacity: {
              delay: 0.3
            },
            y: {
              delay: 0.3
            },
            x: {
              duration: 0.4
            }
          }}>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Protected Access</h2>
              <p className="text-xs text-gray-400">
                Enter password to continue
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`w-full px-4 py-3 bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all pr-12`}
                autoFocus />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors">
                
                {showPassword ?
                <EyeOff className="w-5 h-5 text-gray-400" /> :

                <Eye className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>

            {error &&
            <motion.div
              className="flex items-center gap-2 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}>
              
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">
                  Incorrect password. Please try again.
                </p>
              </motion.div>
            }

            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-bold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/20"
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}>
              
              Unlock Platform
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-gray-500 mt-6"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}>
          
          This platform is password protected for authorized access only.
        </motion.p>
      </motion.div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>);

}