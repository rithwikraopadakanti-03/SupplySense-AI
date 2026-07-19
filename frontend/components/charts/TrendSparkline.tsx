"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

export function TrendSparkline({ data, dataKey = "value", color = "#3b82f6" }: { data: any[]; dataKey?: string; color?: string }) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} isAnimationActive={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
