'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, Ship, Plane, AlertTriangle, 
  CheckCircle, Clock, Map as MapIcon, Navigation,
  Search, Filter, CloudRain, ShieldAlert, ChevronRight
} from 'lucide-react';

// Dynamically import Leaflet Map to avoid SSR issues
const ShipmentMap = dynamic(() => import('./components/ShipmentMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-white/5 animate-pulse rounded-xl flex items-center justify-center border border-white/10">
      <MapIcon className="text-gray-500 animate-bounce" size={48} />
    </div>
  )
});

// --- MOCK DATA ---
const SHIPMENT_STATS = [
  { title: 'In Transit', value: '1,432', icon: Truck, color: 'text-blue-400' },
  { title: 'Delayed', value: '28', icon: AlertTriangle, color: 'text-red-400' },
  { title: 'Delivered This Week', value: '850', icon: CheckCircle, color: 'text-green-400' },
  { title: 'On Time %', value: '96.5%', icon: Clock, color: 'text-purple-400' },
];

export const SHIPMENTS_DATA = [
  {
    id: 'TRK-982451',
    origin: 'Shanghai, CN',
    destination: 'Los Angeles, US',
    carrier: 'Maersk',
    eta: 'Oct 24, 2023',
    status: 'delayed',
    mode: 'ship',
    coordinates: [[31.2304, 121.4737], [34.0522, -118.2437]],
    currentLoc: [33.5, -150.0],
    delayProb: 85,
    weatherImpact: 'Typhoon approaching Pacific route. Expect 48h delay.',
    altRoute: 'Reroute via Southern Pacific corridor (+12h delay but safer).',
    timeline: [
      { step: 'Order Placed', time: 'Oct 1', completed: true },
      { step: 'Departed Shanghai', time: 'Oct 5', completed: true },
      { step: 'In Transit (Pacific)', time: 'Current', completed: true },
      { step: 'Customs (LAX)', time: 'Pending', completed: false },
      { step: 'Delivered', time: 'Est. Oct 26', completed: false },
    ]
  },
  {
    id: 'AWB-552199',
    origin: 'Frankfurt, DE',
    destination: 'New York, US',
    carrier: 'Lufthansa Cargo',
    eta: 'Oct 15, 2023',
    status: 'on-time',
    mode: 'plane',
    coordinates: [[50.1109, 8.6821], [40.7128, -74.0060]],
    currentLoc: [45.0, -35.0],
    delayProb: 5,
    weatherImpact: 'Clear weather along flight path.',
    altRoute: 'N/A - Flight proceeding as optimal.',
    timeline: [
      { step: 'Order Placed', time: 'Oct 12', completed: true },
      { step: 'Departed FRA', time: 'Oct 14', completed: true },
      { step: 'In Transit', time: 'Current', completed: true },
      { step: 'Customs (JFK)', time: 'Pending', completed: false },
      { step: 'Delivered', time: 'Est. Oct 15', completed: false },
    ]
  },
  {
    id: 'LTL-339842',
    origin: 'Chicago, US',
    destination: 'Dallas, US',
    carrier: 'FedEx Freight',
    eta: 'Oct 16, 2023',
    status: 'at-risk',
    mode: 'truck',
    coordinates: [[41.8781, -87.6298], [32.7767, -96.7970]],
    currentLoc: [38.6270, -90.1994], // St Louis
    delayProb: 65,
    weatherImpact: 'Severe thunderstorms in Missouri causing highway slowdowns.',
    altRoute: 'Reroute via I-55 S to I-40 W.',
    timeline: [
      { step: 'Order Placed', time: 'Oct 13', completed: true },
      { step: 'Departed ORD', time: 'Oct 14', completed: true },
      { step: 'In Transit', time: 'Current', completed: true },
      { step: 'Local Hub', time: 'Pending', completed: false },
      { step: 'Delivered', time: 'Est. Oct 16', completed: false },
    ]
  }
];

export default function ShipmentIntelligencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  const selectedShipment = SHIPMENTS_DATA.find(s => s.id === selectedShipmentId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delayed': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'on-time': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'at-risk': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getModeIcon = (mode: string) => {
    switch(mode) {
      case 'ship': return <Ship size={18} />;
      case 'plane': return <Plane size={18} />;
      case 'truck': return <Truck size={18} />;
      default: return <Truck size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Shipment Intelligence
        </h1>
        <p className="text-gray-400 mt-1">Live tracking and AI-powered delay prediction</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHIPMENT_STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: -20 }}
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

      {/* Main Content: Map & List */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left: Map */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2 h-[500px] relative overflow-hidden">
            <ShipmentMap 
              shipments={SHIPMENTS_DATA} 
              selectedId={selectedShipmentId} 
              onSelect={setSelectedShipmentId} 
            />
          </div>

          {/* Selected Shipment Detail Panel */}
          <AnimatePresence>
            {selectedShipment && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{selectedShipment.id}</h3>
                    <p className="text-gray-400 text-sm">{selectedShipment.origin} <ChevronRight className="inline" size={14}/> {selectedShipment.destination}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400 block mb-1">AI Delay Probability</span>
                    <span className={`text-xl font-bold ${selectedShipment.delayProb > 50 ? 'text-red-400' : 'text-green-400'}`}>
                      {selectedShipment.delayProb}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                    <CloudRain className="text-blue-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Weather Impact</h4>
                      <p className="text-sm text-gray-300">{selectedShipment.weatherImpact}</p>
                    </div>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 flex gap-3">
                    <Navigation className="text-purple-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Alternative Route</h4>
                      <p className="text-sm text-gray-300">{selectedShipment.altRoute}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2" />
                  <div className="flex justify-between relative z-10">
                    {selectedShipment.timeline.map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full mb-2 border-2 ${
                          item.completed 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'bg-[#0A0F1E] border-gray-600'
                        }`} />
                        <span className="text-xs font-medium text-center">{item.step}</span>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: List */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold mb-4">Active Shipments</h3>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Tracking # or City..." 
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-black/20 border border-white/10 rounded-lg p-2 hover:bg-white/10 transition">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {SHIPMENTS_DATA.filter(s => s.id.toLowerCase().includes(searchTerm.toLowerCase()) || s.origin.toLowerCase().includes(searchTerm.toLowerCase())).map((shipment) => (
              <motion.div 
                key={shipment.id}
                onClick={() => setSelectedShipmentId(shipment.id)}
                className={`p-4 rounded-lg cursor-pointer border transition ${
                  selectedShipmentId === shipment.id 
                    ? 'bg-blue-500/10 border-blue-500/50' 
                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{getModeIcon(shipment.mode)}</span>
                    <span className="font-semibold">{shipment.id}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${getStatusBadge(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300 mb-2">
                  {shipment.origin} &rarr; {shipment.destination}
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Carrier: {shipment.carrier}</span>
                  <span>ETA: {shipment.eta}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
