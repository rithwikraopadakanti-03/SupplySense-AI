'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import {
  AlertTriangle, Activity, Wind, Anchor, TrendingUp, Truck, CheckCircle2,
  Factory, Package, ArrowDown, Map, ShieldAlert, Zap, Clock, AlertCircle,
  PlayCircle, RefreshCw, Layers, Crosshair, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---

const RISK_CATEGORIES = [
  { id: 'weather', name: 'Weather Risk', score: 61, status: 'red', desc: 'Typhoon Mawar, Bay of Bengal storm', icon: Wind, trend: 'up' },
  { id: 'supplier', name: 'Supplier Risk', score: 38, status: 'yellow', desc: 'Shanghai TechParts, Vietnam Tech Supplies', icon: Factory, trend: 'stable' },
  { id: 'port', name: 'Port/Logistics', score: 42, status: 'yellow', desc: 'Rotterdam strike July 22-28', icon: Anchor, trend: 'up' },
  { id: 'geo', name: 'Geopolitical', score: 28, status: 'green', desc: 'Myanmar corridor monitoring', icon: Map, trend: 'down' },
  { id: 'demand', name: 'Demand Risk', score: 22, status: 'green', desc: 'Festival spike detected, managed', icon: TrendingUp, trend: 'stable' },
  { id: 'finance', name: 'Financial Risk', score: 18, status: 'green', desc: 'All suppliers financially stable', icon: Activity, trend: 'down' },
];

const ACTIVE_EVENTS = [
  { id: 1, title: 'Typhoon Mawar Tracking', desc: 'Category 4 storm approaching Taiwan straight. ETA 48h.', affected: '3 Suppliers, 12 Shipments', severity: 'High', mitigation: 'Rerouting sea freight to air for priority SKUs.' },
  { id: 2, title: 'Shanghai Port Congestion', desc: 'Vessel wait times exceeded 4 days due to volume.', affected: '8 Shipments', severity: 'Medium', mitigation: 'Diverting next vessels to Ningbo port.' },
  { id: 3, title: 'Component Shortage: Microcontrollers', desc: 'Supplier indicated 2-week delay in MCU batch.', affected: 'Shanghai TechParts', severity: 'Medium', mitigation: 'Drawing from safety stock in WH-Beta.' },
  { id: 4, title: 'Labor Strike Alert', desc: 'Rotterdam port workers threatening strike next week.', affected: 'European Distribution', severity: 'Medium', mitigation: 'Pre-booking rail freight alternatives.' },
  { id: 5, title: 'Demand Spike: Pro Models', desc: 'Unexpected 40% surge in order volume for premium tier.', affected: 'Apparel & Electronics', severity: 'Low', mitigation: 'Auto-balanced inventory across regional hubs.' },
];

const HISTORY_EVENTS = [
  { id: 1, date: '2023-10-12', type: 'Weather', impact: 'High', resolution: 'Rerouted 5 vessels', time: '12 hours' },
  { id: 2, date: '2023-10-08', type: 'Supplier', impact: 'Medium', resolution: 'Activated backup source', time: '24 hours' },
  { id: 3, date: '2023-09-28', type: 'Port', impact: 'Low', resolution: 'Absorbed by safety stock', time: '4 hours' },
  { id: 4, date: '2023-09-15', type: 'Geopolitical', impact: 'Medium', resolution: 'Shifted production lines', time: '48 hours' },
];

const HISTORY_CHART_DATA = [
  { month: 'Jun', weather: 2, supplier: 1, port: 4 },
  { month: 'Jul', weather: 5, supplier: 2, port: 1 },
  { month: 'Aug', weather: 3, supplier: 3, port: 2 },
  { month: 'Sep', weather: 6, supplier: 1, port: 3 },
  { month: 'Oct', weather: 1, supplier: 4, port: 2 },
];

const SIMULATION_CHART_DATA = Array.from({ length: 90 }, (_, i) => {
  const day = i + 1;
  let without = 100;
  let withAi = 100;
  
  if (day > 3 && day <= 28) without = 100 - (28 - day) * 3.5;
  if (day > 28) without = 100 - (90 - day) * 0.1;

  if (day > 3 && day <= 8) withAi = 100 - (8 - day) * 1.5;
  if (day > 8) withAi = 95 + (day * 0.05);

  return {
    day,
    without: Math.max(0, Math.min(100, without)),
    withAi: Math.max(0, Math.min(100, withAi))
  };
});

// --- COMPONENTS ---

const StatusBadge = ({ status, text }: { status: string, text: string }) => {
  const colors = {
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  };
  // @ts-ignore
  const colorClass = colors[status] || colors.green;
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      {text}
    </span>
  );
};

export default function RiskIntelligenceCenter() {
  const [activeTab, setActiveTab] = useState<'live' | 'predictive' | 'history'>('predictive');
  
  // Predictive Engine State
  const [simType, setSimType] = useState('supplier');
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setHasRun(false);
    setTimeout(() => {
      setIsSimulating(false);
      setHasRun(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 space-y-6 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Risk Intelligence Center
            </h1>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
          </div>
          <p className="text-gray-400 text-lg">AI-powered risk detection & downstream impact simulation</p>
        </div>

        <div className="flex items-center gap-6 bg-black/20 p-4 rounded-xl border border-white/5">
          <div className="relative w-20 h-20">
            {/* SVG Gauge */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#ffffff10" strokeWidth="8" fill="none" />
              <motion.circle 
                cx="50" cy="50" r="40" 
                stroke="#10B981" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="251.2"
                strokeDashoffset="165.79" // 34% of 251.2 (251.2 - 251.2 * 0.34)
                strokeLinecap="round"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 165.79 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-emerald-400">34</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Overall Risk Score</div>
            <div className="text-emerald-400 font-medium">Healthy / Low Risk</div>
            <div className="text-xs text-gray-500 mt-1">Updated 2 mins ago</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-white/10 pb-px">
        {[
          { id: 'live', label: 'Live Risk Map' },
          { id: 'predictive', label: 'Predictive Risk Engine' },
          { id: 'history', label: 'Risk History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* TAB 1: LIVE RISK MAP */}
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {RISK_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/[0.07] transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg bg-${cat.status}-500/20 text-${cat.status}-400`}>
                          <cat.icon size={20} />
                        </div>
                        <span className={`text-xl font-bold text-${cat.status}-400`}>{cat.score}/100</span>
                      </div>
                      <h3 className="font-semibold text-gray-200 mb-1">{cat.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-1">{cat.desc}</p>
                      
                      <div className="mt-4 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${cat.status}-500 rounded-full`} 
                          style={{ width: `${cat.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md min-h-[300px] flex items-center justify-center relative overflow-hidden">
                   {/* Placeholder for an actual map */}
                   <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                   <Map size={48} className="text-blue-500/30 mb-4" />
                   <div className="text-gray-500 font-medium">Interactive Global Supply Map visualization goes here</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <ShieldAlert size={20} className="text-blue-400" />
                  Active Risk Events
                </h2>
                <div className="space-y-4">
                  {ACTIVE_EVENTS.map((event) => (
                    <div key={event.id} className="p-4 bg-black/20 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <StatusBadge status={event.severity} text={event.severity} />
                        <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                          <CheckCircle2 size={14} /> Mark Resolved
                        </button>
                      </div>
                      <h4 className="font-medium text-gray-200">{event.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{event.desc}</p>
                      <div className="mt-3 pt-3 border-t border-white/5 text-xs">
                        <div className="text-gray-500 mb-1">Impacts: <span className="text-gray-300">{event.affected}</span></div>
                        <div className="text-blue-400 flex items-start gap-1">
                          <Zap size={12} className="mt-0.5 shrink-0" />
                          <span>{event.mitigation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREDICTIVE RISK ENGINE */}
          {activeTab === 'predictive' && (
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* LEFT: CONTROLS */}
              <div className="w-full lg:w-[40%] flex flex-col gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Crosshair size={20} className="text-purple-400" />
                    Simulate a Disruption
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">1. Disruption Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'supplier', icon: Factory, label: 'Supplier Failure' },
                          { id: 'weather', icon: Wind, label: 'Weather Event' },
                          { id: 'port', icon: Anchor, label: 'Port Strike' },
                          { id: 'demand', icon: TrendingUp, label: 'Demand Spike' },
                        ].map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSimType(type.id)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                              simType === type.id 
                                ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                                : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'
                            }`}
                          >
                            <type.icon size={20} className={simType === type.id ? 'text-purple-400' : ''} />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 bg-black/20 rounded-xl border border-white/5 space-y-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">2. Parameters</label>
                      
                      {simType === 'supplier' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Target Supplier</div>
                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500">
                              <option>Shanghai TechParts (Tier 1)</option>
                              <option>Vietnam Tech Supplies</option>
                              <option>Global Electronics Co.</option>
                            </select>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Severity (Failure Rate)</span>
                              <span>100% (Total)</span>
                            </div>
                            <input type="range" min="10" max="100" defaultValue="100" className="w-full accent-purple-500" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Estimated Duration</span>
                              <span>30 Days</span>
                            </div>
                            <input type="range" min="1" max="90" defaultValue="30" className="w-full accent-purple-500" />
                          </div>
                        </motion.div>
                      )}

                      {simType === 'weather' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Affected Region</div>
                            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500">
                              <option>South China Sea</option>
                              <option>Gulf of Mexico</option>
                              <option>Bay of Bengal</option>
                            </select>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Severity Category</span>
                              <span>Cat 4</span>
                            </div>
                            <input type="range" min="1" max="5" defaultValue="4" className="w-full accent-purple-500" />
                          </div>
                        </motion.div>
                      )}

                      {(simType === 'port' || simType === 'demand') && (
                         <div className="text-sm text-gray-400 italic">Adjusting parameters for {simType}...</div>
                      )}
                    </div>

                    <button
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="animate-spin" size={20} />
                          Analyzing 847 interdependencies...
                        </>
                      ) : (
                        <>
                          <PlayCircle size={20} />
                          Run Simulation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: RESULTS */}
              <div className="w-full lg:w-[60%] bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md min-h-[600px] flex flex-col relative overflow-hidden">
                {!hasRun && !isSimulating && (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <Layers size={64} className="mb-4 opacity-20" />
                    <h3 className="text-xl font-medium text-gray-400 mb-2">Awaiting Simulation</h3>
                    <p className="max-w-sm text-center text-sm">Configure parameters on the left and run the predictive engine to visualize downstream impacts and AI mitigation strategies.</p>
                  </div>
                )}

                {isSimulating && (
                  <div className="flex-1 flex flex-col items-center justify-center text-purple-400">
                    <div className="relative w-24 h-24 mb-6">
                       <div className="absolute inset-0 border-t-2 border-purple-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-2 border-r-2 border-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                       <div className="absolute inset-4 border-b-2 border-cyan-400 rounded-full animate-spin"></div>
                    </div>
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      Calculating cascading risk factors...
                    </motion.div>
                  </div>
                )}

                {hasRun && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar"
                  >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Revenue at Risk', value: '$4.2M', color: 'text-red-400', bg: 'bg-red-500/10' },
                        { label: 'Shipments Affected', value: '12', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                        { label: 'SKUs at Risk', value: '8', color: 'text-red-400', bg: 'bg-red-500/10' },
                        { label: 'Recovery Time', value: '18 days', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                      ].map((stat, i) => (
                        <div key={i} className={`p-4 rounded-xl border border-white/5 ${stat.bg}`}>
                          <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                          <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {/* Cascade Visualization */}
                      <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                          <Activity size={16} className="text-blue-400" />
                          Cascade Impact Flow
                        </h3>
                        
                        <div className="space-y-0 text-sm">
                          {/* Trigger */}
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-center">
                            <span className="font-bold text-red-400">TRIGGER:</span> Supplier Failure — Shanghai TechParts
                          </motion.div>
                          
                          <div className="flex justify-center py-2 text-gray-500 animate-pulse">
                            <ArrowDown size={20} />
                          </div>

                          {/* Level 1 */}
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-lg">
                            <div className="text-xs font-bold text-orange-400 mb-2">IMMEDIATE (Day 1-3)</div>
                            <ul className="list-disc pl-4 space-y-1 text-gray-300 text-xs">
                              <li>3 SKUs lose primary source</li>
                              <li>$780K daily procurement gap</li>
                              <li>2 shipments in transit affected</li>
                            </ul>
                          </motion.div>

                          <div className="flex justify-center py-2 text-gray-500 animate-pulse">
                            <ArrowDown size={20} />
                          </div>

                          {/* Level 2 */}
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                            <div className="text-xs font-bold text-yellow-400 mb-2">SHORT-TERM (Day 4-10)</div>
                            <ul className="list-disc pl-4 space-y-1 text-gray-300 text-xs">
                              <li>Warehouse Alpha stock depletes (iPhone 15 Pro)</li>
                              <li>8 Amazon/Flipkart listings go OOS</li>
                              <li>Customer backorders accumulate</li>
                            </ul>
                          </motion.div>

                          <div className="flex justify-center py-2 text-gray-500 animate-pulse">
                            <ArrowDown size={20} />
                          </div>

                          {/* Level 3 */}
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                            <div className="text-xs font-bold text-red-400 mb-2">LONG-TERM (Day 11-18)</div>
                            <ul className="list-disc pl-4 space-y-1 text-gray-300 text-xs">
                              <li>$4.2M total revenue impact</li>
                              <li>Brand reputation risk on marketplace</li>
                              <li>Recovery cost: $340K (air freight)</li>
                            </ul>
                          </motion.div>
                        </div>
                      </div>

                      {/* Mitigation Plan */}
                      <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                          <Zap size={16} className="text-emerald-400" />
                          AI Mitigation Plan
                        </h3>
                        
                        <div className="space-y-3 flex-1">
                          {[
                            "Activate TechCorp Asia as primary (+20% allocation) — saves $1.8M",
                            "Place emergency air-freight order: 2,400 units — cost $340K",
                            "Draw down safety stock: WH-Alpha and WH-Beta — buys 8 days",
                            "Alert logistics to pre-book alternate routes",
                            "Notify marketplaces of 3-day delay on 8 SKUs"
                          ].map((step, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 2.0 + (idx * 0.2) }}
                              className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5"
                            >
                              <div className="bg-emerald-500/20 text-emerald-400 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed">{step}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chart & Table */}
                    <div className="bg-black/20 p-5 rounded-xl border border-white/5 mt-6">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4">90-Day Revenue Impact & Recovery</h3>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={SIMULATION_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff20', borderRadius: '8px' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                            <Area 
                              type="monotone" 
                              dataKey="without" 
                              name="Without Action (%)" 
                              stroke="#ef4444" 
                              strokeDasharray="5 5"
                              fillOpacity={1} 
                              fill="url(#colorWithout)" 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="withAi" 
                              name="With AI Mitigation (%)" 
                              stroke="#3b82f6" 
                              fillOpacity={1} 
                              fill="url(#colorWith)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                              <th className="px-4 py-3 rounded-tl-lg">Metric</th>
                              <th className="px-4 py-3 text-red-400">Without Action</th>
                              <th className="px-4 py-3 text-emerald-400 rounded-tr-lg">With AI Mitigation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            <tr>
                              <td className="px-4 py-3 font-medium text-gray-300">Revenue Loss</td>
                              <td className="px-4 py-3 text-red-400">-$4.2M</td>
                              <td className="px-4 py-3 text-emerald-400">-$280K</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-medium text-gray-300">Recovery Time</td>
                              <td className="px-4 py-3 text-red-400">28 days</td>
                              <td className="px-4 py-3 text-emerald-400">8 days</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-medium text-gray-300">Stockout SKUs</td>
                              <td className="px-4 py-3 text-red-400">8</td>
                              <td className="px-4 py-3 text-emerald-400">1</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 font-medium text-gray-300">Mitigation Cost</td>
                              <td className="px-4 py-3 text-gray-400">$0</td>
                              <td className="px-4 py-3 text-yellow-400">$340K</td>
                            </tr>
                            <tr className="bg-white/5">
                              <td className="px-4 py-3 font-bold text-white rounded-bl-lg">Net Saving</td>
                              <td className="px-4 py-3 text-gray-500">—</td>
                              <td className="px-4 py-3 font-bold text-emerald-400 text-lg rounded-br-lg">$3.58M</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: RISK HISTORY */}
          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-gray-400" />
                  Recent Events (30 Days)
                </h2>
                
                <div className="relative border-l border-white/10 ml-3 space-y-8 pb-4">
                  {HISTORY_EVENTS.map((evt) => (
                    <div key={evt.id} className="relative pl-6">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                      <div className="text-xs text-blue-400 font-medium mb-1">{evt.date}</div>
                      <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-200">{evt.type} Event</span>
                          <StatusBadge status={evt.impact} text={`${evt.impact} Impact`} />
                        </div>
                        <div className="text-sm text-gray-400">
                          <span className="text-gray-500">Resolution:</span> {evt.resolution}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          <span className="text-gray-500">Time to Resolve:</span> {evt.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-gray-400" />
                  Historical Risk Trends
                </h2>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HISTORY_CHART_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="month" stroke="#ffffff40" tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" tickLine={false} axisLine={false} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff20', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ fill: '#ffffff05' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="weather" name="Weather" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="supplier" name="Supplier" stackId="a" fill="#a855f7" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="port" name="Logistics" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
