"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { Calendar, Download, TrendingUp, AlertCircle, CheckCircle, ChevronDown, Activity, Star } from 'lucide-react';

const mockChartData = Array.from({ length: 30 }).map((_, i) => ({
  date: `Jul ${i + 1}`,
  actual: i < 20 ? 1000 + Math.random() * 500 : null,
  predicted: i >= 18 ? 1200 + Math.random() * 600 + (i * 20) : null,
  historical: 900 + Math.random() * 400,
  lower: i >= 18 ? 1000 + (i * 15) : null,
  upper: i >= 18 ? 1600 + (i * 25) : null,
}));

const mockProducts = [
  { id: 1, name: 'Wireless Earbuds', f7: 4500, f30: 18500, trend: '+12%', conf: 92, note: 'High seasonal demand expected.' },
  { id: 2, name: 'Smart Watch Pro', f7: 2100, f30: 8900, trend: '+5%', conf: 88, note: 'Stable growth pattern.' },
  { id: 3, name: 'Gaming Mouse', f7: 3200, f30: 12000, trend: '-2%', conf: 85, note: 'Slight dip post-holiday.' },
];

export default function DemandForecast() {
  const [data, setData] = useState(mockChartData);
  const [products, setProducts] = useState(mockProducts);
  
  useEffect(() => {
    // Fallback data loading
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/demand/forecast');
        if (res.ok) {
          const json = await res.json();
          // update state if needed
        }
      } catch (e) {
        console.error("Using fallback data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0A0F1E] text-white">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Demand Intelligence Center</h1>
          <p className="text-gray-400 mt-1">AI-driven forecasting and seasonal trend analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 backdrop-blur-md cursor-pointer hover:bg-white/10 transition">
            <span className="text-sm">All Products</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1 backdrop-blur-md">
            {['7D', '14D', '30D', '90D'].map(d => (
              <button key={d} className={`px-3 py-1 rounded-md text-sm ${d === '30D' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:text-white'}`}>{d}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-blue-400" /> Global Demand Forecast</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 15, 30, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="historical" fill="rgba(255,255,255,0.05)" radius={[4, 4, 0, 0]} name="Historical Average" />
                <Area type="monotone" dataKey="predicted" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPredicted)" name="AI Prediction" />
                <Line type="monotone" dataKey="actual" stroke="#fff" strokeWidth={3} dot={{ r: 4, fill: '#0A0F1E', stroke: '#fff', strokeWidth: 2 }} name="Actual Demand" />
                <Area type="monotone" dataKey="upper" stroke="none" fill="#8b5cf6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#0A0F1E" fillOpacity={1} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />
            <h3 className="text-gray-400 text-sm font-medium mb-2">AI Confidence Score</h3>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">89.3%</div>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" /> +12.4% vs last month
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Detected Events</h3>
            <div className="space-y-3">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 flex gap-3 items-start">
                <Star className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-purple-200">Diwali Season</div>
                  <div className="text-xs text-gray-400 mt-1">Expected +40% surge in Q4</div>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-blue-200">Summer Sale Promo</div>
                  <div className="text-xs text-gray-400 mt-1">July 15 - Aug 5</div>
                </div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-cyan-200">Back to School</div>
                  <div className="text-xs text-gray-400 mt-1">Category specific spike</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold">Product Forecast Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">7-Day Forecast</th>
                <th className="p-4 font-medium">30-Day Forecast</th>
                <th className="p-4 font-medium">Trend</th>
                <th className="p-4 font-medium">AI Confidence</th>
                <th className="p-4 font-medium">AI Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.f7.toLocaleString()} units</td>
                  <td className="p-4">{p.f30.toLocaleString()} units</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${p.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{p.trend}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.conf}%` }} />
                      </div>
                      <span className="text-sm">{p.conf}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
