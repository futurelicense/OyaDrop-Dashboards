import React from 'react';
import { motion } from 'framer-motion';
import { Search, Pin, Car, UtensilsCrossed, ShoppingBag, Wrench } from 'lucide-react';
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  role: 'Rider' | 'Restaurant' | 'Kiosk' | 'Service Provider' | 'User';
  lastMessage: string;
  time: string;
  unread: number;
  isPinned?: boolean;
  serviceIcon?: 'car' | 'food' | 'shop' | 'service';
  status: 'online' | 'offline';
}
const mockConversations: Conversation[] = [{
  id: '1',
  name: 'B-square Restaurant',
  avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
  role: 'Restaurant',
  lastMessage: 'Your order is ready for pickup!',
  time: '2m',
  unread: 2,
  isPinned: true,
  serviceIcon: 'food',
  status: 'online'
}, {
  id: '2',
  name: 'Tunde - Rider',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  role: 'Rider',
  lastMessage: "I'm 5 minutes away",
  time: '10m',
  unread: 0,
  serviceIcon: 'car',
  status: 'online'
}, {
  id: '3',
  name: 'TechHub Store',
  avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
  role: 'Kiosk',
  lastMessage: 'Thanks for your order!',
  time: '1h',
  unread: 0,
  serviceIcon: 'shop',
  status: 'offline'
}, {
  id: '4',
  name: 'Grace - Plumber',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  role: 'Service Provider',
  lastMessage: 'Job completed. Please confirm.',
  time: '3h',
  unread: 1,
  serviceIcon: 'service',
  status: 'offline'
}];
const serviceIcons = {
  car: Car,
  food: UtensilsCrossed,
  shop: ShoppingBag,
  service: Wrench
};
interface ChatConversationsListProps {
  onSelectChat?: (conversation: Conversation) => void;
}
export function ChatConversationsList({
  onSelectChat
}: ChatConversationsListProps) {
  return <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search conversations..." className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map((conversation, index) => {
        const ServiceIcon = conversation.serviceIcon ? serviceIcons[conversation.serviceIcon] : null;
        return <motion.button key={conversation.id} className="w-full flex items-center gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.05
        }} whileTap={{
          scale: 0.98
        }} onClick={() => onSelectChat?.(conversation)}>
              {/* Pinned Indicator */}
              {conversation.isPinned && <div className="absolute top-2 left-2">
                  <Pin className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                </div>}

              {/* Avatar with Status */}
              <div className="relative flex-shrink-0">
                <img src={conversation.avatar} alt={conversation.name} className="w-14 h-14 rounded-full object-cover" />
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0A0E1A] ${conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
              </div>

              {/* Info */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-white truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                    {conversation.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {ServiceIcon && <ServiceIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                  <p className="text-sm text-gray-400 truncate flex-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && <span className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {conversation.unread}
                    </span>}
                </div>
              </div>
            </motion.button>;
      })}
      </div>
    </div>;
}