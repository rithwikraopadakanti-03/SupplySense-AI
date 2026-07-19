"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

export function AISummaryCard({ summary }: { summary: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(summary.slice(0, i));
      i++;
      if (i > summary.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 h-full">
      <div className="p-6 rounded-2xl bg-[#0A0F1E] h-full">
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center justify-center p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-xs font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase">
            AI Insight
          </span>
        </div>
        <p className="text-gray-300 leading-relaxed min-h-[80px]">
          {displayedText}
          <span className="animate-pulse inline-block w-1.5 h-4 bg-purple-500 ml-1 translate-y-1"></span>
        </p>
      </div>
    </div>
  );
}
