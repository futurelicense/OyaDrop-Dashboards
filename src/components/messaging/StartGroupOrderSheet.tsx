import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Clock, Plus } from 'lucide-react';
interface StartGroupOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}
export function StartGroupOrderSheet({
  isOpen,
  onClose,
  restaurantName
}: StartGroupOrderSheetProps) {
  const [groupName, setGroupName] = useState('');
  const [deadline, setDeadline] = useState('30');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const contacts = [{
    id: '1',
    name: 'Chioma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  }, {
    id: '2',
    name: 'Tunde',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  }, {
    id: '3',
    name: 'Blessing',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }, {
    id: '4',
    name: 'Emeka',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  }];
  const toggleContact = (id: string) => {
    setSelectedContacts(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Bottom Sheet */}
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col" initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Start Group Order
                </h2>
                <p className="text-sm text-gray-400">{restaurantName}</p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Group Name */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Group Name (Optional)
                </label>
                <input type="text" placeholder="e.g., Office Lunch, Team Dinner" value={groupName} onChange={e => setGroupName(e.target.value)} className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              </div>

              {/* Order Deadline */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Order Deadline
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['15', '30', '60'].map(mins => <motion.button key={mins} className={`p-3 rounded-xl border-2 transition-all ${deadline === mins ? 'bg-purple-500/20 border-purple-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setDeadline(mins)} whileTap={{
                scale: 0.98
              }}>
                      <Clock className={`w-5 h-5 mx-auto mb-1 ${deadline === mins ? 'text-purple-400' : 'text-gray-400'}`} />
                      <p className={`text-xs font-semibold ${deadline === mins ? 'text-white' : 'text-gray-400'}`}>
                        {mins} mins
                      </p>
                    </motion.button>)}
                </div>
              </div>

              {/* Invite Participants */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-3 block">
                  Invite Participants
                </label>
                <div className="space-y-2">
                  {contacts.map((contact, index) => <motion.button key={contact.id} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${selectedContacts.includes(contact.id) ? 'bg-purple-500/20 border-purple-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => toggleContact(contact.id)} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.05
              }} whileTap={{
                scale: 0.98
              }}>
                      <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className={`text-sm font-semibold flex-1 text-left ${selectedContacts.includes(contact.id) ? 'text-white' : 'text-gray-400'}`}>
                        {contact.name}
                      </span>
                      {selectedContacts.includes(contact.id) && <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>}
                    </motion.button>)}
                </div>
              </div>

              {/* Info */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <p className="text-sm text-purple-400 mb-2">
                  <strong>{selectedContacts.length} participants</strong>{' '}
                  selected
                </p>
                <p className="text-xs text-gray-400">
                  Everyone will be able to add items to the order. Payment will
                  be split automatically.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" whileTap={{
            scale: selectedContacts.length > 0 ? 0.98 : 1
          }} disabled={selectedContacts.length === 0}>
                Start Group Order
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}