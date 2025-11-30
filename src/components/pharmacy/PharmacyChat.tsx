import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Send, Image as ImageIcon, FileText, Package } from 'lucide-react';
interface Conversation {
  id: string;
  customerName: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  orderNumber?: string;
  hasPrescription?: boolean;
}
const mockConversations: Conversation[] = [{
  id: '1',
  customerName: 'Chioma Adeyemi',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  lastMessage: 'Do you have Augmentin 625mg?',
  time: '2m',
  unread: 2,
  orderNumber: '#RX-2847',
  hasPrescription: true
}, {
  id: '2',
  customerName: 'Tunde Bakare',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  lastMessage: 'When will my prescription be ready?',
  time: '15m',
  unread: 0,
  orderNumber: '#RX-2846',
  hasPrescription: true
}, {
  id: '3',
  customerName: 'Grace Okonkwo',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  lastMessage: 'Thank you for the quick service!',
  time: '1h',
  unread: 0,
  orderNumber: '#OTC-2845'
}];
interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'pharmacy';
  time: string;
}
const mockMessages: Message[] = [{
  id: '1',
  text: 'Hi! Do you have Augmentin 625mg in stock?',
  sender: 'customer',
  time: '10:30 AM'
}, {
  id: '2',
  text: 'Yes, we have Augmentin 625mg available. This is a prescription medication. Do you have a valid prescription?',
  sender: 'pharmacy',
  time: '10:31 AM'
}, {
  id: '3',
  text: 'Yes, I have a prescription. Can I upload it?',
  sender: 'customer',
  time: '10:32 AM'
}];
type View = 'list' | 'chat';
export function PharmacyChat() {
  const [view, setView] = useState<View>('list');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setView('chat');
  };
  const handleBack = () => {
    setView('list');
    setSelectedConversation(null);
  };
  if (view === 'chat' && selectedConversation) {
    return <div className="flex flex-col h-full bg-[#0A0E1A]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 bg-[#131B2E] border-b border-white/10">
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={handleBack} whileTap={{
          scale: 0.95
        }}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>

          <img src={selectedConversation.avatar} alt={selectedConversation.customerName} className="w-10 h-10 rounded-full object-cover" />

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">
              {selectedConversation.customerName}
            </h3>
            <div className="flex items-center gap-2">
              {selectedConversation.orderNumber && <p className="text-xs text-gray-400">
                  {selectedConversation.orderNumber}
                </p>}
              {selectedConversation.hasPrescription && <span className="text-xs font-bold px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                  Rx
                </span>}
            </div>
          </div>

          <motion.button className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl" whileTap={{
          scale: 0.95
        }}>
            <Package className="w-5 h-5 text-cyan-400" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg, index) => <motion.div key={msg.id} className={`flex ${msg.sender === 'pharmacy' ? 'justify-end' : 'justify-start'}`} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.sender === 'pharmacy' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-sm' : 'bg-[#131B2E] text-white rounded-bl-sm'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'pharmacy' ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>)}
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-white/10 bg-[#131B2E]">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Medication available', 'Out of stock', 'Prescription required', 'Ready in 15 mins'].map(reply => <motion.button key={reply} className="flex-shrink-0 px-3 py-2 bg-[#0A0E1A] border border-white/10 rounded-xl text-xs font-semibold text-white" whileTap={{
            scale: 0.95
          }}>
                {reply}
              </motion.button>)}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-[#131B2E] border-t border-white/10">
          <div className="flex items-center gap-2">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </motion.button>

            <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} className="flex-1 bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />

            <motion.button className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg" whileTap={{
            scale: 0.95
          }}>
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>;
  }
  return <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search conversations..." className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map((conversation, index) => <motion.button key={conversation.id} className="w-full flex items-center gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }} whileTap={{
        scale: 0.98
      }} onClick={() => handleSelectConversation(conversation)}>
            <div className="relative flex-shrink-0">
              <img src={conversation.avatar} alt={conversation.customerName} className="w-14 h-14 rounded-full object-cover" />
              {conversation.unread > 0 && <div className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-[#0A0E1A]">
                  <span className="text-xs font-bold text-white">
                    {conversation.unread}
                  </span>
                </div>}
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white truncate">
                  {conversation.customerName}
                </h3>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {conversation.time}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                {conversation.orderNumber && <p className="text-xs text-cyan-400">
                    {conversation.orderNumber}
                  </p>}
                {conversation.hasPrescription && <span className="text-xs font-bold px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                    Rx
                  </span>}
              </div>
              <p className="text-sm text-gray-400 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </motion.button>)}
      </div>
    </div>;
}