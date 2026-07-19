"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CloudLightning, Truck, Anchor, Globe, Factory, TrendingDown, ChevronRight } from 'lucide-react';

const mockRisks = [
  { id: 1, title: 'Weather Risk', score: 45, icon: CloudLightning, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 2, title: 'Supplier Risk', score: 28, icon: Factory, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 3, title: 'Port Delays', score: 52, icon: Anchor, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 4, title: 'Political Risk', score: 15, icon: Globe, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 5, title: 'Natural Disasters', score: 20, icon: CloudLightning, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 6, title: 'Demand Risk', score: 38, icon: TrendingDown, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

const mockEvents = [
  { id: 1, type: 'weather', title: 'Typhoon in South China Sea', desc: 'Severe weather systems threatening key shipping lanes.', regions: ['APAC', 'China Sea'], impact: 'HIGH', mitigation: 'Reroute vessels via alternative straits. Increase lead time buffers by 4 days.', icon: CloudLightning },
  { id: 2, type: 'port', title: 'Port Strike in Rotterdam', desc: 'Labor union strikes causing severe bottlenecks and vessel queues.', regions: ['Europe', 'Netherlands'], impact: 'CRITICAL', mitigation: 'Divert critical cargo to Antwerp. Utilize air freight for high-value electronics.', icon: Anchor },
  { id: 3, type: 'supplier', title: 'Flooding in Bangladesh Textile Region', desc: 'Monsoon flooding affecting 3 major Tier-1 apparel suppliers.', regions: ['South Asia'], impact: 'MEDIUM', mitigation: 'Shift immediate production to backup facilities in Vietnam.', icon: Factory },
  { id: 4, type: 'political', title: 'Political Instability in Supplier Region', desc: 'Unrest leading to potential export restrictions.', regions: ['South America'], impact: 'LOW', mitigation: 'Monitor situation. Maintain current safety stock levels.', icon: Globe },
];

export default function RiskIntelligenceCenter() {
  const [globalScore, setGlobalScore] = useState(34);
  
  return (
    <div className="p-6 min-h-screen bg-[#0A0F1E] text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Risk Intelligence Center</h1>
        <p className="text-gray-400 mt-1">Continuous global threat monitoring and AI mitigation</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full translate-y-1/2" />
          <h2 className="text-lg font-semibold mb-6 z-10">Global Supply Chain Risk</h2>
          
          <div className="relative w-56 h-56 flex items-center justify-center z-10 mb-4">
            <svg className="w-full h-full transform -rotate-135" viewBox="0 0 100 100" style={{ transform: 'rotate(-135deg)' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeDasharray="188.5 251.2" />
              <motion.circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke="url(#gradientScore)" 
                strokeWidth="12" strokeLinecap="round"
                strokeDasharray="188.5 251.2"
                initial={{ strokeDashoffset: 188.5 }}
                animate={{ strokeDashoffset: 188.5 - (188.5 * globalScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-5xl font-bold">{globalScore}</span>
              <span className="text-sm text-gray-400 mt-1">/ 100</span>
            </div>
          </div>
          <div className="z-10 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold border border-yellow-500/30 tracking-wider">
            MODERATE RISK
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockRisks.map((risk, i) => {
            const Icon = risk.icon;
            return (
              <motion.div key={risk.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-colors`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${risk.bg} ${risk.border} border`}>
                    <Icon className={`w-5 h-5 ${risk.color}`} />
                  </div>
                  <span className={`text-lg font-bold ${risk.color}`}>{risk.score}</span>
                </div>
                <h3 className="text-sm text-gray-300 font-medium">{risk.title}</h3>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className={`h-full ${risk.color.replace('text-', 'bg-')}`} style={{ width: `${risk.score}%` }} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-400" /> Active Risk Events</h2>
      <div className="space-y-4">
        {mockEvents.map((event, i) => {
          const Icon = event.icon;
          return (
            <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/10 rounded-lg"><Icon className="w-5 h-5 text-gray-300" /></div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-bold ${event.impact === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : event.impact === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                      {event.impact} IMPACT
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{event.desc}</p>
                  <div className="flex gap-2">
                    {event.regions.map(r => (
                      <span key={r} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{r}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">AI Mitigation Strategy</h4>
                  <p className="text-sm text-blue-100/70">{event.mitigation}</p>
                  <button className="mt-3 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition">
                    Execute Strategy <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
