"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCircle2, Package, Truck, AlertTriangle, Users, FileText, Info } from 'lucide-react';

type NotifType = 'inventory' | 'shipment' | 'risk' | 'supplier' | 'info';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  description: string;
  time: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'inventory',
    title: 'CRITICAL: Stockout Warning',
    description: 'iPhone 15 Pro Max display panels will deplete in 3 days at Warehouse B. Immediate order required to prevent production halt.',
    time: '2 minutes ago',
    severity: 'critical',
    read: false
  },
  {
    id: '2',
    type: 'shipment',
    title: 'DELAYED: Shipment SS-2847',
    description: 'Shipment delayed by 18 hours due to severe weather conditions in the transit route.',
    time: '45 minutes ago',
    severity: 'high',
    read: false
  },
  {
    id: '3',
    type: 'risk',
    title: 'HIGH RISK: Weather Alert',
    description: 'Typhoon approaching South China Sea. 8 key suppliers in the region may face operational disruptions.',
    time: '2 hours ago',
    severity: 'high',
    read: false
  },
  {
    id: '4',
    type: 'supplier',
    title: 'Supplier Performance Drop',
    description: 'Shanghai TechParts Ltd. reliability score dropped to 61% over the last 14 days (Quality issues).',
    time: '5 hours ago',
    severity: 'medium',
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Report Generated',
    description: 'Monthly procurement AI analytics report is ready for your review.',
    time: '1 day ago',
    severity: 'low',
    read: true
  }
];

const TABS = ['All', 'Inventory', 'Shipment', 'Risk', 'Supplier'];

const TYPE_ICONS: Record<NotifType, any> = {
  inventory: Package,
  shipment: Truck,
  risk: AlertTriangle,
  supplier: Users,
  info: Info
};

const SEVERITY_COLORS = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  low: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' ? true : n.type.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center gap-3">
            <Bell className="w-8 h-8 text-cyan-400" />
            Intelligence Alerts
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-400 mt-2">Real-time supply chain events and AI predictions.</p>
        </div>
        <button 
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition disabled:opacity-50 text-sm font-medium"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark All Read
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500"
            >
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No notifications found for this filter.</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notif, idx) => {
              const Icon = TYPE_ICONS[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`relative bg-white/5 backdrop-blur-md border rounded-2xl p-5 flex gap-4 transition hover:bg-white/10 ${
                    notif.read ? 'border-white/5 opacity-75' : 'border-white/20 shadow-lg'
                  }`}
                >
                  {!notif.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-2xl shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${SEVERITY_COLORS[notif.severity]}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-400'}`}>
                      {notif.description}
                    </p>
                  </div>

                  {!notif.read && (
                    <button 
                      onClick={() => markAsRead(notif.id)}
                      className="flex-shrink-0 self-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
