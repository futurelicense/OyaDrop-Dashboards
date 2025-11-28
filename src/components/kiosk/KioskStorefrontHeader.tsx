import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Facebook, Twitter, Instagram, Youtube, Users } from 'lucide-react';
interface KioskStorefrontHeaderProps {
  vendor: {
    name: string;
    bio: string;
    logo: string;
    banner: string;
    rating: number;
    reviews: number;
    followers: number;
    social: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}
export function KioskStorefrontHeader({
  vendor
}: KioskStorefrontHeaderProps) {
  return <div className="relative">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0E1A]" />
      </div>

      {/* Vendor Info */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="flex items-end gap-4 mb-4">
          {/* Logo */}
          <motion.div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#0A0E1A] shadow-2xl" initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Message Button */}
          <motion.button className="ml-auto mb-2 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl font-semibold text-white text-sm shadow-lg shadow-cyan-500/30" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.3
        }}>
            <MessageCircle className="w-4 h-4" />
            Message
          </motion.button>
        </div>

        {/* Vendor Details */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }}>
          <h1 className="text-2xl font-bold text-white mb-2">{vendor.name}</h1>
          <p className="text-sm text-gray-400 mb-3">{vendor.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">
                {vendor.rating}
              </span>
              <span className="text-xs text-gray-400">
                ({vendor.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-white">
                {vendor.followers.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">followers</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {vendor.social.facebook && <motion.a href={vendor.social.facebook} className="w-9 h-9 bg-[#131B2E] rounded-lg flex items-center justify-center hover:bg-[#1a2332] transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <Facebook className="w-4 h-4 text-gray-400" />
              </motion.a>}
            {vendor.social.twitter && <motion.a href={vendor.social.twitter} className="w-9 h-9 bg-[#131B2E] rounded-lg flex items-center justify-center hover:bg-[#1a2332] transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <Twitter className="w-4 h-4 text-gray-400" />
              </motion.a>}
            {vendor.social.instagram && <motion.a href={vendor.social.instagram} className="w-9 h-9 bg-[#131B2E] rounded-lg flex items-center justify-center hover:bg-[#1a2332] transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <Instagram className="w-4 h-4 text-gray-400" />
              </motion.a>}
            {vendor.social.youtube && <motion.a href={vendor.social.youtube} className="w-9 h-9 bg-[#131B2E] rounded-lg flex items-center justify-center hover:bg-[#1a2332] transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <Youtube className="w-4 h-4 text-gray-400" />
              </motion.a>}
          </div>
        </motion.div>
      </div>
    </div>;
}