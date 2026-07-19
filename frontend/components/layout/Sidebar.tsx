'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  TrendingUp, 
  Building2, 
  AlertTriangle, 
  ShoppingCart, 
  Bot, 
  FileText, 
  PieChart, 
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Suppliers', href: '/suppliers', icon: Users },
  { name: 'Shipments', href: '/shipments', icon: Truck },
  { name: 'Demand', href: '/demand', icon: TrendingUp },
  { name: 'Warehouses', href: '/warehouses', icon: Building2 },
  { name: 'Risk', href: '/risk', icon: AlertTriangle },
  { name: 'Procurement', href: '/procurement', icon: ShoppingCart },
  { name: 'Copilot', href: '/copilot', icon: Bot },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Digital Twin', href: '/digital-twin', icon: GitBranch },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen glass border-y-0 border-l-0 rounded-none flex flex-col relative z-20"
    >
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              SupplySense
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-gray-800 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-30"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-white/10 text-white border-l-2 border-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-blue-400")} />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.name}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shrink-0 border border-white/20">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@supplysense.ai</p>
            </div>
          )}
          {!isCollapsed && (
            <button className="text-gray-400 hover:text-white transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
