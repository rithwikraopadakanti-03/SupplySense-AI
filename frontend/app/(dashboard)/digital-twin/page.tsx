'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, 
  Download, Layers, Maximize, Minus, Package, Plus, RotateCcw, 
  Settings, Truck, X, Zap
} from 'lucide-react';

// --- DATA DEFINITIONS ---

type NodeType = 'supplier' | 'warehouse' | 'market';
type NodeStatus = 'healthy' | 'warning' | 'critical' | 'risk';

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: NodeType;
  status: NodeStatus;
  icon: string;
  size?: 'small' | 'medium' | 'large';
  fill?: number; // for warehouses
  stats?: Record<string, string | number>;
}

interface NetworkEdge {
  id: string;
  from: string;
  to: string;
  volume: number;
  status: NodeStatus;
}

const INITIAL_NODES: NetworkNode[] = [
  // Suppliers
  { id: 's1', label: 'TechCorp Asia', x: 100, y: 50, type: 'supplier', status: 'healthy', icon: '🏭', stats: { 'Reliability': '98%', 'On-time': '95%', 'Risk': 'Low', 'Last Delivery': 'Today' } },
  { id: 's2', label: 'Shanghai TechParts', x: 100, y: 130, type: 'supplier', status: 'risk', icon: '🏭', stats: { 'Reliability': '82%', 'On-time': '70%', 'Risk': 'High', 'Last Delivery': '2 days ago' } },
  { id: 's3', label: 'GlobalParts Inc', x: 100, y: 210, type: 'supplier', status: 'healthy', icon: '🏭', stats: { 'Reliability': '99%', 'On-time': '99%', 'Risk': 'Low', 'Last Delivery': 'Today' } },
  { id: 's4', label: 'MexSource Solutions', x: 100, y: 290, type: 'supplier', status: 'healthy', icon: '🏭', stats: { 'Reliability': '94%', 'On-time': '92%', 'Risk': 'Medium', 'Last Delivery': 'Yesterday' } },
  { id: 's5', label: 'Yunnan Electronics', x: 100, y: 370, type: 'supplier', status: 'healthy', icon: '🏭', stats: { 'Reliability': '96%', 'On-time': '94%', 'Risk': 'Low', 'Last Delivery': 'Today' } },
  { id: 's6', label: 'Vietnam Tech Supplies', x: 100, y: 450, type: 'supplier', status: 'warning', icon: '🏭', stats: { 'Reliability': '88%', 'On-time': '85%', 'Risk': 'Medium', 'Last Delivery': '3 days ago' } },

  // Warehouses
  { id: 'w1', label: 'WH-Alpha', x: 450, y: 80, type: 'warehouse', status: 'healthy', icon: '🏢', size: 'large', fill: 78, stats: { 'Utilization': '78%', 'Capacity': '100k units', 'Throughput': '12k/day', 'Efficiency': '94%' } },
  { id: 'w2', label: 'WH-Beta', x: 450, y: 170, type: 'warehouse', status: 'critical', icon: '🏢', size: 'large', fill: 91, stats: { 'Utilization': '91%', 'Capacity': '150k units', 'Throughput': '18k/day', 'Efficiency': '82%' } },
  { id: 'w3', label: 'WH-Gamma', x: 450, y: 260, type: 'warehouse', status: 'healthy', icon: '🏢', size: 'medium', fill: 65, stats: { 'Utilization': '65%', 'Capacity': '80k units', 'Throughput': '8k/day', 'Efficiency': '96%' } },
  { id: 'w4', label: 'WH-Delta', x: 450, y: 350, type: 'warehouse', status: 'healthy', icon: '🏢', size: 'medium', fill: 58, stats: { 'Utilization': '58%', 'Capacity': '75k units', 'Throughput': '7k/day', 'Efficiency': '98%' } },
  { id: 'w5', label: 'WH-Epsilon', x: 450, y: 440, type: 'warehouse', status: 'healthy', icon: '🏢', size: 'large', fill: 82, stats: { 'Utilization': '82%', 'Capacity': '120k units', 'Throughput': '14k/day', 'Efficiency': '91%' } },

  // Markets
  { id: 'm1', label: 'Amazon India', x: 800, y: 100, type: 'market', status: 'healthy', icon: '🛒', stats: { 'Daily Orders': '45k', 'Revenue': '$1.2M/day', 'Fulfillment': '99%', 'Top SKU': 'Electronics' } },
  { id: 'm2', label: 'Flipkart', x: 800, y: 200, type: 'market', status: 'healthy', icon: '🛒', stats: { 'Daily Orders': '38k', 'Revenue': '$900k/day', 'Fulfillment': '98%', 'Top SKU': 'Home Goods' } },
  { id: 'm3', label: 'Direct Sales', x: 800, y: 300, type: 'market', status: 'healthy', icon: '🛒', stats: { 'Daily Orders': '12k', 'Revenue': '$400k/day', 'Fulfillment': '99%', 'Top SKU': 'Premium Tech' } },
  { id: 'm4', label: 'B2B Partners', x: 800, y: 400, type: 'market', status: 'healthy', icon: '🛒', stats: { 'Daily Orders': '5k', 'Revenue': '$2.1M/day', 'Fulfillment': '97%', 'Top SKU': 'Bulk Components' } },
];

const INITIAL_EDGES: NetworkEdge[] = [
  { id: 'e1', from: 's1', to: 'w1', volume: 8, status: 'healthy' },
  { id: 'e2', from: 's2', to: 'w2', volume: 10, status: 'risk' },
  { id: 'e3', from: 's3', to: 'w3', volume: 6, status: 'healthy' },
  { id: 'e4', from: 's4', to: 'w4', volume: 5, status: 'healthy' },
  { id: 'e5', from: 's5', to: 'w5', volume: 7, status: 'healthy' },
  { id: 'e6', from: 's6', to: 'w2', volume: 4, status: 'warning' },
  { id: 'e7', from: 'w1', to: 'm1', volume: 12, status: 'healthy' },
  { id: 'e8', from: 'w2', to: 'm2', volume: 15, status: 'critical' },
  { id: 'e9', from: 'w3', to: 'm3', volume: 8, status: 'healthy' },
  { id: 'e10', from: 'w4', to: 'm4', volume: 6, status: 'healthy' },
  { id: 'e11', from: 'w5', to: 'm1', volume: 9, status: 'healthy' },
  { id: 'e12', from: 'w1', to: 'm3', volume: 5, status: 'healthy' },
];

export default function DigitalTwinPage() {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<NetworkEdge[]>(INITIAL_EDGES);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showSuppliers, setShowSuppliers] = useState(true);
  const [showWarehouses, setShowWarehouses] = useState(true);
  const [showRiskOverlay, setShowRiskOverlay] = useState(false);
  const [scenario, setScenario] = useState<string>('none');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const hoveredNode = nodes.find(n => n.id === hoveredNodeId);

  // Handle Scenario Simulation
  useEffect(() => {
    let updatedNodes = [...INITIAL_NODES];
    let updatedEdges = [...INITIAL_EDGES];

    if (scenario === 'typhoon') {
      updatedNodes = updatedNodes.map(n => n.id === 's2' ? { ...n, status: 'critical' } : n);
      updatedEdges = updatedEdges.map(e => e.from === 's2' ? { ...e, status: 'critical' } : e);
    } else if (scenario === 'wh-beta-full') {
      updatedNodes = updatedNodes.map(n => n.id === 'w2' ? { ...n, status: 'critical', fill: 100 } : n);
      updatedEdges = updatedEdges.map(e => (e.from === 'w2' || e.to === 'w2') ? { ...e, status: 'critical' } : e);
    } else if (scenario === 'rotterdam') {
      updatedNodes = updatedNodes.map(n => n.id === 's3' ? { ...n, status: 'critical' } : n);
      updatedEdges = updatedEdges.map(e => e.from === 's3' ? { ...e, status: 'critical' } : e);
    }

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [scenario]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel(prev => Math.min(prev + 0.2, 2));
    if (direction === 'out') setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
    if (direction === 'reset') setZoomLevel(1);
  };

  const getStatusColor = (status: NodeStatus) => {
    switch (status) {
      case 'healthy': return '#3b82f6';
      case 'warning': return '#eab308';
      case 'critical': return '#ef4444';
      case 'risk': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6 pb-24 overflow-hidden relative font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
        .flow-healthy { animation: dashFlow 1s linear infinite; stroke-dasharray: 5, 5; }
        .flow-warning { animation: dashFlow 2s linear infinite; stroke-dasharray: 10, 5; }
        .flow-critical { animation: dashFlow 3s linear infinite; stroke-dasharray: 15, 10; }
        .flow-risk { animation: dashFlow 3s linear infinite; stroke-dasharray: 15, 10; }
        
        .bg-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}} />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Live Digital Twin
            </h1>
            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </div>
          </div>
          <p className="text-gray-400 mt-1">Real-time interactive visualization of your supply chain network</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-sm">47 Active Nodes</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm">128 Flows</span>
          </div>
          <div className="text-xs text-gray-500">
            Last sync: just now
          </div>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSuppliers(!showSuppliers)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${showSuppliers ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5'}`}
          >
            Show Suppliers
          </button>
          <button 
            onClick={() => setShowWarehouses(!showWarehouses)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${showWarehouses ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5'}`}
          >
            Show Warehouses
          </button>
          <button 
            onClick={() => setShowRiskOverlay(!showRiskOverlay)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${showRiskOverlay ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-gray-400 hover:bg-white/5'}`}
          >
            Show Risk Overlay
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
            <button onClick={() => handleZoom('out')} className="p-1 hover:bg-white/10 rounded"><Minus className="w-4 h-4" /></button>
            <button onClick={() => handleZoom('reset')} className="p-1 hover:bg-white/10 rounded text-xs px-2">Reset</button>
            <button onClick={() => handleZoom('in')} className="p-1 hover:bg-white/10 rounded"><Plus className="w-4 h-4" /></button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm border border-white/10 transition-colors">
            <Download className="w-4 h-4" /> Export PNG
          </button>
        </div>
      </div>

      {/* MAIN CANVAS AND SIDE PANEL */}
      <div className="relative flex gap-6 h-[600px]">
        {/* CANVAS */}
        <div 
          className="flex-1 bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative bg-dots"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
        >
          {/* SCENARIO OVERLAY */}
          {scenario !== 'none' && (
            <div className="absolute top-4 left-4 right-4 bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-200 px-4 py-2 rounded-lg flex items-center justify-between z-10 animate-pulse">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Active Simulation:</span> 
                {scenario === 'typhoon' ? 'Typhoon hits Shanghai' : scenario === 'wh-beta-full' ? 'WH-Beta at 100% Capacity' : 'Rotterdam Port Closed'}
              </div>
              <button onClick={() => setScenario('none')} className="flex items-center gap-1 text-sm bg-black/20 hover:bg-black/40 px-2 py-1 rounded transition-colors">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          )}

          <div className="w-full h-full overflow-auto custom-scrollbar relative flex items-center justify-center">
            <div 
              className="absolute transform-gpu transition-transform duration-300 origin-center"
              style={{ transform: `scale(${zoomLevel})`, width: '1000px', height: '600px' }}
            >
              <svg 
                ref={svgRef}
                viewBox="0 0 1000 600" 
                className="w-full h-full"
                onClick={(e) => {
                  if (e.target === svgRef.current) setSelectedNodeId(null);
                }}
              >
                <defs>
                  <filter id="glow-healthy" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-critical" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* EDGES */}
                {edges.map(edge => {
                  const source = nodes.find(n => n.id === edge.from);
                  const target = nodes.find(n => n.id === edge.to);
                  
                  if (!source || !target) return null;
                  if ((source.type === 'supplier' || target.type === 'supplier') && !showSuppliers) return null;
                  if ((source.type === 'warehouse' || target.type === 'warehouse') && !showWarehouses) return null;

                  const dx = target.x - source.x;
                  const dy = target.y - source.y;
                  const midX = source.x + dx / 2;

                  const isHovered = hoveredNodeId === source.id || hoveredNodeId === target.id;
                  const isSelected = selectedNodeId === source.id || selectedNodeId === target.id;
                  
                  let strokeColor = 'rgba(255,255,255,0.1)';
                  if (edge.status === 'critical' || edge.status === 'risk') strokeColor = '#ef4444';
                  else if (edge.status === 'warning') strokeColor = '#eab308';
                  else if (edge.status === 'healthy') strokeColor = '#3b82f6';

                  if (showRiskOverlay && edge.status !== 'critical' && edge.status !== 'risk') {
                    strokeColor = 'rgba(255,255,255,0.05)';
                  }

                  const flowClass = `flow-${edge.status}`;
                  const pathD = `M ${source.x} ${source.y} C ${midX} ${source.y} ${midX} ${target.y} ${target.x} ${target.y}`;

                  return (
                    <g key={edge.id} className="transition-opacity duration-300" style={{ opacity: (!hoveredNodeId || isHovered) ? 1 : 0.2 }}>
                      {/* Base line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={Math.max(1, edge.volume / 2)}
                        strokeLinecap="round"
                        className={flowClass}
                      />
                      {/* Flowing dot animation overlay */}
                      {edge.status === 'healthy' && (
                        <circle r="3" fill="#60a5fa">
                          <animateMotion 
                            dur={`${15 / edge.volume}s`} 
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                      )}
                      {(edge.status === 'critical' || edge.status === 'risk') && (
                        <circle r="4" fill="#ef4444" filter="url(#glow-critical)">
                          <animateMotion 
                            dur="4s" 
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* NODES */}
                {nodes.map(node => {
                  if (node.type === 'supplier' && !showSuppliers) return null;
                  if (node.type === 'warehouse' && !showWarehouses) return null;

                  const isHovered = hoveredNodeId === node.id;
                  const isSelected = selectedNodeId === node.id;
                  const isFaded = hoveredNodeId && !isHovered && !edges.some(e => 
                    (e.from === hoveredNodeId && e.to === node.id) || 
                    (e.to === hoveredNodeId && e.from === node.id)
                  );

                  const radius = node.size === 'large' ? 24 : node.size === 'medium' ? 20 : 16;
                  const color = getStatusColor(node.status);
                  const glowFilter = (node.status === 'critical' || node.status === 'risk') ? 'url(#glow-critical)' : 'url(#glow-healthy)';

                  return (
                    <g 
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer transition-opacity duration-300"
                      style={{ opacity: isFaded ? 0.3 : 1 }}
                    >
                      {/* Selection Ring */}
                      {isSelected && (
                        <circle r={radius + 8} fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />
                      )}

                      {/* Node Body */}
                      <circle 
                        r={radius} 
                        fill="#0A0F1E" 
                        stroke={color} 
                        strokeWidth={isSelected ? 3 : 2}
                        filter={glowFilter}
                        className="transition-all duration-300"
                      />

                      {/* Warehouse Fill Indicator */}
                      {node.type === 'warehouse' && node.fill && (
                        <circle 
                          r={radius - 4}
                          fill="none"
                          stroke={color}
                          strokeWidth="8"
                          strokeDasharray={`${(node.fill / 100) * (2 * Math.PI * (radius - 4))} 1000`}
                          transform="rotate(-90)"
                          opacity="0.5"
                        />
                      )}

                      {/* Icon */}
                      <text 
                        textAnchor="middle" 
                        dy=".3em" 
                        fontSize={node.size === 'large' ? "18" : "14"}
                        style={{ pointerEvents: 'none' }}
                      >
                        {node.icon}
                      </text>

                      {/* Label */}
                      <text 
                        y={radius + 16} 
                        textAnchor="middle" 
                        fill={isSelected ? '#ffffff' : '#94a3b8'} 
                        fontSize="12"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        style={{ pointerEvents: 'none' }}
                        className="drop-shadow-md"
                      >
                        {node.label}
                      </text>
                      
                      {/* Risk Indicator Icon */}
                      {(node.status === 'critical' || node.status === 'risk') && (
                        <g transform={`translate(${radius - 5}, ${-radius + 5})`}>
                          <circle r="8" fill="#ef4444" />
                          <text textAnchor="middle" dy=".3em" fontSize="10" fill="white" fontWeight="bold">!</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* CUSTOM TOOLTIP (Follows Mouse) */}
          <AnimatePresence>
            {hoveredNode && !selectedNodeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-50 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl"
                style={{
                  left: mousePos.x + 20,
                  top: mousePos.y + 20
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{hoveredNode.icon}</span>
                  <span className="font-bold text-white">{hoveredNode.label}</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    hoveredNode.status === 'healthy' ? 'bg-blue-500/20 text-blue-400' :
                    hoveredNode.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {hoveredNode.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 mt-3">
                  {Object.entries(hoveredNode.stats || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm gap-6">
                      <span className="text-gray-400">{key}</span>
                      <span className="text-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE PANEL (Details) */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[320px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col h-full shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${
                    selectedNode.status === 'healthy' ? 'from-blue-500 to-cyan-500' :
                    selectedNode.status === 'warning' ? 'from-yellow-500 to-orange-500' :
                    'from-red-500 to-pink-500'
                  }`}>
                    {selectedNode.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-tight">{selectedNode.label}</h2>
                    <span className="text-xs text-gray-400 capitalize">{selectedNode.type} Node</span>
                  </div>
                </div>
                <button onClick={() => setSelectedNodeId(null)} className="p-1 hover:bg-white/10 rounded-full text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              {(selectedNode.status === 'critical' || selectedNode.status === 'risk') && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-400">Critical Alert</h4>
                    <p className="text-xs text-red-200/70 mt-1">
                      {selectedNode.type === 'warehouse' ? 'Capacity exceeded 90%. Severe bottleneck risk.' : 'Supplier disrupted. Delayed shipments expected.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Metrics */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedNode.stats || {}).map(([key, val]) => (
                    <div key={key} className="bg-black/30 rounded-lg p-3 border border-white/5">
                      <div className="text-xs text-gray-400 mb-1">{key}</div>
                      <div className="text-lg font-semibold text-white">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Nodes */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Connections</h3>
                <div className="space-y-2">
                  {edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).map(edge => {
                    const isOutgoing = edge.from === selectedNode.id;
                    const connectedNodeId = isOutgoing ? edge.to : edge.from;
                    const connectedNode = nodes.find(n => n.id === connectedNodeId);
                    if (!connectedNode) return null;

                    return (
                      <div key={edge.id} className="flex items-center justify-between text-sm bg-white/5 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          {isOutgoing ? <ArrowRight className="w-3 h-3 text-blue-400" /> : <ChevronRight className="w-3 h-3 text-purple-400 rotate-180" />}
                          <span className="text-gray-300">{connectedNode.label}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${edge.status === 'healthy' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                          Vol: {edge.volume}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-3 border border-purple-500/30 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-300">AI Insight</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedNode.status === 'critical' ? 'Reroute incoming shipments to WH-Gamma to alleviate current capacity constraints.' : 'Performance is stable. Expected demand spike next week may require pre-allocation.'}
                  </p>
                </div>
                <button className="w-full bg-white text-black font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  View Full Details →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* Widget 1: Network Health */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Overall Network Health
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white mb-1">87<span className="text-2xl text-gray-500">%</span></div>
              <div className="text-sm text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Optimal Status</div>
            </div>
            <div className="w-24 h-24 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="87, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">87%</div>
            </div>
          </div>
        </div>

        {/* Widget 2: Active Disruptions */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Active Disruptions
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-sm text-white">WH-Beta Overflow</div>
                  <div className="text-xs text-gray-400">91% capacity reached</div>
                </div>
              </div>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded">Reroute</button>
            </div>
            <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-yellow-400" />
                <div>
                  <div className="text-sm text-white">Shanghai Delay</div>
                  <div className="text-xs text-gray-400">Est. 2 days late</div>
                </div>
              </div>
              <button className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">Expedite</button>
            </div>
          </div>
        </div>

        {/* Widget 3: Simulation Sandbox */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Scenario Simulation
          </h3>
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-2">Inject stress events to see network resilience in real-time.</p>
            <select 
              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            >
              <option value="none">-- Select Scenario --</option>
              <option value="typhoon">Typhoon hits Shanghai (Supplier Disruption)</option>
              <option value="wh-beta-full">WH-Beta reaches 100% (Bottleneck)</option>
              <option value="rotterdam">Rotterdam Port Closes (Route Blocked)</option>
            </select>
            {scenario !== 'none' && (
              <div className="text-xs text-red-300 mt-2 flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> Simulation Active on graph above
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
