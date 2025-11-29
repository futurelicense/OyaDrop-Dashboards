import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Award } from 'lucide-react';
interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'Hotel' | 'Shortlet Agency' | 'Shared Living';
  rating: number;
  properties: number;
  verified: boolean;
  featured?: boolean;
}
const partners: Partner[] = [{
  id: '1',
  name: 'Radisson Blu',
  logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop',
  type: 'Hotel',
  rating: 4.9,
  properties: 3,
  verified: true,
  featured: true
}, {
  id: '2',
  name: 'Eko Hotels & Suites',
  logo: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&h=200&fit=crop',
  type: 'Hotel',
  rating: 4.8,
  properties: 5,
  verified: true,
  featured: true
}, {
  id: '3',
  name: 'Shortlet.ng',
  logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop',
  type: 'Shortlet Agency',
  rating: 4.7,
  properties: 127,
  verified: true
}, {
  id: '4',
  name: 'Lagos Shortlets',
  logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=200&fit=crop',
  type: 'Shortlet Agency',
  rating: 4.6,
  properties: 89,
  verified: true
}, {
  id: '5',
  name: 'Co-Living Lagos',
  logo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
  type: 'Shared Living',
  rating: 4.8,
  properties: 45,
  verified: true
}, {
  id: '6',
  name: 'Urban Spaces',
  logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
  type: 'Shared Living',
  rating: 4.5,
  properties: 32,
  verified: true
}];
const typeColors: Record<string, string> = {
  Hotel: '#00D9C0',
  'Shortlet Agency': '#00F0FF',
  'Shared Living': '#B026FF'
};
interface FeaturedPartnersProps {
  onPartnerSelect?: (partner: Partner) => void;
}
export function FeaturedPartners({
  onPartnerSelect
}: FeaturedPartnersProps) {
  return <div className="px-4 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-1">Featured Partners</h2>
        <p className="text-sm text-gray-400">Trusted hotels and agencies</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {partners.map((partner, index) => <motion.button key={partner.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 relative overflow-hidden text-left" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} whileHover={{
        y: -4,
        borderColor: '#00D9C040'
      }} whileTap={{
        scale: 0.98
      }} onClick={() => onPartnerSelect?.(partner)}>
            {/* Featured Badge */}
            {partner.featured && <div className="absolute top-2 right-2">
                <motion.div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1.5 rounded-lg shadow-lg" animate={{
            rotate: [0, -5, 5, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
                  <Award className="w-3 h-3 text-black" />
                </motion.div>
              </div>}

            {/* Logo */}
            <div className="relative w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden border-2 border-white/10">
              <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
            </div>

            {/* Partner Info */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {partner.name}
                </h3>
                {partner.verified && <CheckCircle className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 flex-shrink-0" />}
              </div>

              <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2" style={{
            backgroundColor: typeColors[partner.type] + '20',
            color: typeColors[partner.type]
          }}>
                {partner.type}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-white">
                  {partner.rating}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {partner.properties} properties
              </span>
            </div>
          </motion.button>)}
      </div>
    </div>;
}