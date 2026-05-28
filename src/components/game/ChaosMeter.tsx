"use client"

import * as React from "react"
import { Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ChaosMeterProps {
  level: number;
}

export const ChaosMeter: React.FC<ChaosMeterProps> = ({ level }) => {
  const percentage = Math.min(Math.max(level, 0), 100);
  
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-primary font-headline text-sm uppercase tracking-widest">
          <Zap className="w-4 h-4 fill-primary" />
          Chaos Meter
        </div>
        <div className="text-primary font-headline text-sm font-bold">
          {percentage}%
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full" />
        <Progress 
          value={percentage} 
          className="h-3 relative bg-muted border border-primary/20"
        />
      </div>
    </div>
  );
};
