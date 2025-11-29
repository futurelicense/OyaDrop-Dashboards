import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
interface Update {
  id: string;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  type: 'text' | 'image' | 'order' | 'ride' | 'service';
  content: string;
  image?: string;
  timestamp: string;
  views: number;
  likes: number;
  hasLiked: boolean;
  isNew: boolean;
}
const mockUpdates: Update[] = [{
  id: '1',
  user: {
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  type: 'text',
  content: 'Just had an amazing lunch at B-square! 🍽️',
  timestamp: '2h ago',
  views: 24,
  likes: 8,
  hasLiked: false,
  isNew: false
}, {
  id: '2',
  user: {
    name: 'B-square Restaurant',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
    role: 'Restaurant'
  },
  type: 'order',
  content: 'New menu alert! Try our special Jollof Rice combo today 🔥',
  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
  timestamp: '3h ago',
  views: 156,
  likes: 42,
  hasLiked: true,
  isNew: true
}, {
  id: '3',
  user: {
    name: 'Tunde - Rider',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Rider'
  },
  type: 'ride',
  content: 'Available for rides in Lekki area! Fast and reliable service 🚗',
  timestamp: '5h ago',
  views: 89,
  likes: 15,
  hasLiked: false,
  isNew: true
}, {
  id: '4',
  user: {
    name: 'TechHub Store',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    role: 'Kiosk'
  },
  type: 'image',
  content: 'Flash sale! 20% off all electronics today only 🎉',
  image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
  timestamp: '8h ago',
  views: 234,
  likes: 67,
  hasLiked: false,
  isNew: true
}];
const typeColors: Record<string, string> = {
  text: '#00D9C0',
  image: '#B026FF',
  order: '#FF6B00',
  ride: '#00F0FF',
  service: '#10B981'
};
interface UpdatesFeedProps {
  onCreateUpdate: () => void;
  onViewUpdate: (update: Update) => void;
}
export function UpdatesFeed({
  onCreateUpdate,
  onViewUpdate
}: UpdatesFeedProps) {
  const [updates, setUpdates] = useState(mockUpdates);
  const toggleLike = (id: string) => {
    setUpdates(prev => prev.map(update => update.id === id ? {
      ...update,
      hasLiked: !update.hasLiked,
      likes: update.hasLiked ? update.likes - 1 : update.likes + 1
    } : update));
  };
  return <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Your Update */}
      <div className="p-4 border-b border-white/10">
        <motion.button className="w-full flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-2 border-dashed border-cyan-500/50 rounded-2xl" whileTap={{
        scale: 0.98
      }} onClick={onCreateUpdate}>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="You" className="w-14 h-14 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-[#0A0E1A]">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-white">Share an update</p>
            <p className="text-xs text-gray-400">
              Let your contacts know what's up
            </p>
          </div>
        </motion.button>
      </div>

      {/* Updates Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {updates.map((update, index) => <motion.button key={update.id} className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10 text-left" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} whileTap={{
          scale: 0.98
        }} onClick={() => onViewUpdate(update)}>
              {/* Header */}
              <div className="flex items-center gap-3 p-4">
                <div className="relative">
                  <img src={update.user.avatar} alt={update.user.name} className="w-12 h-12 rounded-full object-cover" />
                  {update.isNew && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#131B2E]" style={{
                backgroundColor: typeColors[update.type]
              }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate">
                      {update.user.name}
                    </h3>
                    {update.user.role && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                  backgroundColor: typeColors[update.type] + '20',
                  color: typeColors[update.type]
                }}>
                        {update.user.role}
                      </span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{update.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <p className="text-sm text-white mb-3">{update.content}</p>
                {update.image && <img src={update.image} alt="Update" className="w-full h-48 object-cover rounded-xl mb-3" />}

                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      {update.views}
                    </span>
                  </div>
                  <motion.button className={`flex items-center gap-1.5 ${update.hasLiked ? 'text-red-400' : 'text-gray-400'}`} onClick={e => {
                e.stopPropagation();
                toggleLike(update.id);
              }} whileTap={{
                scale: 0.9
              }}>
                    <Heart className={`w-4 h-4 ${update.hasLiked ? 'fill-red-400' : ''}`} />
                    <span className="text-xs font-semibold">
                      {update.likes}
                    </span>
                  </motion.button>
                  <motion.button className="flex items-center gap-1.5 text-gray-400 ml-auto" onClick={e => {
                e.stopPropagation();
              }} whileTap={{
                scale: 0.9
              }}>
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Reply</span>
                  </motion.button>
                </div>
              </div>
            </motion.button>)}
        </div>
      </div>
    </div>;
}