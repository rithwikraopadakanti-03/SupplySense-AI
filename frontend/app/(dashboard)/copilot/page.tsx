"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Copy, Bot, User, Clock, Plus, MessageSquare, Pin } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const PAST_CONVOS = [
  { id: '1', title: 'Supplier Risk Analysis', time: '2 hours ago', pinned: true },
  { id: '2', title: 'Q3 Forecast Accuracy', time: 'Yesterday', pinned: false },
  { id: '3', title: 'Route Optimization Plan', time: '3 days ago', pinned: false },
];

const SUGGESTIONS = [
  'Which supplier is most likely to fail next week?',
  'What products will run out of stock in 7 days?',
  "Generate today's executive report",
  'Why is warehouse utilization low?',
  'Which region has highest risk today?'
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: 'Hello! I am SupplySense Copilot. I can analyze risk, predict shortages, and help you optimize your supply chain. What would you like to know today?',
      timestamp: '' // set client-side only to avoid hydration mismatch
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Set initial message timestamp on client only (avoids SSR hydration mismatch)
    setMessages(prev => prev.map((m, i) =>
      i === 0 ? { ...m, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : m
    ));
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      let responseText = "I've analyzed the data. Everything seems to be operating within normal parameters.";
      
      if (text.includes('supplier') && text.includes('fail')) {
        responseText = `Based on my analysis of 47 active suppliers, **Shanghai TechParts Ltd.** (Supplier ID: SUP-0023) has the highest failure probability at **73%** for the next 7 days. Key risk factors:
• Delivery delay increased from 3.2 to 8.7 days over the past 2 weeks
• Quality defect rate spiked to 4.2% (threshold is 2%)
• Local weather reports indicate severe storms in the region delaying logistics
• Financial news indicates a 12% drop in their parent company stock

**Recommendation:** Shift 40% of critical component orders to alternative supplier **Shenzhen Electronics** immediately to mitigate stockout risks for the upcoming flagship launch.`;
      } else if (text.includes('out of stock') || text.includes('stock')) {
        responseText = `The following products are at high risk of stockout within 7 days:
1. **iPhone 15 Pro Max Display Panels** - 3 days remaining (Warehouse B)
2. **Lithium-Ion Battery Packs (Standard)** - 5 days remaining (Warehouse A)
3. **USB-C Charging Cables** - 6 days remaining (Warehouse C)

Would you like me to draft purchase orders for these items?`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#0A0F1E] text-white">
      {/* Left Panel */}
      <div className="w-[30%] border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col p-4">
        <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold mb-6 hover:opacity-90 transition">
          <Plus className="w-5 h-5" /> New Chat
        </button>

        <div className="flex-1 overflow-y-auto">
          <h3 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
            <Pin className="w-4 h-4" /> Pinned
          </h3>
          <div className="space-y-2 mb-6">
            {PAST_CONVOS.filter(c => c.pinned).map(convo => (
              <div key={convo.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate">{convo.title}</div>
                  <div className="text-xs text-gray-400">{convo.time}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-gray-400 text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Recent
          </h3>
          <div className="space-y-2">
            {PAST_CONVOS.filter(c => !c.pinned).map(convo => (
              <div key={convo.id} className="p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/5 transition flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate text-gray-300">{convo.title}</div>
                  <div className="text-xs text-gray-500">{convo.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[70%] flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                
                <div className={`max-w-[75%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-br-none' 
                    : 'bg-white/10 backdrop-blur-md border border-white/10 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-100 font-light">
                    {msg.content.split('\n').map((line, i) => {
                      if (line.startsWith('•')) {
                        return <div key={i} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-cyan-400 before:rounded-full">{line.substring(1)}</div>;
                      }
                      // Handle bolding roughly
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <span key={i} className="block mb-2 last:mb-0">
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </span>
                      );
                    })}
                  </div>
                  <div className={`flex items-center mt-3 gap-3 ${msg.role === 'user' ? 'justify-end text-blue-100' : 'text-gray-400'}`}>
                    <span className="text-xs">{msg.timestamp}</span>
                    {msg.role === 'ai' && (
                      <button className="hover:text-white transition" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-t from-[#0A0F1E] to-transparent pt-12">
          <div className="flex flex-wrap gap-2 mb-4 px-2">
            {SUGGESTIONS.map((sug, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(sug)}
                className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition text-gray-300 whitespace-nowrap"
              >
                {sug}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-md focus-within:border-cyan-400/50 transition-colors">
            <button className="p-3 text-gray-400 hover:text-cyan-400 transition">
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your supply chain..."
              className="flex-1 bg-transparent border-none outline-none text-white px-2 placeholder:text-gray-500"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
