"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Activity, AlertTriangle, ArrowRight, Box, CheckCircle, ChevronDown, Droplet,
  Factory, Globe, Layers, Navigation, Play, RefreshCcw, ShieldAlert,
  Thermometer, TrendingUp, Truck, Wind, Zap, BarChart2, Anchor, CloudRain, Package
} from "lucide-react";

// --- Mock Data ---

const SCENARIO_TYPES = [
  { id: 'supplier_failure', label: 'Supplier Failure', icon: Factory },
  { id: 'demand_surge', label: 'Demand Surge', icon: TrendingUp },
  { id: 'port_strike', label: 'Port Strike', icon: Anchor },
  { id: 'natural_disaster', label: 'Natural Disaster', icon: CloudRain },
  { id: 'transport_disruption', label: 'Transportation Disruption', icon: Truck },
];

const SUPPLIERS = ['TechCorp Asia', 'Global Electronics', 'Precision Parts Co.', 'EuroComponents', 'NexGen Materials', 'Quantum Circuits', 'Pioneer Plastics', 'Summit Steel'];
const PORTS = ['Shanghai', 'Rotterdam', 'Los Angeles', 'Singapore'];
const REGIONS = ['Southeast Asia', 'Western Europe', 'North America', 'South America'];
const CATEGORIES = ['Consumer Electronics', 'Industrial Equipment', 'Automotive Parts', 'Healthcare Devices'];

const TIMELINE_DATA = Array.from({ length: 90 }, (_, i) => ({
  day: `Day ${i + 1}`,
  normal: 1000 + Math.random() * 200,
  impacted: i < 10 ? 1000 + Math.random() * 200 : (i < 40 ? 400 + Math.random() * 100 : 400 + ((i - 40) * 15) + Math.random() * 100),
  mitigated: i < 10 ? 1000 + Math.random() * 200 : (i < 20 ? 600 + Math.random() * 100 : 600 + ((i - 20) * 20) + Math.random() * 100)
}));

// --- Components ---

export default function DigitalTwinPage() {
  const [scenario, setScenario] = useState('supplier_failure');
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  
  // Params state
  const [supplier, setSupplier] = useState(SUPPLIERS[0]);
  const [duration, setDuration] = useState(30);
  const [multiplier, setMultiplier] = useState(2.0);
  const [port, setPort] = useState(PORTS[0]);
  const [region, setRegion] = useState(REGIONS[0]);
  
  const handleSimulate = () => {
    setIsSimulating(true);
    setHasResults(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsSimulating(false);
      setHasResults(true);
    }, 2000);
  };
  
  const handleReset = () => {
    setHasResults(false);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 pb-24 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Digital Twin — Scenario Simulator
          </h1>
          <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
            BETA
          </span>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl">
          Simulate disruptions and model outcomes before they happen using our AI-driven network graph.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel: Scenario Builder (35%) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[35%] flex flex-col gap-6"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50" />
            
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Configure Scenario
            </h2>

            <div className="space-y-6">
              {/* Scenario Type */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Scenario Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {SCENARIO_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setScenario(type.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                        scenario === type.id 
                          ? 'bg-blue-500/20 border-blue-500/50 text-white' 
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <type.icon className={`w-4 h-4 ${scenario === type.id ? 'text-cyan-400' : ''}`} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              {/* Dynamic Parameters */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {scenario === 'supplier_failure' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Affected Supplier</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                          value={supplier}
                          onChange={(e) => setSupplier(e.target.value)}
                        >
                          {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm text-gray-400 font-medium">Failure Duration (Days)</label>
                          <span className="text-sm text-cyan-400 font-mono">{duration}</span>
                        </div>
                        <input 
                          type="range" min="1" max="90" 
                          value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {scenario === 'demand_surge' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Product Category</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm text-gray-400 font-medium">Demand Multiplier</label>
                          <span className="text-sm text-purple-400 font-mono">{multiplier}x</span>
                        </div>
                        <input 
                          type="range" min="1.1" max="5" step="0.1" 
                          value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))}
                          className="w-full accent-purple-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  {scenario === 'port_strike' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Affected Port</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none"
                          value={port} onChange={(e) => setPort(e.target.value)}
                        >
                          {PORTS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm text-gray-400 font-medium">Strike Duration (Days)</label>
                          <span className="text-sm text-blue-400 font-mono">{duration}</span>
                        </div>
                        <input 
                          type="range" min="1" max="60" 
                          value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                  
                  {(scenario === 'natural_disaster' || scenario === 'transport_disruption') && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Region</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none"
                          value={region} onChange={(e) => setRegion(e.target.value)}
                        >
                          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Severity</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="flex-1 relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl" />
                  {isSimulating ? (
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span>{isSimulating ? 'Running...' : 'Run Simulation'}</span>
                </button>
                <button 
                  onClick={handleReset}
                  className="p-3.5 px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 transition-colors"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Right Panel: Results (65%) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[65%] flex flex-col gap-6"
        >
          {isSimulating ? (
            // Loading State
            <div className="flex-1 min-h-[600px] flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="relative w-32 h-32 mb-8">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-l-2 border-blue-500 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-r-2 border-cyan-400 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Globe className="w-10 h-10 text-purple-400 opacity-80" />
                </motion.div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">AI is analyzing scenarios...</h3>
              <p className="text-gray-400 animate-pulse">Modeling 847 supply chain interdependencies</p>
            </div>
          ) : !hasResults ? (
            // Idle State - Network Graph
            <div className="flex-1 min-h-[600px] relative p-8 rounded-2xl bg-[#0F172A]/50 border border-white/5 overflow-hidden flex items-center justify-center backdrop-blur-sm">
              <NetworkGraph />
              <div className="absolute bottom-8 text-center w-full pointer-events-none">
                <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Current Supply Chain Topography</p>
              </div>
            </div>
          ) : (
            // Results State
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <KpiCard title="Revenue Impact" value="-$4.2M" sub="-12.4% vs plan" isBad />
                <KpiCard title="Impacted Shipments" value="12" sub="840 tons delayed" isBad />
                <KpiCard title="Recovery Time" value="18 Days" sub="Est. return to normal" icon={Activity} />
                <KpiCard title="Mitigation Cost" value="$340K" sub="To execute AI plan" />
              </div>

              {/* Chart */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl h-80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-gray-400" />
                    90-Day Inventory Projection
                  </h3>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1 text-gray-400"><div className="w-2 h-2 rounded-full bg-gray-600" /> Normal</span>
                    <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 rounded-full bg-red-500" /> Disrupted</span>
                    <span className="flex items-center gap-1 text-cyan-400"><div className="w-2 h-2 rounded-full bg-cyan-400" /> Mitigated</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={TIMELINE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4B5563" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4B5563" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorImpacted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMitigated" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22D3EE" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
                      itemStyle={{ fontSize: '14px' }}
                    />
                    <Area type="monotone" dataKey="normal" stroke="#9CA3AF" fillOpacity={1} fill="url(#colorNormal)" strokeWidth={2} />
                    <Area type="monotone" dataKey="impacted" stroke="#EF4444" fillOpacity={1} fill="url(#colorImpacted)" strokeWidth={2} />
                    <Area type="monotone" dataKey="mitigated" stroke="#22D3EE" fillOpacity={1} fill="url(#colorMitigated)" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AI Plan */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-blue-500/20 backdrop-blur-xl relative">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">AI Mitigation Plan</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <p className="text-sm text-gray-300">Immediately activate <strong className="text-white">TechCorp Asia</strong> as primary source (+15% allocation).</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-gray-300">Place emergency orders for <strong className="text-white">2,400 units</strong> of affected SKUs via expedited freight.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-gray-300">Draw down safety stock dynamically at <strong className="text-white">WH-Alpha</strong> and <strong className="text-white">WH-Beta</strong>.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-gray-300">Alert logistics to pre-book airfreight capacity on the Shanghai-LA route.</p>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                    <CheckCircle className="w-4 h-4" /> Execute Plan Automatically
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Comparison */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-4">Outcome Comparison</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Stockout Risk</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-400">8 SKUs</span>
                          <ArrowRight className="w-4 h-4 text-gray-600" />
                          <span className="text-green-400 font-medium">1 SKU</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Recovery Time</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-400">32 Days</span>
                          <ArrowRight className="w-4 h-4 text-gray-600" />
                          <span className="text-green-400 font-medium">18 Days</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-400">Revenue Loss</span>
                        <div className="flex items-center gap-4">
                          <span className="text-red-400">$4.2M</span>
                          <ArrowRight className="w-4 h-4 text-gray-600" />
                          <span className="text-green-400 font-medium">$0.8M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Carbon */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/10 border border-emerald-500/20 backdrop-blur-xl flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                      <Wind className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-emerald-400 font-medium mb-1">Carbon Footprint Impact</h4>
                      <p className="text-sm text-gray-300">
                        Expediting freight adds <strong className="text-emerald-300">+42 tons CO₂</strong>. 
                        AI suggests offsetting via certified green carriers for +$12k.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

// --- Sub Components ---

function KpiCard({ title, value, sub, isBad = false, icon: Icon = AlertTriangle }: any) {
  return (
    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400 font-medium">{title}</span>
        <Icon className={`w-4 h-4 ${isBad ? 'text-red-400' : 'text-gray-500'}`} />
      </div>
      <div>
        <div className={`text-2xl font-bold mb-1 ${isBad ? 'text-white' : 'text-white'}`}>
          {value}
        </div>
        <div className="text-xs text-gray-500">{sub}</div>
      </div>
    </div>
  );
}

function NetworkGraph() {
  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-md opacity-80">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Edges with animation */}
      <g stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" fill="none">
        <motion.path d="M 50,150 L 200,200" animate={{ strokeDashoffset: [-20, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
        <motion.path d="M 50,250 L 200,200" animate={{ strokeDashoffset: [-20, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
        <motion.path d="M 200,200 L 350,100" animate={{ strokeDashoffset: [-20, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
        <motion.path d="M 200,200 L 350,300" animate={{ strokeDashoffset: [-20, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
        <motion.path d="M 150,50 L 200,200" animate={{ strokeDashoffset: [-20, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }} />
      </g>

      {/* Nodes */}
      <g filter="url(#glow)">
        {/* Tier 2 Suppliers */}
        <circle cx="50" cy="150" r="8" fill="#64748B" />
        <circle cx="50" cy="250" r="8" fill="#64748B" />
        <circle cx="150" cy="50" r="10" fill="#8B5CF6" />
        
        {/* Hub */}
        <circle cx="200" cy="200" r="16" fill="#3B82F6" className="animate-pulse" />
        
        {/* Warehouses / Customers */}
        <circle cx="350" cy="100" r="12" fill="#10B981" />
        <circle cx="350" cy="300" r="12" fill="#10B981" />
      </g>

      {/* Labels */}
      <g fill="#9CA3AF" fontSize="10" textAnchor="middle" className="pointer-events-none font-medium">
        <text x="50" y="175">Supplier A</text>
        <text x="50" y="275">Supplier B</text>
        <text x="150" y="75">Port Hub</text>
        <text x="200" y="235" fill="#E2E8F0">Central Hub</text>
        <text x="350" y="130">WH-Alpha</text>
        <text x="350" y="330">WH-Beta</text>
      </g>
    </svg>
  );
}
