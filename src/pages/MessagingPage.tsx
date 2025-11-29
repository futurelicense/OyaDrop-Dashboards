import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Bell, Menu } from 'lucide-react';
import { ChatConversationsList } from '../components/messaging/ChatConversationsList';
import { ChatContactsList } from '../components/messaging/ChatContactsList';
import { ChatScreen } from '../components/messaging/ChatScreen';
import { AddContactScreen } from '../components/messaging/AddContactScreen';
import { UpdatesFeed } from '../components/messaging/UpdatesFeed';
import { CreateUpdateSheet } from '../components/messaging/CreateUpdateSheet';
import { ViewUpdateSheet } from '../components/messaging/ViewUpdateSheet';
type Tab = 'chats' | 'contacts' | 'notifications';
type View = 'main' | 'chat' | 'add-contact';
interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: 'Rider' | 'Driver' | 'Restaurant' | 'Kiosk' | 'Service Provider' | 'User';
  lastInteraction?: string;
  status?: 'online' | 'offline' | 'busy' | 'on-trip';
}
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
interface MessagingPageProps {
  onMenuClick: () => void;
}
export function MessagingPage({
  onMenuClick
}: MessagingPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [currentView, setCurrentView] = useState<View>('main');
  const [selectedContact, setSelectedContact] = useState<Contact | Conversation | null>(null);
  const [showCreateUpdate, setShowCreateUpdate] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
  const handleSelectChat = (conversation: Conversation) => {
    setSelectedContact(conversation);
    setCurrentView('chat');
  };
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentView('chat');
  };
  const handleViewUpdate = (update: Update) => {
    setSelectedUpdate(update);
  };
  if (currentView === 'chat' && selectedContact) {
    return <ChatScreen onBack={() => {
      setCurrentView('main');
      setSelectedContact(null);
    }} contactType={selectedContact.role} />;
  }
  if (currentView === 'add-contact') {
    return <AddContactScreen onBack={() => setCurrentView('main')} />;
  }
  return <>
      <div className="flex flex-col h-screen bg-[#0A0E1A]">
        {/* Header */}
        <motion.header className="flex items-center justify-between p-4 bg-[#131B2E] border-b border-white/10" initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }}>
          <div className="flex items-center gap-3">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }} onClick={onMenuClick}>
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
            <h1 className="text-xl font-bold text-white">Messages</h1>
          </div>

          <div className="flex items-center gap-2">
            <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
            </motion.button>
          </div>
        </motion.header>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-[#131B2E]">
          {[{
          id: 'chats',
          label: 'Chats',
          icon: MessageCircle
        }, {
          id: 'contacts',
          label: 'Contacts',
          icon: Users
        }, {
          id: 'notifications',
          label: 'Updates',
          icon: Bell
        }].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return <motion.button key={tab.id} className={`flex-1 flex items-center justify-center gap-2 py-3 relative ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} onClick={() => setActiveTab(tab.id as Tab)} whileTap={{
            scale: 0.98
          }}>
                <Icon className="w-5 h-5" />
                <span className="text-sm font-semibold">{tab.label}</span>

                {isActive && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" layoutId="activeTab" transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300
            }} />}
              </motion.button>;
        })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chats' && <ChatConversationsList onSelectChat={handleSelectChat} />}
          {activeTab === 'contacts' && <ChatContactsList onAddContact={() => setCurrentView('add-contact')} onSelectContact={handleSelectContact} />}
          {activeTab === 'notifications' && <UpdatesFeed onCreateUpdate={() => setShowCreateUpdate(true)} onViewUpdate={handleViewUpdate} />}
        </div>
      </div>

      {/* Sheets */}
      <CreateUpdateSheet isOpen={showCreateUpdate} onClose={() => setShowCreateUpdate(false)} />
      <ViewUpdateSheet isOpen={!!selectedUpdate} onClose={() => setSelectedUpdate(null)} update={selectedUpdate} />
    </>;
}