"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  DollarSign, Package, Truck, Warehouse, 
  TrendingUp, ShieldAlert, Activity, RefreshCw 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import { StatCard } from "@/components/ui/StatCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { AISummaryCard } from "@/components/ui/AISummaryCard";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { SupplyChainHealthGauge } from "@/components/charts/SupplyChainHealthGauge";
import { TrendSparkline } from "@/components/charts/TrendSparkline";

// Mock data for charts
const performanceData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
  { name: 'Aug', value: 6800 },
  { name: 'Sep', value: 8000 },
  { name: 'Oct', value: 7500 },
  { name: 'Nov', value: 8500 },
  { name: 'Dec', value: 9000 },
];

const supplierData = [
  { name: 'Highly Reliable', value: 65 },
  { name: 'Average', value: 25 },
  { name: 'At Risk', value: 10 },
];
const COLORS = ['#22c55e', '#eab308', '#ef4444'];

const demandData = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 132 },
  { day: 'Wed', value: 101 },
  { day: 'Thu', value: 140 },
  { day: 'Fri', value: 190 },
  { day: 'Sat', value: 210 },
  { day: 'Sun', value: 250 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // attempt to fetch
        await axios.get('http://localhost:8000/api/v1/dashboard/overview');
        setLoading(false);
      } catch (err) {
        console.warn("API failed, using fallback data", err);
        // Fallback to show the UI
        setTimeout(() => setLoading(false), 1500); 
      }
    };
    fetchData();

    // Set timestamp only on client to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load dashboard data</h2>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-[#0A0F1E] text-white space-y-6 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Executive Dashboard</h1>
          <p className="text-gray-400">Real-time supply chain intelligence and insights.</p>
        </div>
        <div className="text-sm text-gray-500 whitespace-nowrap" suppressHydrationWarning>
          {lastUpdated ? `Last updated: ${lastUpdated}` : 'Loading...'}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <LoadingSkeleton className="h-32 col-span-1 md:col-span-3" />
          {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} className="h-40" />)}
          <LoadingSkeleton className="h-96 col-span-1 md:col-span-2" />
          <LoadingSkeleton className="h-96 col-span-1" />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 w-full"
        >
          {/* ROW 1 - Health Score Banner */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-500/20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
              <SupplyChainHealthGauge score={87} />
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">Overall Status: HEALTHY</h2>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <p className="text-gray-300">AI Assessment: Network running at 94% efficiency. No critical bottlenecks detected.</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col space-y-2">
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                Download Report
              </button>
            </div>
          </motion.div>

          {/* ROW 2 - KPI Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Inventory Value" value={24700000} displayValue="$24.7M" change={3.2} icon={DollarSign} isCurrency={true} />
            <StatCard title="Active Suppliers" value={47} displayValue="47 (3 at risk)" change={-1.5} icon={Package} />
            <StatCard title="In-Transit Shipments" value={128} displayValue="128 (12 delayed)" change={4.1} icon={Truck} />
            <StatCard title="Warehouse Util." value={73.4} displayValue="73.4%" change={-2.1} icon={Warehouse} suffix="%" />
            <StatCard title="30-Day Demand Index" value={94.2} displayValue="94.2" change={8.7} icon={TrendingUp} />
            <StatCard title="Risk Score" value={34} displayValue="34/100" change={-5.0} icon={Activity} />
          </motion.div>

          {/* ROW 3 - Main Content */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" /> Network Performance (12 Mo)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0F1E', borderColor: '#ffffff20', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-red-400" /> Critical Alerts
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <div>
                    <h4 className="text-sm font-medium text-red-400 mb-1">Port Congestion - LA</h4>
                    <p className="text-xs text-gray-400">Delay impact: ~4 days for 12 shipments</p>
                  </div>
                  <RiskBadge level="critical" />
                </div>
                <div className="flex justify-between items-start p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <div>
                    <h4 className="text-sm font-medium text-orange-400 mb-1">Supplier XYZ Risk</h4>
                    <p className="text-xs text-gray-400">Financial stability warning triggered</p>
                  </div>
                  <RiskBadge level="high" />
                </div>
                <div className="flex justify-between items-start p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <div>
                    <h4 className="text-sm font-medium text-yellow-400 mb-1">Inventory Low: SKU-A9</h4>
                    <p className="text-xs text-gray-400">Projected stockout in 5 days</p>
                  </div>
                  <RiskBadge level="medium" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ROW 4 - Secondary Content */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AISummaryCard summary="Supply chain operations are stable with strong momentum in Q3. However, port congestions in Los Angeles threaten 12 inbound shipments. It is recommended to divert upcoming Pacific routes to Seattle. Supplier XYZ shows financial distress; consider activating secondary supplier agreements." />
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-4">Today's Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 bg-blue-500/20 p-1 rounded">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium">Re-route Pacific Shipments</h4>
                    <p className="text-xs text-gray-400">Save 4 days lead time by diverting to Seattle.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-purple-500/20 p-1 rounded">
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium">Expedite SKU-A9</h4>
                    <p className="text-xs text-gray-400">Approve air-freight to avoid $45k stockout risk.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* ROW 5 - Bottom Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col">
              <h3 className="text-lg font-semibold mb-4 text-center">Supplier Reliability</h3>
              <div className="h-[200px] w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={supplierData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {supplierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0A0F1E', borderColor: '#ffffff20', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <div className="flex items-center text-xs"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Reliable</div>
                <div className="flex items-center text-xs"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>Average</div>
                <div className="flex items-center text-xs"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Risk</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-4">Top Delayed Shipments</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-white/5">
                    <tr>
                      <th className="px-4 py-2 rounded-l-lg">ID</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2 rounded-r-lg">ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="px-4 py-3 font-medium">SHP-1092</td>
                      <td className="px-4 py-3 text-red-400">+4 Days</td>
                      <td className="px-4 py-3">Oct 12</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="px-4 py-3 font-medium">SHP-1104</td>
                      <td className="px-4 py-3 text-red-400">+3 Days</td>
                      <td className="px-4 py-3">Oct 14</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">SHP-0998</td>
                      <td className="px-4 py-3 text-orange-400">+1 Day</td>
                      <td className="px-4 py-3">Oct 10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-semibold mb-4 text-center">Demand Forecast (7 Days)</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandData}>
                    <defs>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0A0F1E', borderColor: '#ffffff20', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorDemand)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
