"use client";

import { motion } from "framer-motion";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
