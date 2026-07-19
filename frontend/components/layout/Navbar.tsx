'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Settings } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const path = pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-20 glass border-x-0 border-t-0 rounded-none px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search across supply chain..."
            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all w-64 focus:w-80"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse-glow" />
            <span className="text-xs font-medium text-emerald-400">AI Online</span>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
