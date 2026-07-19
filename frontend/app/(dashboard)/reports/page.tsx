"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Loader2, Calendar, FileBarChart, PieChart, Activity, ShieldAlert, Package, CheckSquare, Square, CheckCircle2 } from 'lucide-react';

const PAST_REPORTS = [
  { id: '1', title: 'Q2 Executive Summary', date: '2026-07-01', type: 'Quarterly', size: '2.4 MB' },
  { id: '2', title: 'Supplier Risk Analysis (APAC)', date: '2026-07-15', type: 'Custom', size: '1.1 MB' },
  { id: '3', title: 'Weekly Inventory Health', date: '2026-07-17', type: 'Weekly', size: '0.8 MB' },
];

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [sections, setSections] = useState({
    charts: true,
    predictions: true,
    risks: true,
    recommendations: true,
    supplier: false,
    inventory: false
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          AI Executive Reports
        </h1>
        <p className="text-gray-400 mt-1">Generate comprehensive supply chain intelligence briefings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generator Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">Configure Report</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Report Type</label>
                <select className="w-full bg-[#0A0F1E]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400/50 text-white">
                  <option>Daily Briefing</option>
                  <option>Weekly Summary</option>
                  <option>Monthly Analytics</option>
                  <option>Custom Analysis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="text" placeholder="Select dates..." defaultValue="Jul 1 - Jul 18, 2026" className="w-full bg-[#0A0F1E]/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-400/50 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Include Sections</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'charts', label: 'Charts & KPIs', icon: PieChart },
                    { key: 'predictions', label: 'AI Predictions', icon: Activity },
                    { key: 'risks', label: 'Risk Analysis', icon: ShieldAlert },
                    { key: 'recommendations', label: 'Actions', icon: CheckSquare },
                    { key: 'supplier', label: 'Suppliers', icon: FileBarChart },
                    { key: 'inventory', label: 'Inventory', icon: Package },
                  ].map((item) => (
                    <div 
                      key={item.key}
                      onClick={() => toggleSection(item.key as keyof typeof sections)}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                        sections[item.key as keyof typeof sections] 
                          ? 'bg-blue-500/10 border-blue-500/50 text-blue-300' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {sections[item.key as keyof typeof sections] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || showSuccess}
                className={`w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition ${
                  showSuccess 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI is analyzing 47 suppliers...
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Report Generated!
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate AI Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Recent Reports</h2>
          
          <AnimatePresence>
            {PAST_REPORTS.map((report, idx) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-100 group-hover:text-cyan-300 transition-colors">{report.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{report.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-gray-300">{report.type}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition" title="Preview">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 hover:text-blue-300 transition" title="Download PDF">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
