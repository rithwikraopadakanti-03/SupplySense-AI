"use client";
import { motion } from "framer-motion";

export function SupplyChainHealthGauge({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let color = "text-green-500";
  if (score < 50) color = "text-red-500";
  else if (score < 80) color = "text-yellow-500";

  return (
    <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70" cy="70" r={radius}
          className="stroke-white/10"
          strokeWidth="12" fill="none"
        />
        <motion.circle
          cx="70" cy="70" r={radius}
          className={`stroke-current ${color}`}
          strokeWidth="12" fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-gray-400">/100</span>
      </div>
    </div>
  );
}
