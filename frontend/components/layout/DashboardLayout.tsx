'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0A0F1E] overflow-hidden text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] -z-10 pointer-events-none" />
        
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
