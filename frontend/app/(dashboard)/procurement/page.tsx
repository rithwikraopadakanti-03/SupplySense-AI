"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, DollarSign, FileText, CheckCircle, XCircle, Settings, ShoppingCart, Clock } from 'lucide-react';

const mockStats = [
  { title: 'Total POs This Month', value: '142', icon: FileText, color: 'text-blue-400' },
  { title: 'Total Value', value: '$2.4M', icon: DollarSign, color: 'text-emerald-400' },
  { title: 'Estimated AI Savings', value: '$340K', icon: BrainCircuit, color: 'text-purple-400' },
  { title: 'Pending Approvals', value: '8', icon: Clock, color: 'text-orange-400' },
];

const mockRecs = [
  { id: 1, product: 'Industrial Sensors (SKU-892)', qty: 450, supplier: 'TechCorp Asia', warehouse: 'Warehouse A', cost: 84500, savings: 12300, savingsPct: 14.5, date: 'July 22, 2026', reasoning: 'Bulk discount threshold met. Consolidating Q3 orders avoids upcoming 5% price hike from supplier due to raw material shortages.' },
  { id: 2, product: 'Packaging Materials (SKU-102)', qty: 12000, supplier: 'EcoPack Local', warehouse: 'Central Hub', cost: 15600, savings: 2400, savingsPct: 13.3, date: 'July 19, 2026', reasoning: 'Switching to local supplier reduces carbon footprint and freight costs while mitigating current port delay risks.' },
];

const mockHistory = [
  { po: 'PO-2026-890', sup: 'Global Components', prod: 'Microcontrollers', qty: 2000, cost: '$45,000', status: 'Approved', date: 'Jul 15, 2026' },
  { po: 'PO-2026-889', sup: 'TechCorp Asia', prod: 'Industrial Sensors', qty: 100, cost: '$19,000', status: 'Shipped', date: 'Jul 14, 2026' },
  { po: 'PO-2026-888', sup: 'SteelWorks Inc', prod: 'Raw Steel', qty: 50, cost: '$120,000', status: 'Delivered', date: 'Jul 10, 2026' },
  { po: 'PO-2026-887', sup: 'EcoPack Local', prod: 'Boxes', qty: 5000, cost: '$6,500', status: 'Draft', date: 'Jul 18, 2026' },
];

export default function ProcurementAI() {
  const [recs, setRecs] = useState(mockRecs);
  const [showModal, setShowModal] = useState(false);
  const [selectedRec, setSelectedRec] = useState<any>(null);

  const handleApprove = (rec: any) => {
    setSelectedRec(rec);
    setShowModal(true);
  };

  const confirmApprove = () => {
    setRecs(recs.filter(r => r.id !== selectedRec.id));
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen bg-[#0A0F1E] text-white">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">AI-Powered Procurement</h1>
          <p className="text-gray-400 mt-1">Smart sourcing and automated purchase recommendations</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg transition backdrop-blur-md">
          <BrainCircuit className="w-4 h-4 text-purple-400" /> Generate New Recommendations
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <h3 className="text-sm text-gray-400">{stat.title}</h3>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-blue-400" /> Action Required</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        <AnimatePresence>
          {recs.map((rec) => (
            <motion.div key={rec.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold rounded-bl-lg shadow-lg">
                AI RECOMMENDED
              </div>
              
              <div className="mb-4 pr-32">
                <h3 className="text-lg font-bold">{rec.product}</h3>
                <div className="text-sm text-gray-400 mt-1">Recommended Supplier: <span className="text-white">{rec.supplier}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-white/5 rounded-lg p-4 border border-white/5">
                <div>
                  <div className="text-xs text-gray-400">Order Quantity</div>
                  <div className="font-semibold">{rec.qty.toLocaleString()} units</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Destination</div>
                  <div className="font-semibold">{rec.warehouse}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Expected Cost</div>
                  <div className="font-semibold">${rec.cost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Estimated Savings</div>
                  <div className="font-semibold text-emerald-400">+${rec.savings.toLocaleString()} ({rec.savingsPct}%)</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-semibold text-purple-300 mb-1 flex items-center gap-1"><BrainCircuit className="w-3 h-3" /> AI Reasoning</div>
                <p className="text-sm text-gray-300 bg-purple-500/5 p-3 rounded-lg border border-purple-500/10">{rec.reasoning}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleApprove(rec)} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" /> Modify
                </button>
                <button onClick={() => setRecs(recs.filter(r => r.id !== rec.id))} className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </motion.div>
          ))}
          {recs.length === 0 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
               No pending recommendations. All caught up!
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold">Recent Purchase Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">PO Number</th>
                <th className="p-4 font-medium">Supplier</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Total Cost</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockHistory.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition text-sm">
                  <td className="p-4 font-medium text-blue-400">{row.po}</td>
                  <td className="p-4">{row.sup}</td>
                  <td className="p-4">{row.prod}</td>
                  <td className="p-4">{row.qty.toLocaleString()}</td>
                  <td className="p-4 font-medium">{row.cost}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      row.status === 'Approved' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      row.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      row.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111827] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Approve Recommendation</h3>
            <p className="text-gray-400 text-sm mb-6">Are you sure you want to approve the purchase of {selectedRec?.qty} units of {selectedRec?.product}?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 transition">Cancel</button>
              <button onClick={confirmApprove} className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Confirm Approval
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
