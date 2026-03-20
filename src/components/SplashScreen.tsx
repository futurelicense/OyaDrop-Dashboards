import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Utensils,
  Car,
  Package,
  Home as HomeIcon,
  Sparkles } from
'lucide-react';
export function SplashScreen() {
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    // Trigger the exit animation slightly before the component unmounts
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const services = [
  {
    Icon: ShoppingBag,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    delay: 0.6,
    x: -80,
    y: -80
  },
  {
    Icon: Utensils,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    delay: 0.7,
    x: 80,
    y: -80
  },
  {
    Icon: Car,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    delay: 0.8,
    x: -110,
    y: 20
  },
  {
    Icon: Package,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    delay: 0.9,
    x: 110,
    y: 20
  },
  {
    Icon: HomeIcon,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    delay: 1.0,
    x: -60,
    y: 100
  },
  {
    Icon: Sparkles,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    delay: 1.1,
    x: 60,
    y: 100
  }];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0E1A] overflow-hidden">
      {/* Ambient Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-teal-500/10"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: isExiting ? 0 : 1
        }}
        transition={{
          duration: 1.5
        }} />
      

      {/* Floating Service Icons */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {services.map((service, i) => {
          const { Icon } = service;
          return (
            <motion.div
              key={i}
              className={`absolute w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center backdrop-blur-md border border-white/10 shadow-xl`}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0
              }}
              animate={{
                opacity: isExiting ? 0 : [0, 1, 1],
                scale: isExiting ? 0.5 : [0, 1, 1],
                x: isExiting ? 0 : [0, service.x, service.x],
                y: isExiting ? 0 : [0, service.y, service.y]
              }}
              transition={{
                duration: isExiting ? 0.5 : 2,
                delay: isExiting ? 0 : service.delay,
                ease: isExiting ? 'easeInOut' : 'easeOut',
                times: [0, 0.4, 1]
              }}>
              
              <Icon className={`w-6 h-6 ${service.color}`} />
            </motion.div>);

        })}
      </div>

      {/* Main Logo & Text */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.2 : 1
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}>
        
        {/* Logo */}
        <motion.div
          className="w-28 h-28 mb-6 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-[2rem] flex items-center justify-center shadow-[0_0_60px_rgba(0,217,192,0.3)] relative overflow-hidden"
          initial={{
            scale: 0,
            rotate: -20
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 0.2
          }}>
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
            initial={{
              x: '-150%'
            }}
            animate={{
              x: '150%'
            }}
            transition={{
              duration: 1.5,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 1
            }} />
          
          <span className="text-white font-bold text-6xl">O</span>
        </motion.div>

        {/* Brand Name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-3 text-center"
            initial={{
              y: 50,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: 0.4
            }}>
            
            OyaDrop
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden">
          <motion.p
            className="text-gray-400 text-sm tracking-[0.3em] uppercase font-semibold"
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: 0.6
            }}>
            
            Super App Platform
          </motion.p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: isExiting ? 0 : 1
        }}
        transition={{
          delay: 0.8
        }}>
        
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-500"
          initial={{
            width: '0%'
          }}
          animate={{
            width: '100%'
          }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
            delay: 0.8
          }} />
        
      </motion.div>
    </div>);

}