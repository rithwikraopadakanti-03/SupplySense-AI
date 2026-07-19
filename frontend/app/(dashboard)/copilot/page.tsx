"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  MessageSquare, 
  AlertTriangle, 
  Package, 
  Activity, 
  TrendingUp 
} from 'lucide-react';

// --- Smart AI Response Engine Mock ---
const getMockResponse = (query: string) => {
  const lower = query.toLowerCase();
  
  if (lower.includes('warehouse') && lower.includes('underperform') || lower.includes('why is warehouse')) {
    return `## Warehouse Alpha — Performance Analysis

**Overall Efficiency Score: 72/100** ⚠️ Below Target (Target: 85)

### Root Causes Identified:
1. **Zone C Congestion** — 94% occupancy causing pick-path inefficiency (+23% pick time)
2. **Inbound Bottleneck** — 14 trucks/day exceeds dock capacity (optimal: 10)
3. **Staff Shortage** — 18% below optimal headcount on night shift
4. **SKU Slotting** — 340 high-velocity items in slow zones

### Impact:
- Order fulfillment delay: +1.8 hours avg
- Daily throughput: 2,100 units (capacity: 3,400)

### AI Recommendations:
1. Relocate 200 fast-moving SKUs to Zone A (est. +15% throughput)
2. Implement cross-docking for 8 high-frequency suppliers
3. Stagger inbound schedule: split 14 trucks across 3 time windows
4. Hire 12 temp staff for night shift before festival season

**Estimated improvement with actions: +34% efficiency in 14 days**`;
  }
  
  if (lower.includes('reorder') || lower.includes('what should i order')) {
    return `## Today's Reorder Recommendations

**3 items require IMMEDIATE action** (stockout risk < 7 days)

| Product | Stock Left | Days Remaining | Recommended Order | Supplier | Cost |
|---------|-----------|----------------|------------------|----------|------|
| iPhone 15 Pro | 120 units | **5.8 days** 🔴 | 500 units | TechCorp Asia | $182,000 |
| AirPods Pro 4 | 85 units | **4.1 days** 🔴 | 350 units | TechCorp Asia | $52,500 |
| RTX 4090 | 45 units | **3.2 days** 🔴 | 200 units | GlobalParts Inc | $119,800 |

**Bundle Tip:** Combining iPhone + AirPods orders to TechCorp Asia saves $4,200 in freight.

**Total Investment Required Today: $354,300**
Estimated revenue protected: $890,000`;
  }

  if (lower.includes('supplier') && (lower.includes('fail') || lower.includes('risk'))) {
    return `## Supplier Risk Alert: Shanghai TechParts

**Failure Probability: 73%** 🔴 High Risk

### Key Risk Factors:
- **Financial Health:** Credit rating downgraded from B+ to C- this week.
- **Delivery Performance:** On-time Delivery (OTD) dropped to 62% in the last 14 days.
- **Geopolitical:** New export regulations affecting their primary facility.

### Affected SKUs:
- Core Processors (SKU-CP-001) - 4 weeks inventory remaining.
- Power Modules (SKU-PM-402) - 2 weeks inventory remaining. ⚠️

### Recommended Actions:
1. Shift 40% of Power Module volume to alternate supplier (Taiwan Semi Components).
2. Expedite existing open POs with Shanghai TechParts.
3. Review long-term contract terms due to SLA breach.`;
  }

  if (lower.includes('risk summary') || (lower.includes('today') && lower.includes('risk'))) {
    return `## Daily Risk Summary

**Active High-Severity Events: 5**

| Event | Severity | Affected Value | Recommendation |
|-------|----------|----------------|----------------|
| Typhoon nearing Shenzhen Port | 🔴 High | $2.4M | Reroute inbound vessels to Hong Kong |
| Shanghai TechParts Financials | 🔴 High | $850K | Shift to secondary suppliers immediately |
| EU Customs Strike | ⚠️ Med | $1.2M | Expect 4-day delay; notify VIP customers |
| Nickel Price Surge (+12%) | ⚠️ Med | $400K | Lock in current contracts for Q4 |
| Warehouse B Staffing Shortage | ⚠️ Med | N/A | Approve emergency overtime budget |

**Overall Supply Chain Health Score: 78/100** (Down 3 pts from yesterday)`;
  }

  if (lower.includes('delay') || lower.includes('shipment') || lower.includes('ss-2024-0848')) {
    return `## Shipment Status: SS-2024-0848

**Status: Delayed** 🔴
**Current Location:** Anchored near Port of Yantian

### Situation:
Typhoon Gaemi has caused port closures at Yantian. Your shipment containing **4,200 High-end GPUs ($3.1M value)** is currently delayed.

### Estimated Impact:
Original ETA: Oct 12
New ETA: Oct 18 (+6 Days)
Stockout Risk: High for SKU-GPU-990 by Oct 15.

### AI Mitigation Plan:
- **Reroute Option:** Discharge at Port of Ningbo instead, then rail transport. Adds $14,000 in logistics costs but recovers 4 days.
- **Air Freight Backup:** Airlift 500 units from the factory today to cover the 6-day gap. (Cost: $22,000)

**Decision needed within 4 hours to execute reroute.**`;
  }

  if (lower.includes('forecast') || lower.includes('demand')) {
    return `## 30-Day Demand Forecast

**Projected Global Demand: +18% vs Last Month** 🟢

### Key Drivers:
1. **Upcoming Festival Season:** Historical data shows a 25% spike in consumer electronics.
2. **New Marketing Campaign:** 'Techtober' launch expected to drive 15,000 extra units.

### Category Breakdown:
- **Smartphones:** 42,000 units expected (High confidence)
- **Laptops:** 18,500 units expected (Medium confidence)
- **Accessories:** 105,000 units expected (High confidence)

### Inventory Alignment:
We currently have a **12% shortfall** in Smartphone inventory to meet this forecast.
**Action:** Issue PO for an additional 5,000 units to primary suppliers immediately.`;
  }

  if (lower.includes('report') || lower.includes('executive')) {
    return `## Executive Supply Chain Summary

**Overall Health Score: 88/100** 🟢 Optimal

### Key Performance Indicators (KPIs):
- **On-Time In-Full (OTIF):** 94.2% (Target 95%)
- **Inventory Turnover:** 8.1 (Target 8.0)
- **Freight Spend:** $4.2M (-3% vs budget)

### Top 3 Active Risks:
1. Component shortage for Electric Motors (Risk level: 🔴)
2. Port congestion at Long Beach (Risk level: ⚠️)
3. Supplier financial instability: TechParts Inc (Risk level: 🔴)

### Top 3 Recommendations:
1. **Approve $450K spot buy** for Electric Motors to secure Q3 production.
2. **Shift 20% ocean freight** to air for high-margin SKUs delayed at Long Beach.
3. **Onboard backup supplier** for TechParts Inc within 30 days.`;
  }

  if (lower.includes('procurement') || lower.includes('optimize')) {
    return `## Procurement Optimization Plan

**Total Identified Savings: $106,000** 🟢

### Consolidation Opportunities:
- **Packaging Materials:** Consolidate 3 regional suppliers into 1 global contract.
  - *Savings: $42,000/quarter*
- **Office Electronics:** Bulk order remaining Q4 needs now before announced price hikes.
  - *Savings: $18,000*

### Freight Optimization:
- 14 LTL (Less-than-Truckload) shipments scheduled for this week can be combined into 4 FTL (Full-Truckload) shipments.
  - *Savings: $24,500*

### Contract Renegotiations:
- **Supplier Beta:** Volume tiered pricing threshold met. You are eligible for a 4% discount on all future orders this year.
  - *Savings: $21,500*

**Would you like me to draft the consolidation emails to the suppliers?**`;
  }

  return `## Insight Generated

I've analyzed your supply chain data regarding this query.

**Key Observations:**
- Inventory levels are currently stable across primary fulfillment centers.
- No immediate critical alerts detected for this specific parameter.
- Supplier performance metrics remain within the 90th percentile of our SLA agreements.

If you need a more specific breakdown, try asking about **reordering**, **supplier risks**, or a **warehouse performance analysis**.`;
};

// --- Simple Markdown Renderer ---
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\\n');
  const elements = [];
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (inTable && tableHeader.length > 0) {
      elements.push(
        <div key={\`table-\${elements.length}\`} className="overflow-x-auto my-4 border border-white/10 rounded-lg">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                {tableHeader.map((th, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    {parseInline(th)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-white/[0.02]">
              {tableRows.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  {row.map((td, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-gray-200">
                      {parseInline(td)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  const parseInline = (text: string) => {
    const parts = text.split(/(\\*\\*.*?\\*\\*|🔴|⚠️|🟡|🟢)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part === '🔴') return <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 ml-2">CRITICAL</span>;
      if (part === '⚠️' || part === '🟡') return <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 ml-2">WARNING</span>;
      if (part === '🟢') return <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 ml-2">GOOD</span>;
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|')) {
      inTable = true;
      const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
      if (lines[i + 1] && lines[i + 1].includes('|-')) {
        tableHeader = cells;
        i++; // skip separator
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-bold text-white mt-6 mb-4">{parseInline(line.substring(3))}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-white mt-5 mb-2">{parseInline(line.substring(4))}</h3>);
    } else if (line.startsWith('- ') || line.match(/^\\d+\\. /)) {
      elements.push(
        <div key={i} className="flex items-start ml-2 mb-1.5">
          <span className="text-blue-400 mr-2 mt-0.5">•</span>
          <span className="text-gray-300">{parseInline(line.replace(/^(- |\\d+\\. )/, ''))}</span>
        </div>
      );
    } else if (line !== '') {
      elements.push(<p key={i} className="mb-3 text-gray-300 leading-relaxed">{parseInline(line)}</p>);
    }
  }
  flushTable();

  return <div className="text-sm font-sans">{elements}</div>;
}

// --- Main Page Component ---
type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
};

const SUGGESTIONS = [
  "Why is Warehouse A underperforming?",
  "What should I reorder today?",
  "Which supplier will fail next week?",
  "Show me today's risk summary",
  "What caused the delay in SS-2024-0848?",
  "Forecast demand for next 30 days",
  "Generate executive report",
  "Optimize my procurement plan"
];

const WELCOME_CARDS = [
  { icon: Package, title: "Inventory", example: "What should I reorder today?" },
  { icon: Activity, title: "Performance", example: "Why is Warehouse A underperforming?" },
  { icon: AlertTriangle, title: "Risk", example: "Which supplier will fail next week?" },
  { icon: TrendingUp, title: "Forecasting", example: "Forecast demand for next 30 days" },
];

export default function ExecutiveCopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    setIsTyping(true);

    // Mock network delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getMockResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = \`\${Math.min(e.target.scrollHeight, 200)}px\`;
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0F1E] text-white font-sans overflow-hidden">
      {/* Left Panel (30%) */}
      <div className="w-[30%] max-w-sm border-r border-white/10 bg-white/[0.02] flex flex-col backdrop-blur-xl">
        <div className="p-6 pb-4">
          <button 
            onClick={() => setMessages([])}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-8 custom-scrollbar">
          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => setInput(sug)}
                  className="text-left px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Past Conversations */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent</h3>
            <div className="space-y-2">
              {[
                { title: 'Warehouse B Staffing Analysis', time: '2h ago' },
                { title: 'Q3 Freight Cost Optimization', time: 'Yesterday' },
                { title: 'Supplier Risk Report: Asia', time: 'Oct 12' }
              ].map((conv, i) => (
                <button key={i} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group text-left">
                  <MessageSquare className="w-5 h-5 text-gray-500 group-hover:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-200 font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Status */}
        <div className="p-5 border-t border-white/10 bg-black/20 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">SupplySense AI</p>
            <p className="text-xs text-green-400">Online and ready</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area (70%) */}
      <div className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-overlay">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Ask me anything about your supply chain</h1>
              <p className="text-gray-400 mb-12 max-w-xl">I'm your Executive Copilot. I can analyze warehouse performance, predict supply risks, optimize procurement, and generate executive summaries.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {WELCOME_CARDS.map((card, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(card.example)}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group text-left backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition-colors">
                        <card.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-white">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400">"{card.example}"</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8 pb-10">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                  >
                    <div className={\`flex gap-4 max-w-[85%] \${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}\`}>
                      {/* Avatar */}
                      <div className="shrink-0 mt-1">
                        {msg.role === 'user' ? (
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                            <span className="text-xs font-semibold">ME</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Bubble */}
                      <div className={\`flex flex-col \${msg.role === 'user' ? 'items-end' : 'items-start'}\`}>
                        <div 
                          className={\`px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md \${
                            msg.role === 'user' 
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-sm' 
                              : 'bg-white/[0.05] border border-white/10 text-gray-200 rounded-tl-sm'
                          }\`}
                        >
                          {msg.role === 'user' ? (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          ) : (
                            <MarkdownRenderer content={msg.content} />
                          )}
                        </div>
                        
                        {/* Message Footer */}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 px-1">
                          <span className="suppressHydrationWarning">{msg.timestamp || currentTime}</span>
                          {msg.role === 'ai' && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                              <button className="hover:text-gray-300 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                              <button className="hover:text-gray-300 transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                              <button className="hover:text-gray-300 transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="px-6 py-4 rounded-2xl rounded-tl-sm bg-white/[0.05] border border-white/10 flex items-center gap-1.5 h-[52px]">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E] to-transparent shrink-0">
          <div className="max-w-4xl mx-auto relative">
            <div className="relative flex items-end gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-2 pl-4 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] transition-all shadow-2xl">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Message Executive Copilot..."
                className="w-full max-h-[200px] bg-transparent text-white placeholder-gray-500 border-none outline-none resize-none py-3 text-[15px] custom-scrollbar"
                rows={1}
              />
              <div className="flex items-center gap-2 pb-1 shrink-0">
                <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-center mt-3 text-[11px] text-gray-500 font-medium tracking-wide">
              AI can make mistakes. Verify critical supply chain decisions.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
