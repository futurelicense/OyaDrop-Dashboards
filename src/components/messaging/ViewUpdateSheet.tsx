import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
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
interface ViewUpdateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  update: Update | null;
}
export function ViewUpdateSheet({
  isOpen,
  onClose,
  update
}: ViewUpdateSheetProps) {
  const [hasLiked, setHasLiked] = useState(update?.hasLiked || false);
  const [likes, setLikes] = useState(update?.likes || 0);
  const [reply, setReply] = useState('');
  if (!update) return null;
  const toggleLike = () => {
    setHasLiked(!hasLiked);
    setLikes(hasLiked ? likes - 1 : likes + 1);
  };
  const typeColors: Record<string, string> = {
    text: '#00D9C0',
    image: '#B026FF',
    order: '#FF6B00',
    ride: '#00F0FF',
    service: '#10B981'
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Full Screen View */}
          <motion.div className="fixed inset-0 z-[90] flex flex-col bg-[#0A0E1A]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src={update.user.avatar} alt={update.user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">
                      {update.user.name}
                    </h3>
                    {update.user.role && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                  backgroundColor: typeColors[update.type] + '20',
                  color: typeColors[update.type]
                }}>
                        {update.user.role}
                      </span>}
                  </div>
                  <p className="text-xs text-gray-400">{update.timestamp}</p>
                </div>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {update.image && <motion.img src={update.image} alt="Update" className="w-full rounded-2xl mb-4" initial={{
            scale: 0.9,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            type: 'spring',
            damping: 20
          }} />}
              <p className="text-base text-white leading-relaxed">
                {update.content}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {update.views} views
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  <span className="text-sm font-semibold">{likes} likes</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-white/10 bg-[#131B2E]">
              <div className="flex gap-2 mb-3">
                <motion.button className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${hasLiked ? 'bg-red-500/20 border-2 border-red-500 text-red-400' : 'bg-[#0A0E1A] border-2 border-white/10 text-white'}`} whileTap={{
              scale: 0.98
            }} onClick={toggleLike}>
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-red-400' : ''}`} />
                  {hasLiked ? 'Liked' : 'Like'}
                </motion.button>
                <motion.button className="flex-1 py-3 bg-[#0A0E1A] border-2 border-white/10 rounded-xl text-white font-semibold flex items-center justify-center gap-2" whileTap={{
              scale: 0.98
            }}>
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>

              {/* Reply Input */}
              <div className="flex gap-2">
                <input type="text" placeholder="Reply to this update..." value={reply} onChange={e => setReply(e.target.value)} className="flex-1 bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                <motion.button className="px-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50" whileTap={{
              scale: reply ? 0.98 : 1
            }} disabled={!reply}>
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}