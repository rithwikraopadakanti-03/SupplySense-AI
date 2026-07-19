"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  displayValue?: string;
  change?: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
}

export function StatCard({ title, value, displayValue, change, icon: Icon, prefix = "", suffix = "", isCurrency }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (isCurrency && latest >= 1000000) return (latest / 1000000).toFixed(1) + "M";
    return Math.round(latest).toLocaleString();
  });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
      onComplete: () => setIsDone(true)
    });
    return controls.stop;
  }, [value, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${change >= 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"} px-2 py-1 rounded-full`}>
            {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center">
          {prefix}
          {isCurrency && !isDone && "$"}
          {isDone && displayValue ? displayValue : <motion.span>{rounded}</motion.span>}
          {suffix}
        </h3>
      </div>
    </motion.div>
  );
}
