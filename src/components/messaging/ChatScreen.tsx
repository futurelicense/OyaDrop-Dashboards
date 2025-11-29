import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Info, Send, Plus, Mic, Image as ImageIcon } from 'lucide-react';
import { InChatActionButtons } from './InChatActionButtons';
import { GroupOrderCard } from './GroupOrderCard';
import { RideRequestCard } from './RideRequestCard';
import { ViewMenuSheet } from './ViewMenuSheet';
import { RequestPickupSheet } from './RequestPickupSheet';
import { StartGroupOrderSheet } from './StartGroupOrderSheet';
interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'contact';
  time: string;
  type: 'text' | 'group-order' | 'ride-request';
  data?: any;
}
const mockMessages: Message[] = [{
  id: '1',
  text: 'Hi! Is the restaurant open now?',
  sender: 'user',
  time: '10:30 AM',
  type: 'text'
}, {
  id: '2',
  text: "Yes, we're open! What would you like to order?",
  sender: 'contact',
  time: '10:31 AM',
  type: 'text'
}, {
  id: '3',
  sender: 'user',
  time: '10:32 AM',
  type: 'group-order',
  data: {
    restaurant: 'B-square Restaurant',
    organizer: 'You',
    deadline: '12:00 PM today'
  }
}, {
  id: '4',
  text: "Great! I'll prepare the group order. Let me know when everyone has confirmed.",
  sender: 'contact',
  time: '10:33 AM',
  type: 'text'
}];
interface ChatScreenProps {
  onBack: () => void;
  contactType?: 'Restaurant' | 'Rider' | 'Driver' | 'Kiosk' | 'Service Provider';
}
export function ChatScreen({
  onBack,
  contactType = 'Restaurant'
}: ChatScreenProps) {
  const [message, setMessage] = useState('');
  const [showActions, setShowActions] = useState(true);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const handleAction = (action: string) => {
    setActiveSheet(action);
  };
  return <>
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        {/* Header */}
        <motion.header className="flex items-center gap-3 p-4 bg-[#131B2E] border-b border-white/10" initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }}>
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onBack} whileTap={{
          scale: 0.95
        }}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>

          <div className="relative flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" alt="B-square Restaurant" className="w-11 h-11 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#131B2E]" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white truncate">
              B-square Restaurant
            </h2>
            <p className="text-xs text-green-400">Online</p>
          </div>

          <div className="flex gap-2">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Phone className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Info className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg, index) => <motion.div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }}>
              {msg.type === 'text' && msg.text && <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.sender === 'user' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-sm' : 'bg-[#131B2E] text-white rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>}

              {msg.type === 'group-order' && msg.data && <GroupOrderCard {...msg.data} />}

              {msg.type === 'ride-request' && msg.data && <RideRequestCard {...msg.data} />}
            </motion.div>)}

          {/* Typing Indicator */}
          <motion.div className="flex justify-start" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }}>
            <div className="bg-[#131B2E] rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{
                y: [0, -5, 0]
              }} transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: 0
              }} />
                <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{
                y: [0, -5, 0]
              }} transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: 0.2
              }} />
                <motion.div className="w-2 h-2 bg-gray-400 rounded-full" animate={{
                y: [0, -5, 0]
              }} transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: 0.4
              }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        {showActions && <InChatActionButtons contactType={contactType} onAction={handleAction} />}

        {/* Input Bar */}
        <div className="p-4 bg-[#131B2E] border-t border-white/10">
          <div className="flex items-center gap-2">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Plus className="w-6 h-6 text-gray-400" />
            </motion.button>

            <div className="flex-1 relative">
              <input type="text" placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-[#0A0E1A] text-white px-4 py-3 pr-10 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              <motion.button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/5 transition-colors" whileTap={{
              scale: 0.95
            }}>
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            {message ? <motion.button className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg shadow-cyan-500/30" whileTap={{
            scale: 0.95
          }} initial={{
            scale: 0
          }} animate={{
            scale: 1
          }}>
                <Send className="w-5 h-5 text-white" />
              </motion.button> : <motion.button className="p-3 bg-[#0A0E1A] rounded-xl border border-white/10" whileTap={{
            scale: 0.95
          }}>
                <Mic className="w-5 h-5 text-gray-400" />
              </motion.button>}
          </div>
        </div>
      </div>

      {/* Action Sheets */}
      <ViewMenuSheet isOpen={activeSheet === 'view-menu'} onClose={() => setActiveSheet(null)} restaurantName="B-square Restaurant" />
      <RequestPickupSheet isOpen={activeSheet === 'request-pickup'} onClose={() => setActiveSheet(null)} driverName="Tunde" />
      <StartGroupOrderSheet isOpen={activeSheet === 'group-order'} onClose={() => setActiveSheet(null)} restaurantName="B-square Restaurant" />
    </>;
}