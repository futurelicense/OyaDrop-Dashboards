import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Clock, Sparkles } from 'lucide-react';
interface RecommendationTag {
  text: string;
  icon: any;
  color: string;
}
const tags: RecommendationTag[] = [{
  text: 'You Always Order This',
  icon: Sparkles,
  color: '#B026FF'
}, {
  text: 'Trending in Your Area',
  icon: TrendingUp,
  color: '#00F0FF'
}, {
  text: 'XP Boost Meal',
  icon: Sparkles,
  color: '#FFB800'
}, {
  text: 'Perfect for Lunch',
  icon: Clock,
  color: '#00D9C0'
}];
export function SmartRecommendations() {
  return <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Smart Picks for You</h2>
          <p className="text-xs text-gray-400">AI-powered recommendations</p>
        </div>
      </div>

      {/* Recommendation Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
        {tags.map((tag, index) => {
        const Icon = tag.icon;
        return <motion.div key={tag.text} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{
          backgroundColor: `${tag.color}20`,
          borderColor: `${tag.color}40`
        }} initial={{
          opacity: 0,
          x: -10
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <Icon className="w-3 h-3" style={{
            color: tag.color
          }} />
              <span className="text-xs font-semibold" style={{
            color: tag.color
          }}>
                {tag.text}
              </span>
            </motion.div>;
      })}
      </div>
    </div>;
}