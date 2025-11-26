import React from 'react';
import { Menu, Bell } from 'lucide-react';
export function WalletTopNav() {
  return <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A1628]/80 border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Hamburger Menu */}
        <button className="p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all" aria-label="Menu">
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Center: OyaDrop Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-white font-semibold text-lg">OyaDrop</span>
        </div>

        {/* Right: Notification Bell & Avatar */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all" aria-label="Notifications">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full ring-2 ring-[#0A1628]"></span>
          </button>

          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center ring-2 ring-teal-400/20 hover:ring-teal-400/40 active:scale-95 transition-all">
            <span className="text-white font-semibold text-sm">JD</span>
          </button>
        </div>
      </div>
    </nav>;
}