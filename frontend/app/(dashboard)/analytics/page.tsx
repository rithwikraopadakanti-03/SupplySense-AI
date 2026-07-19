"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Activity, Package, Truck, Users } from 'lucide-react';

const KPI_DATA = [
  { title: "Revenue Impact", value: "$2.4M saved", icon: DollarSign, trend: "+12.5%", isPositive: true },
  { title: "Forecast Accuracy", value: "91.2%", icon: Activity, trend: "+3.2%", isPositive: true },
  { title: "Supplier Performance", value: "84.7%", icon: Users, trend: "-1.4%", isPositive: false },
  { title: "On-Time Delivery", value: "88.3%", icon: Truck, trend: "+0.8%", isPositive: true },
  { title: "Inventory Turnover", value: "8.4x", icon: Package, trend: "+2.1%", isPositive: true },
  { title: "Cost Reduction", value: "12.3%", icon: TrendingDown, trend: "+4.5%", isPositive: true }
];

const SUPPLIER_RADAR_DATA = [
  { metric: 'Quality', A: 90, B: 75, C: 85 },
  { metric: 'Cost', A: 80, B: 60, C: 90 },
  { metric: 'Delivery', A: 95, B: 85, C: 70 },
  { metric: 'Reliability', A: 85, B: 70, C: 80 },
  { metric: 'Flexibility', A: 70, B: 90, C: 60 },
  { metric: 'Sustainability', A: 85, B: 80, C: 75 },
];

const FORECAST_DATA = [
  { name: 'Jan', actual: 4000, predicted: 4200 },
  { name: 'Feb', actual: 3000, predicted: 3100 },
  { name: 'Mar', actual: 2000, predicted: 2300 },
  { name: 'Apr', actual: 2780, predicted: 2800 },
  { name: 'May', actual: 1890, predicted: 1900 },
  { name: 'Jun', actual: 2390, predicted: 2500 },
];

const WAREHOUSE_DATA = [
  { name: 'W1', Q1: 4000, Q2: 2400, Q3: 2400 },
  { name: 'W2', Q1: 3000, Q2: 1398, Q3: 2210 },
  { name: 'W3', Q1: 2000, Q2: 9800, Q3: 2290 },
  { name: 'W4', Q1: 2780, Q2: 3908, Q3: 2000 },
  { name: 'W5', Q1: 1890, Q2: 4800, Q3: 2181 },
];

const COST_DATA = [
  { name: 'Jan', procurement: 4000, logistics: 2400, storage: 1200 },
  { name: 'Feb', procurement: 3000, logistics: 1398, storage: 1100 },
  { name: 'Mar', procurement: 2000, logistics: 9800, storage: 1500 },
  { name: 'Apr', procurement: 2780, logistics: 3908, storage: 1300 },
  { name: 'May', procurement: 1890, logistics: 4800, storage: 1250 },
  { name: 'Jun', procurement: 2390, logistics: 3800, storage: 1400 },
  { name: 'Jul', procurement: 3490, logistics: 4300, storage: 1600 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30');

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Analytics & Performance
          </h1>
          <p className="text-gray-400 mt-1">Enterprise intelligence and KPI tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#0A0F1E] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-400/50 text-white"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last 365 Days</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_DATA.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition cursor-default"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {kpi.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {kpi.trend}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Supplier Performance Radar</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SUPPLIER_RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Supplier A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Supplier B" dataKey="B" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
              <Radar name="Supplier C" dataKey="C" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Line */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Forecast Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FORECAST_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Bar */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Warehouse Utilization</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WAREHOUSE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}}/>
              <Legend />
              <Bar dataKey="Q1" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Q2" stackId="a" fill="#22d3ee" />
              <Bar dataKey="Q3" stackId="a" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fake Heatmap with simple grid */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Shipment Delay Heatmap</h3>
          <div className="flex-1 grid grid-cols-12 gap-1 grid-rows-7">
            {Array.from({ length: 7 * 12 }).map((_, i) => {
              const intensity = Math.random();
              const r = Math.floor(59 + (239 - 59) * intensity);
              const g = Math.floor(130 - 130 * intensity);
              const b = Math.floor(246 - 246 * intensity);
              return (
                <div 
                  key={i} 
                  className="rounded-sm cursor-pointer hover:ring-2 ring-white/50 transition-all"
                  style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.2 + intensity * 0.8})` }}
                  title={`Avg Delay: ${(intensity * 48).toFixed(1)} hrs`}
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Jan</span><span>Dec</span>
          </div>
        </div>
      </div>

      {/* Row 3 - Full Width Area Chart */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Supply Chain Cost Breakdown</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={COST_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
            <Legend />
            <Area type="monotone" dataKey="procurement" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="logistics" stackId="1" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.6} />
            <Area type="monotone" dataKey="storage" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
