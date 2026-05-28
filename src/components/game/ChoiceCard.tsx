"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface ChoiceCardProps {
  text: string;
  isSelected: boolean;
  isDisabled: boolean;
  percentage?: number;
  onClick: () => void;
  variant: 'violet' | 'indigo';
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  text,
  isSelected,
  isDisabled,
  percentage,
  onClick,
  variant
}) => {
  const activeClass = variant === 'violet' 
    ? 'border-primary bg-primary/10 neon-shadow' 
    : 'border-secondary bg-secondary/10 neon-shadow-secondary';
  
  const hoverClass = variant === 'violet'
    ? 'hover:border-primary/50 hover:bg-primary/5'
    : 'hover:border-secondary/50 hover:bg-secondary/5';

  return (
    <Card
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onClick={!isDisabled ? onClick : undefined}
      className={cn(
        "relative p-8 min-h-[160px] flex items-center justify-center text-center cursor-pointer transition-chaos border-2 bg-card/50",
        "active:scale-95",
        isDisabled ? "cursor-default opacity-80" : hoverClass,
        isSelected && activeClass,
        !isSelected && isDisabled && "grayscale-[0.5] opacity-50"
      )}
    >
      <div className="relative z-10 w-full space-y-4">
        <h3 className="text-xl md:text-2xl font-headline font-bold">
          {text}
        </h3>
        
        {percentage !== undefined && (
          <div className={cn(
            "text-3xl font-headline font-black transition-all duration-700 animate-in fade-in slide-in-from-bottom-2",
            variant === 'violet' ? "text-primary" : "text-secondary"
          )}>
            {percentage}%
          </div>
        )}
      </div>

      {isSelected && (
        <div className={cn(
          "absolute inset-0 rounded-lg pointer-events-none border-2",
          variant === 'violet' ? "animate-pulse border-primary" : "animate-pulse border-secondary"
        )} />
      )}
    </Card>
  );
};
