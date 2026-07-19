'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, AlertOctagon, CheckCircle, Activity, 
  Search, Filter, ChevronDown, ChevronUp,
  Globe, Clock, TrendingUp, TrendingDown,
  Sparkles, ExternalLink
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// --- MOCK DATA ---
const RISK_STATS = [
  { title: 'Total Suppliers', value: '1,284', icon: Users, color: 'text-blue-400' },
  { title: 'At-Risk Suppliers', value: '18', icon: AlertOctagon, color: 'text-red-400' },
  { title: 'High Reliability', value: '842', icon: CheckCircle, color: 'text-green-400' },
  { title: 'Avg Reliability Score', value: '92%', icon: Activity, color: 'text-purple-400' },
];

const SUPPLIERS_DATA = [
  {
    id: 'SUP-001',
    name: 'TechCorp Asia',
    country: 'China',
    category: 'Electronics',
    score: 82,
    onTimeDelivery: 78,
    leadTime: '24 days',
    avgDelay: '4.2 days',
    risk: 'HIGH',
    aiExcerpt: 'Risk increased from LOW to HIGH due to port congestion in Shanghai.',
    aiFull: 'Supplier A risk increased from LOW to HIGH because delivery delay increased by 25% over the past 30 days due to port congestion in Shanghai. Additionally, raw material shortages have impacted their downstream manufacturing throughput. Immediate diversification recommended for critical components.',
    color: '#ef4444' // red
  },
  {
    id: 'SUP-002',
    name: 'Yunnan Electronics',
    country: 'Taiwan',
    category: 'Semiconductors',
    score: 96,
    onTimeDelivery: 98,
    leadTime: '14 days',
    avgDelay: '0.5 days',
    risk: 'LOW',
    aiExcerpt: 'Performing at 94% on-time delivery, 12% above industry average.',
    aiFull: 'Yunnan Electronics is performing exceptionally well, maintaining a 94% on-time delivery rate which is 12% above the industry average. Cost metrics are stable. Recommend increasing order allocation by 20% for next quarter to lock in favorable pricing.',
    color: '#10b981' // green
  },
  {
    id: 'SUP-003',
    name: 'Global Packaging Inc',
    country: 'USA',
    category: 'Packaging',
    score: 88,
    onTimeDelivery: 85,
    leadTime: '7 days',
    avgDelay: '1.2 days',
    risk: 'MEDIUM',
    aiExcerpt: 'Slight dip in reliability due to recent labor strike impacts.',
    aiFull: 'Global Packaging has seen a minor dip in their reliability score (-4%) over the last month due to a 3-day labor strike at their primary facility. The situation has stabilized, but we advise monitoring closely for the next 2 weeks before placing bulk orders.',
    color: '#eab308' // yellow
  },
  {
    id: 'SUP-004',
    name: 'Apex Manufacturing',
    country: 'Vietnam',
    category: 'Components',
    score: 74,
    onTimeDelivery: 70,
    leadTime: '32 days',
    avgDelay: '6.8 days',
    risk: 'CRITICAL',
    aiExcerpt: 'Consistent delays and quality issues reported over 3 quarters.',
    aiFull: 'Apex Manufacturing has consistently missed delivery SLAs by an average of 6.8 days over the past 3 quarters. Furthermore, our QA team has reported a 4% increase in defect rates. AI highly recommends initiating off-boarding and shifting allocation to secondary suppliers immediately.',
    color: '#dc2626' // dark red
  },
  {
    id: 'SUP-005',
    name: 'Nordic Metals Ltd',
    country: 'Sweden',
    category: 'Raw Materials',
    score: 94,
    onTimeDelivery: 95,
    leadTime: '45 days',
    avgDelay: '1.0 days',
    risk: 'LOW',
    aiExcerpt: 'Highly stable supply chain with predictive inventory integration.',
    aiFull: 'Nordic Metals maintains a top-tier reliability profile. Their recent integration with our predictive inventory system has reduced order processing time by 15%. Minimal risk projected for the next 6 months.',
    color: '#10b981'
  },
  {
    id: 'SUP-006',
    name: 'EuroTech Assembly',
    country: 'Germany',
    category: 'Assembly',
    score: 85,
    onTimeDelivery: 88,
    leadTime: '18 days',
    avgDelay: '2.4 days',
    risk: 'MEDIUM',
    aiExcerpt: 'Potential weather disruptions flagged for upcoming transit routes.',
    aiFull: 'EuroTech Assembly operates reliably, but predictive weather models indicate severe storms along their primary transit route over the next 10 days. Expect temporary delays of 2-4 days for shipments scheduled this week. Proactive re-routing requested.',
    color: '#eab308'
  }
];

const COMPARISON_DATA = [
  { name: 'Yunnan', score: 96 },
  { name: 'Nordic', score: 94 },
  { name: 'EuroTech', score: 85 },
  { name: 'Global', score: 88 },
  { name: 'TechCorp', score: 82 },
  { name: 'Apex', score: 74 },
];

const CircularProgress = ({ value, color }: { value: number, color: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-lg font-bold">{value}</span>
      </div>
    </div>
  );
};

export default function SupplierIntelligencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getRiskBadgeColor = (risk: string) => {
    switch(risk) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Supplier Intelligence
          </h1>
          <p className="text-gray-400 mt-1">AI-driven risk assessment and performance tracking</p>
        </div>
      </div>

      {/* Risk Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RISK_STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search suppliers, categories, or regions..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition">
            <Filter size={16} /> Risk Level
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition">
            <Globe size={16} /> Region
          </button>
        </div>
      </div>

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SUPPLIERS_DATA.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((supplier, i) => (
          <motion.div 
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: `${supplier.color}20`, color: supplier.color }}>
                    {supplier.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{supplier.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span>{supplier.country}</span>
                      <span>•</span>
                      <span>{supplier.category}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskBadgeColor(supplier.risk)}`}>
                  {supplier.risk} RISK
                </span>
              </div>

              {/* Metrics */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-1">Reliability Score</span>
                  <CircularProgress value={supplier.score} color={supplier.color} />
                </div>
                <div className="flex-1 ml-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">On-Time Delivery</span>
                      <span className="font-semibold">{supplier.onTimeDelivery}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${supplier.onTimeDelivery}%`, backgroundColor: supplier.color }} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">Lead Time</span>
                      <span className="text-sm font-semibold flex items-center gap-1"><Clock size={14} className="text-gray-400"/> {supplier.leadTime}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">Avg Delay</span>
                      <span className="text-sm font-semibold text-red-400 flex items-center gap-1"><TrendingUp size={14}/> {supplier.avgDelay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Excerpt */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm flex gap-3 items-start">
                <Sparkles className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <p className="text-gray-300 italic">"{supplier.aiExcerpt}"</p>
              </div>
            </div>

            {/* Expandable Panel */}
            <div className="border-t border-white/10">
              <button 
                onClick={() => setExpandedCard(expandedCard === supplier.id ? null : supplier.id)}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                {expandedCard === supplier.id ? (
                  <>Hide Details <ChevronUp size={16} /></>
                ) : (
                  <>View AI Analysis <ChevronDown size={16} /></>
                )}
              </button>
              
              <AnimatePresence>
                {expandedCard === supplier.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-black/20"
                  >
                    <div className="p-6 text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Activity size={16} className="text-purple-400" />
                        Comprehensive AI Assessment
                      </h4>
                      <p>{supplier.aiFull}</p>
                      
                      <button className="mt-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition text-sm font-medium">
                        View Full Profile <ExternalLink size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Supplier Comparison Chart */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Activity size={20} className="text-cyan-400" />
          Top Suppliers Reliability Comparison
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {COMPARISON_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score > 90 ? '#10b981' : entry.score > 80 ? '#3b82f6' : entry.score > 70 ? '#eab308' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
