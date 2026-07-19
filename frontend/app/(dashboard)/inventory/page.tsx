'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, AlertTriangle, DollarSign, Clock, 
  Search, Filter, ChevronDown, ChevronUp, 
  ArrowRight, TrendingUp, TrendingDown,
  Sparkles, Info, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const SUMMARY_STATS = [
  { title: 'Total Products', value: '12,450', icon: Package, color: 'text-blue-400' },
  { title: 'Low Stock Items', value: '342', icon: AlertTriangle, color: 'text-red-400' },
  { title: 'Total Value', value: '$8.4M', icon: DollarSign, color: 'text-green-400' },
  { title: 'Avg Days Remaining', value: '24', icon: Clock, color: 'text-purple-400' },
];

const INVENTORY_DATA = [
  { id: 1, product: 'Samsung Galaxy S24', sku: 'SAMSUNG-S24-01', warehouse: 'Warehouse B', currentStock: 120, reserved: 40, incoming: 0, outgoing: 20, safetyStock: 200, daysRemaining: 6, action: 'ORDER NOW', status: 'Low Stock' },
  { id: 2, product: 'iPhone 15 Pro', sku: 'APPLE-IP15P', warehouse: 'Warehouse A', currentStock: 850, reserved: 200, incoming: 500, outgoing: 150, safetyStock: 300, daysRemaining: 45, action: 'OPTIMAL', status: 'Healthy' },
  { id: 3, product: 'Sony WH-1000XM5', sku: 'SONY-WH5-BLK', warehouse: 'Warehouse C', currentStock: 45, reserved: 10, incoming: 0, outgoing: 30, safetyStock: 50, daysRemaining: 12, action: 'TRANSFER', status: 'At Risk' },
  { id: 4, product: 'Dell XPS 15', sku: 'DELL-XPS15-24', warehouse: 'Warehouse A', currentStock: 310, reserved: 50, incoming: 100, outgoing: 20, safetyStock: 150, daysRemaining: 28, action: 'OPTIMAL', status: 'Healthy' },
  { id: 5, product: 'Logitech MX Master 3S', sku: 'LOGI-MX3S', warehouse: 'Warehouse B', currentStock: 15, reserved: 5, incoming: 50, outgoing: 10, safetyStock: 100, daysRemaining: 3, action: 'ORDER NOW', status: 'Critical' },
];

const STOCK_TREND_DATA = [
  { name: 'Mon', current: 4000, safety: 2400 },
  { name: 'Tue', current: 3000, safety: 2400 },
  { name: 'Wed', current: 2000, safety: 2400 },
  { name: 'Thu', current: 2780, safety: 2400 },
  { name: 'Fri', current: 1890, safety: 2400 },
  { name: 'Sat', current: 2390, safety: 2400 },
  { name: 'Sun', current: 3490, safety: 2400 },
];

const CATEGORY_DATA = [
  { name: 'Electronics', value: 4500, color: '#3b82f6' },
  { name: 'Accessories', value: 3000, color: '#a855f7' },
  { name: 'Components', value: 2000, color: '#06b6d4' },
  { name: 'Packaging', value: 1500, color: '#10b981' },
];

const AI_RECOMMENDATIONS = [
  { id: 1, text: 'Order 450 units of Samsung Galaxy S24 from TechCorp Asia - stock depletes in 6 days.', type: 'order' },
  { id: 2, text: 'Transfer 120 units of iPhone 15 Pro from Warehouse B to Warehouse A - demand surge expected.', type: 'transfer' },
  { id: 3, text: 'Reduce safety stock of Dell XPS 15 by 15% due to seasonal demand drop.', type: 'optimize' },
];

export default function InventoryPage() {
  const [data, setData] = useState(INVENTORY_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const getDaysColor = (days: number) => {
    if (days < 7) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (days <= 14) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-green-400 bg-green-400/10 border-green-400/20';
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'ORDER NOW': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'TRANSFER': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'OPTIMAL': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-white/10 text-gray-300 border border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Inventory Intelligence
          </h1>
          <p className="text-gray-400 mt-1">Real-time stock monitoring and AI-driven optimization</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUMMARY_STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
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
            placeholder="Search products or SKUs..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition">
            <Filter size={16} /> Category
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-white/10 transition">
            <Filter size={16} /> Warehouse
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400">
              <tr>
                {['Product', 'SKU', 'Warehouse', 'Current Stock', 'Reserved', 'Incoming', 'Safety Stock', 'Days Remaining', 'AI Action'].map((col, i) => (
                  <th 
                    key={col} 
                    className="px-6 py-4 font-medium cursor-pointer hover:text-white transition group"
                    onClick={() => handleSort(col.toLowerCase().replace(' ', ''))}
                  >
                    <div className="flex items-center gap-1">
                      {col}
                      <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.filter(item => item.product.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-medium">{item.product}</td>
                  <td className="px-6 py-4 text-gray-400">{item.sku}</td>
                  <td className="px-6 py-4 text-gray-300">{item.warehouse}</td>
                  <td className="px-6 py-4 font-semibold">{item.currentStock}</td>
                  <td className="px-6 py-4 text-gray-400">{item.reserved}</td>
                  <td className="px-6 py-4 text-blue-400">+{item.incoming}</td>
                  <td className="px-6 py-4 text-gray-400">{item.safetyStock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getDaysColor(item.daysRemaining)}`}>
                      {item.daysRemaining} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getActionBadge(item.action)}`}>
                      {item.action}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            7-Day Stock Trend vs Safety Level
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STOCK_TREND_DATA}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="safety" stroke="#a855f7" fillOpacity={0} strokeDasharray="5 5" name="Safety Stock" />
                <Area type="monotone" dataKey="current" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCurrent)" name="Current Stock" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <PieChartIcon className="text-cyan-400" size={20} />
            Inventory by Category
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {CATEGORY_DATA.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations Panel */}
      <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-400/50">
        <div className="bg-[#0A0F1E] rounded-xl p-6 h-full">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-400" size={24} />
            AI Prescriptive Recommendations
          </h3>
          <div className="space-y-4">
            {AI_RECOMMENDATIONS.map((rec) => (
              <div key={rec.id} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition">
                <div className={`p-2 rounded-full mt-1 ${
                  rec.type === 'order' ? 'bg-red-500/20 text-red-400' : 
                  rec.type === 'transfer' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  <Info size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-200">{rec.text}</p>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition">
                  Review Action
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
