import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBagIcon,
  UtensilsIcon,
  CarIcon,
  PackageIcon,
  HomeIcon,
  SparklesIcon,
  PillIcon,
  ScissorsIcon } from
'lucide-react';
export function SplashScreen() {
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    // Trigger exit animation at 3000ms (component unmounts at 3500ms in App.tsx)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // Generate 40 random particles for the convergence effect
  const particles = useMemo(() => {
    return Array.from({
      length: 40
    }).map((_, i) => {
      // Random starting positions far from center
      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 300;
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      // Target positions forming a rough square outline (the logo shape)
      const targetAngle = i / 40 * Math.PI * 2;
      const targetDistance = 45; // roughly half the logo size
      // Math to make it a square-ish shape instead of perfect circle
      const absCos = Math.abs(Math.cos(targetAngle));
      const absSin = Math.abs(Math.sin(targetAngle));
      const r = targetDistance / Math.max(absCos, absSin);
      const endX = Math.cos(targetAngle) * r;
      const endY = Math.sin(targetAngle) * r;
      const colors = ['bg-cyan-400', 'bg-teal-400', 'bg-white', 'bg-cyan-300'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 1 + Math.random() * 2;
      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        color,
        size,
        delay: 0.3 + Math.random() * 0.5
      };
    });
  }, []);
  const services = [
  {
    Icon: ShoppingBagIcon,
    color: 'text-cyan-400',
    glow: 'shadow-cyan-400/50'
  },
  {
    Icon: UtensilsIcon,
    color: 'text-orange-400',
    glow: 'shadow-orange-400/50'
  },
  {
    Icon: CarIcon,
    color: 'text-blue-400',
    glow: 'shadow-blue-400/50'
  },
  {
    Icon: PackageIcon,
    color: 'text-yellow-400',
    glow: 'shadow-yellow-400/50'
  },
  {
    Icon: HomeIcon,
    color: 'text-purple-400',
    glow: 'shadow-purple-400/50'
  },
  {
    Icon: SparklesIcon,
    color: 'text-green-400',
    glow: 'shadow-green-400/50'
  },
  {
    Icon: PillIcon,
    color: 'text-red-400',
    glow: 'shadow-red-400/50'
  },
  {
    Icon: ScissorsIcon,
    color: 'text-pink-400',
    glow: 'shadow-pink-400/50'
  }];

  const brandName = 'OyaDrop'.split('');
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Phase 6: Exit White Flash */}
      <AnimatePresence>
        {isExiting &&
        <motion.div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 0.4,
            ease: 'easeOut'
          }} />

        }
      </AnimatePresence>

      <motion.div
        className="relative flex flex-col items-center justify-center w-full h-full"
        animate={
        isExiting ?
        {
          scale: 1.5,
          opacity: 0
        } :
        {
          scale: 1,
          opacity: 1
        }
        }
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}>
        
        {/* Phase 1: Scan Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/30 shadow-[0_0_10px_rgba(0,217,192,0.5)] z-0"
          initial={{
            y: '-10vh',
            opacity: 0
          }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            ease: 'linear'
          }} />
        

        {/* Phase 1: Initial Pulse Dot */}
        <motion.div
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,217,192,1)] z-10"
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 2, 1, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut'
          }} />
        

        {/* Phase 2: Converging Particles */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {particles.map((p) =>
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{
              width: p.size,
              height: p.size
            }}
            initial={{
              x: p.startX,
              y: p.startY,
              opacity: 0
            }}
            animate={{
              x: isExiting ? p.startX * 1.5 : [p.startX, p.endX, p.endX],
              y: isExiting ? p.startY * 1.5 : [p.startY, p.endY, p.endY],
              opacity: isExiting ? 0 : [0, 1, 0]
            }}
            transition={{
              duration: isExiting ? 0.4 : 1.2,
              delay: isExiting ? 0 : p.delay,
              ease: isExiting ? 'easeOut' : 'backOut',
              times: [0, 0.8, 1]
            }} />

          )}
        </div>

        {/* Phase 2: Radial Light Bloom */}
        <motion.div
          className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[60px] z-0 pointer-events-none"
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: isExiting ? 2 : 1,
            opacity: isExiting ? 0 : [0, 0.5, 0.2]
          }}
          transition={{
            duration: 1.5,
            delay: 0.8
          }} />
        

        {/* Center Container for Logo & Ring */}
        <div className="relative flex items-center justify-center w-64 h-64 z-20">
          {/* Progress Indicator Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke="rgba(0, 217, 192, 0.3)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="754" // 2 * PI * 120
              initial={{
                strokeDashoffset: 754
              }}
              animate={{
                strokeDashoffset: isExiting ? 754 : 0
              }}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                delay: 0.2
              }} />
            
          </svg>

          {/* Phase 4: Service Ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{
              rotate: 0
            }}
            animate={{
              rotate: isExiting ? 45 : 15
            }}
            transition={{
              duration: isExiting ? 0.5 : 2,
              delay: 1.5,
              ease: 'easeOut'
            }}>
            
            {services.map((service, i) => {
              const { Icon } = service;
              const angle = i / services.length * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={i}
                  className={`absolute w-8 h-8 flex items-center justify-center bg-black rounded-full border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: isExiting ? x * 1.5 : x,
                    y: isExiting ? y * 1.5 : y,
                    scale: isExiting ? 0 : [0, 1.2, 1],
                    opacity: isExiting ? 0 : [0, 1, 0.6]
                  }}
                  transition={{
                    duration: isExiting ? 0.4 : 0.6,
                    delay: isExiting ? 0 : 1.5 + i * 0.05,
                    ease: 'easeOut'
                  }}>
                  
                  {/* Subtle colored glow behind icon */}
                  <div
                    className={`absolute inset-0 rounded-full blur-sm opacity-50 ${service.glow}`} />
                  
                  <Icon className={`w-4 h-4 ${service.color} relative z-10`} />
                </motion.div>);

            })}
          </motion.div>

          {/* Phase 3: Logo Materialization */}
          <motion.div
            className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(0,217,192,0.4)] overflow-hidden"
            initial={{
              clipPath: 'circle(0% at 50% 50%)',
              opacity: 0
            }}
            animate={{
              clipPath: isExiting ?
              'circle(0% at 50% 50%)' :
              'circle(100% at 50% 50%)',
              opacity: isExiting ? 0 : 1
            }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              ease: 'easeInOut'
            }}>
            
            {/* Shimmer Streak */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 w-[200%]"
              initial={{
                x: '-100%'
              }}
              animate={{
                x: '100%'
              }}
              transition={{
                duration: 0.8,
                delay: 1.8,
                ease: 'easeInOut'
              }} />
            
            <span className="text-white font-bold text-5xl relative z-10">
              O
            </span>
          </motion.div>
        </div>

        {/* Phase 5: Text Reveal */}
        <div className="mt-8 flex flex-col items-center z-20">
          <div className="flex overflow-hidden">
            {brandName.map((letter, index) =>
            <motion.span
              key={index}
              className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent"
              initial={{
                y: 50,
                opacity: 0
              }}
              animate={{
                y: isExiting ? -20 : 0,
                opacity: isExiting ? 0 : 1
              }}
              transition={{
                duration: 0.5,
                delay: isExiting ? 0 : 2.0 + index * 0.05,
                ease: 'easeOut'
              }}>
              
                {letter}
              </motion.span>
            )}
          </div>

          <motion.p
            className="mt-3 text-gray-500 text-xs tracking-[0.25em] uppercase font-medium"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: isExiting ? 0 : 1,
              y: isExiting ? -10 : 0
            }}
            transition={{
              duration: 0.5,
              delay: isExiting ? 0 : 2.5
            }}>
            
            Everything. Everyone. One App.
          </motion.p>
        </div>
      </motion.div>
    </div>);

}