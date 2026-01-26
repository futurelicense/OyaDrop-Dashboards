import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Users, MessageCircle } from 'lucide-react';
interface FeatureCardsProps {
  onNavigate?: (view: string) => void;
}
const features = [
{
  id: 'wallet',
  title: 'Earn Rewards',
  description: 'Get points with every order',
  icon: Gift,
  gradient: 'from-yellow-500 to-orange-500',
  color: '#FFB800'
},
{
  id: 'referral',
  title: 'Refer & Earn',
  description: 'Invite friends, get bonuses',
  icon: Users,
  gradient: 'from-green-500 to-teal-500',
  color: '#10B981'
},
{
  id: 'messaging',
  title: 'Chat with Friends',
  description: 'Connect and share with others',
  icon: MessageCircle,
  gradient: 'from-cyan-500 to-blue-500',
  color: '#00D9FF'
}];

export function FeatureCards({ onNavigate }: FeatureCardsProps) {
  const handleFeatureClick = (featureId: string) => {
    if (onNavigate) {
      onNavigate(featureId);
    }
  };
  return (
    <div className="px-4 py-6">
      <motion.h2
        className="text-lg font-bold text-white mb-4"
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}>

        Why OyaDrop?
      </motion.h2>

      <div className="grid grid-cols-1 gap-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.button
              key={feature.id}
              className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-5 relative overflow-hidden text-left`}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              onClick={() => handleFeatureClick(feature.id)}
              whileTap={{
                scale: 0.98
              }}>

              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </div>
              </div>
            </motion.button>);

        })}
      </div>
    </div>);

}