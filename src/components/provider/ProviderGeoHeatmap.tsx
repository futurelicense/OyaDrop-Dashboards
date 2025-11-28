import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, TrendingUp, Zap, Users } from 'lucide-react';
type ProviderType = 'transport' | 'delivery' | 'home-service' | 'professional' | 'artisan';
interface HotspotArea {
  id: string;
  name: string;
  x: number;
  y: number;
  intensity: 'low' | 'medium' | 'high';
  requests: number;
}
interface NearbyRequest {
  id: string;
  x: number;
  y: number;
  distance: string;
  price: number;
}
const hotspots: HotspotArea[] = [{
  id: '1',
  name: 'Lekki Phase 1',
  x: 65,
  y: 35,
  intensity: 'high',
  requests: 12
}, {
  id: '2',
  name: 'Victoria Island',
  x: 45,
  y: 55,
  intensity: 'high',
  requests: 15
}, {
  id: '3',
  name: 'Ikeja',
  x: 30,
  y: 40,
  intensity: 'medium',
  requests: 8
}, {
  id: '4',
  name: 'Ajah',
  x: 75,
  y: 60,
  intensity: 'medium',
  requests: 6
}, {
  id: '5',
  name: 'Yaba',
  x: 50,
  y: 70,
  intensity: 'low',
  requests: 3
}];
const nearbyRequests: NearbyRequest[] = [{
  id: '1',
  x: 60,
  y: 45,
  distance: '0.8 km',
  price: 2500
}, {
  id: '2',
  x: 55,
  y: 50,
  distance: '1.2 km',
  price: 3200
}, {
  id: '3',
  x: 70,
  y: 40,
  distance: '1.5 km',
  price: 2800
}];
interface ProviderGeoHeatmapProps {
  providerType: ProviderType;
}
export function ProviderGeoHeatmap({
  providerType
}: ProviderGeoHeatmapProps) {
  // Only show for transport and delivery providers
  if (providerType !== 'transport' && providerType !== 'delivery') {
    return null;
  }
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return {
          bg: '#EF444440',
          border: '#EF4444',
          glow: '#EF444460'
        };
      case 'medium':
        return {
          bg: '#F59E0B40',
          border: '#F59E0B',
          glow: '#F59E0B60'
        };
      case 'low':
        return {
          bg: '#10B98140',
          border: '#10B981',
          glow: '#10B98160'
        };
      default:
        return {
          bg: '#6B728040',
          border: '#6B7280',
          glow: '#6B728060'
        };
    }
  };
  return <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Demand Map</h2>
          <p className="text-xs text-gray-400">
            Live hotspots and nearby requests
          </p>
        </div>

        <div className="flex items-center gap-2 bg-cyan-500/20 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          <span className="text-xs font-bold text-cyan-400">Live</span>
        </div>
      </div>

      {/* Map Container */}
      <motion.div className="relative h-80 bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-3xl overflow-hidden border border-cyan-500/20" initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5
    }}>
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="provider-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#provider-grid)" />
          </svg>
        </div>

        {/* Provider Location (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <motion.div className="relative w-8 h-8" animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            {/* Pulsing Ring */}
            <motion.div className="absolute inset-0 bg-cyan-500 rounded-full" animate={{
            scale: [1, 2.5, 1],
            opacity: [0.6, 0, 0.6]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
            {/* Center Dot */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full shadow-lg shadow-cyan-500/50 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Demand Hotspots */}
        {hotspots.map((hotspot, index) => {
        const colors = getIntensityColor(hotspot.intensity);
        return <motion.div key={hotspot.id} className="absolute z-10" style={{
          left: `${hotspot.x}%`,
          top: `${hotspot.y}%`
        }} initial={{
          opacity: 0,
          scale: 0
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: index * 0.1
        }}>
              {/* Pulsing Heatmap Circle */}
              <motion.div className="absolute -inset-8 rounded-full" style={{
            backgroundColor: colors.bg,
            border: `2px solid ${colors.border}40`
          }} animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.3, 0.6]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5
          }} />

              {/* Hotspot Marker */}
              <motion.div className="relative w-12 h-12 rounded-full flex flex-col items-center justify-center cursor-pointer" style={{
            backgroundColor: colors.bg,
            border: `2px solid ${colors.border}`,
            boxShadow: `0 0 20px ${colors.glow}`
          }} whileHover={{
            scale: 1.2
          }} whileTap={{
            scale: 0.9
          }}>
                <Users className="w-4 h-4 mb-0.5" style={{
              color: colors.border
            }} />
                <span className="text-xs font-bold" style={{
              color: colors.border
            }}>
                  {hotspot.requests}
                </span>
              </motion.div>

              {/* Tooltip */}
              <motion.div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg whitespace-nowrap" initial={{
            opacity: 0,
            y: 5
          }} whileHover={{
            opacity: 1,
            y: 0
          }}>
                <p className="text-xs font-bold text-white">{hotspot.name}</p>
                <p className="text-[10px] text-gray-400">
                  {hotspot.requests} requests
                </p>
              </motion.div>
            </motion.div>;
      })}

        {/* Nearby Requests */}
        {nearbyRequests.map((request, index) => <motion.div key={request.id} className="absolute z-20" style={{
        left: `${request.x}%`,
        top: `${request.y}%`
      }} initial={{
        opacity: 0,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.5 + index * 0.1
      }}>
            {/* Request Pin */}
            <motion.div className="relative" whileHover={{
          scale: 1.2
        }} animate={{
          y: [0, -5, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3
        }}>
              <MapPin className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />

              {/* Price Badge */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
                ₦{request.price.toLocaleString()}
              </div>
            </motion.div>
          </motion.div>)}

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <motion.button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors" whileTap={{
          scale: 0.9
        }}>
            <span className="text-white text-lg">+</span>
          </motion.button>
          <motion.button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors" whileTap={{
          scale: 0.9
        }}>
            <span className="text-white text-lg">−</span>
          </motion.button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <p className="text-xs font-bold text-white mb-2">Demand Level</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-300">High (10+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-gray-300">Medium (5-9)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-300">Low (1-4)</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
            <p className="text-xs text-gray-400">Nearby Requests</p>
            <p className="text-lg font-bold text-white">
              {nearbyRequests.length}
            </p>
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
            <p className="text-xs text-gray-400">Hot Areas</p>
            <p className="text-lg font-bold text-white">
              {hotspots.filter(h => h.intensity === 'high').length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <motion.button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <TrendingUp className="w-4 h-4" />
          Go to Hotspot
        </motion.button>

        <motion.button className="flex items-center justify-center gap-2 py-3 bg-[#131B2E] border border-white/10 rounded-xl font-bold text-white" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <MapPin className="w-4 h-4" />
          View All Requests
        </motion.button>
      </div>
    </div>;
}