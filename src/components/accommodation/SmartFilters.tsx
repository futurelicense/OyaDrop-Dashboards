import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Wifi, Briefcase, Waves, Coffee, Star, MapPin, X } from 'lucide-react';
const filters = [{
  id: 'price',
  label: 'Price Range',
  icon: DollarSign,
  color: '#10B981'
}, {
  id: 'wifi',
  label: 'Free WiFi',
  icon: Wifi,
  color: '#00D9C0'
}, {
  id: 'workspace',
  label: 'Workspace',
  icon: Briefcase,
  color: '#00F0FF'
}, {
  id: 'pool',
  label: 'Pool/Gym',
  icon: Waves,
  color: '#3B82F6'
}, {
  id: 'breakfast',
  label: 'Breakfast',
  icon: Coffee,
  color: '#F59E0B'
}, {
  id: 'rating',
  label: 'Rating 4.5+',
  icon: Star,
  color: '#FFB800'
}, {
  id: 'area',
  label: 'Area',
  icon: MapPin,
  color: '#B026FF'
}];
export function SmartFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]);
  };
  return <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white">Filters</h3>
        {activeFilters.length > 0 && <motion.button className="text-xs font-semibold text-cyan-400 flex items-center gap-1" onClick={() => setActiveFilters([])} whileTap={{
        scale: 0.95
      }}>
            <X className="w-3 h-3" />
            Clear all
          </motion.button>}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter, index) => {
        const Icon = filter.icon;
        const isActive = activeFilters.includes(filter.id);
        return <motion.button key={filter.id} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'border-2 shadow-lg' : 'bg-[#131B2E] border border-white/10'}`} style={{
          backgroundColor: isActive ? filter.color + '20' : undefined,
          borderColor: isActive ? filter.color : undefined,
          boxShadow: isActive ? `0 0 20px ${filter.color}40` : undefined,
          color: isActive ? filter.color : '#9CA3AF'
        }} onClick={() => toggleFilter(filter.id)} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.05
        }} whileTap={{
          scale: 0.95
        }}>
              <Icon className="w-4 h-4" />
              {filter.label}
            </motion.button>;
      })}
      </div>
    </div>;
}