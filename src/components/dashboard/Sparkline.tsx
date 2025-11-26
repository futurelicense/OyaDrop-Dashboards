import React from 'react';
import { motion } from 'framer-motion';
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}
export function Sparkline({
  data,
  color = '#00d9ff',
  height = 40
}: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((value, index) => {
    const x = index / (data.length - 1) * 100;
    const y = height - (value - min) / range * height;
    return `${x},${y}`;
  }).join(' ');
  return <svg width="100%" height={height} className="overflow-visible">
      <motion.polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{
      pathLength: 0,
      opacity: 0
    }} animate={{
      pathLength: 1,
      opacity: 1
    }} transition={{
      duration: 1,
      ease: 'easeOut'
    }} style={{
      filter: `drop-shadow(0 0 4px ${color})`
    }} />
    </svg>;
}