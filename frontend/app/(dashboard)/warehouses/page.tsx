"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Box, BarChart2, Zap, ArrowRight, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockWarehouses = [
  { id: 1, name: 'Central Hub', location: 'Chicago, IL', util: 85, in: 12, out: 8 },
  { id: 2, name: 'East Coast Dist', location: 'Newark, NJ', util: 92, in: 18, out: 15 },
  { id: 3, name: 'West Coast Dist', location: 'Los Angeles, CA', util: 64, in: 5, out: 12 },
  { id: 4, name: 'Southern Hub', location: 'Atlanta, GA', util: 78, in: 9, out: 7 },
  { id: 5, name: 'Texas Facility', location: 'Dallas, TX', util: 45, in: 3, out: 4 },
];

const mockHeatmap = Array.from({ length: 48 }).map((_, i) => Math.floor(Math.random() * 100));

export default function WarehouseDashboard() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = mockWarehouses.find(w => w.id === selectedId) || mockWarehouses[0];

  const getUtilColor = (val: number) => {
    if (val > 90) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (val > 75) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-green-400 bg-green-500/20 border-green-500/30';
  };

  const getHeatmapColor = (val: number) => {
    if (val > 85) return 'bg-red-500/80';
    if (val > 60) return 'bg-yellow-500/80';
    if (val > 30) return 'bg-green-500/80';
    return 'bg-white/10';
  };

  return (
    <div className="p-6 min-h-screen bg-[#0A0F1E] text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Warehouse Intelligence</h1>
        <p className="text-gray-400 mt-1">Real-time facility monitoring and space optimization</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {mockWarehouses.map((w, i) => (
          <motion.div 
            key={w.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedId(w.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all border backdrop-blur-md ${selectedId === w.id ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm truncate pr-2">{w.name}</h3>
              <span className={`text-xs px-2 py-1 rounded border ${getUtilColor(w.util)}`}>{w.util}%</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1 mb-4">
              <MapPin className="w-3 h-3" /> {w.location}
            </div>
            <div className="flex justify-between text-xs text-gray-300">
              <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-cyan-400" transform="scale(-1, 1)" /> In: {w.in}</span>
              <span className="flex items-center gap-1">Out: {w.out} <Truck className="w-3 h-3 text-purple-400" /></span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold w-full text-left mb-4">{selected.name} Utilization</h2>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <motion.circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke={selected.util > 90 ? '#ef4444' : selected.util > 75 ? '#eab308' : '#3b82f6'} 
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * selected.util) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{selected.util}%</span>
              <span className="text-xs text-gray-400">Capacity</span>
            </div>
          </div>
          <div className="mt-6 w-full space-y-3">
            <div className="flex justify-between text-sm bg-white/5 p-3 rounded-lg">
              <span className="text-gray-400">Efficiency Score</span>
              <span className="font-semibold text-green-400">A-</span>
            </div>
            <div className="flex justify-between text-sm bg-white/5 p-3 rounded-lg">
              <span className="text-gray-400">AI Status</span>
              <span className="font-semibold text-blue-400">Optimized</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2"><Box className="w-5 h-5 text-purple-400" /> Storage Zones Heatmap</h2>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500/80 rounded-sm"></div> Full</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500/80 rounded-sm"></div> High</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500/80 rounded-sm"></div> Optimal</span>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {mockHeatmap.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`aspect-square rounded-md ${getHeatmapColor(val)} hover:ring-2 ring-white/50 cursor-crosshair transition-all`}
                title={`Zone ${i+1}: ${val}% Full`}
              />
            ))}
          </div>
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
            <Zap className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-200">AI Recommendation</h4>
              <p className="text-xs text-blue-100/70 mt-1">Reallocate fast-moving consumer goods (FMCG) from Zone 12 to Zone 42 to reduce forklift travel time by estimated 14%.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-cyan-400" /> Network Capacity Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockWarehouses} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(10, 15, 30, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="util" radius={[4, 4, 0, 0]}>
                {mockWarehouses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.util > 90 ? '#ef4444' : entry.util > 75 ? '#eab308' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
