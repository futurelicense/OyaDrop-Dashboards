import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MessageCircle } from 'lucide-react';
type ContactType = 'all' | 'riders' | 'restaurants' | 'kiosks' | 'services' | 'personal';
interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: 'Rider' | 'Driver' | 'Restaurant' | 'Kiosk' | 'Service Provider' | 'User';
  lastInteraction: string;
  status: 'online' | 'offline' | 'busy' | 'on-trip';
}
const mockContacts: Contact[] = [{
  id: '1',
  name: 'B-square Restaurant',
  avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
  role: 'Restaurant',
  lastInteraction: 'Last order 2 days ago',
  status: 'online'
}, {
  id: '2',
  name: 'Tunde - Rider',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  role: 'Rider',
  lastInteraction: 'Last trip yesterday',
  status: 'on-trip'
}, {
  id: '3',
  name: 'Grace - Plumber',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  role: 'Service Provider',
  lastInteraction: 'Last job 1 week ago',
  status: 'offline'
}, {
  id: '4',
  name: 'TechHub Store',
  avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
  role: 'Kiosk',
  lastInteraction: 'Last purchase 3 days ago',
  status: 'online'
}];
const filters = [{
  id: 'all',
  label: 'All'
}, {
  id: 'riders',
  label: 'Riders & Drivers'
}, {
  id: 'restaurants',
  label: 'Restaurants'
}, {
  id: 'kiosks',
  label: 'Kiosks'
}, {
  id: 'services',
  label: 'Services'
}, {
  id: 'personal',
  label: 'Personal'
}];
const roleColors: Record<string, string> = {
  Rider: '#00D9C0',
  Driver: '#00F0FF',
  Restaurant: '#FF6B00',
  Kiosk: '#FFB800',
  'Service Provider': '#B026FF',
  User: '#10B981'
};
const statusColors: Record<string, string> = {
  online: '#10B981',
  offline: '#6B7280',
  busy: '#F59E0B',
  'on-trip': '#00D9C0'
};
interface ChatContactsListProps {
  onAddContact?: () => void;
  onSelectContact?: (contact: Contact) => void;
}
export function ChatContactsList({
  onAddContact,
  onSelectContact
}: ChatContactsListProps) {
  const [activeFilter, setActiveFilter] = useState<ContactType>('all');
  return <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search contacts, riders, vendors..." className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(filter => {
          const isActive = activeFilter === filter.id;
          return <motion.button key={filter.id} className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} onClick={() => setActiveFilter(filter.id as ContactType)} whileTap={{
            scale: 0.95
          }}>
                {filter.label}
              </motion.button>;
        })}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {mockContacts.map((contact, index) => <motion.button key={contact.id} className="w-full flex items-center gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }} whileTap={{
        scale: 0.98
      }} onClick={() => onSelectContact?.(contact)}>
            {/* Avatar with Status */}
            <div className="relative flex-shrink-0">
              <img src={contact.avatar} alt={contact.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" style={{
            backgroundColor: statusColors[contact.status]
          }} />
            </div>

            {/* Info */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-white truncate">
                  {contact.name}
                </h3>
                <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
              backgroundColor: roleColors[contact.role] + '20',
              color: roleColors[contact.role]
            }}>
                  {contact.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">
                {contact.lastInteraction}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <motion.button className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors" whileTap={{
            scale: 0.9
          }} onClick={e => {
            e.stopPropagation();
            onSelectContact?.(contact);
          }}>
                <MessageCircle className="w-4 h-4 text-cyan-400" />
              </motion.button>
            </div>
          </motion.button>)}
      </div>

      {/* Add Contact FAB */}
      <motion.button className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center z-50" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} onClick={onAddContact}>
        <Plus className="w-6 h-6 text-white" />
      </motion.button>
    </div>;
}