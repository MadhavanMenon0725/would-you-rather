"use client"

import { useState } from "react"
import ChaosGame from "@/components/game/ChaosGame"
import { Button } from "@/components/ui/button"
import { Zap, Sparkles } from "lucide-react"

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      {!started ? (
        <div className="max-w-3xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
            <h1 className="text-7xl md:text-9xl font-headline font-black tracking-tighter relative">
              CHAOS<br/><span className="text-primary italic">BOUND</span>
            </h1>
            <div className="absolute -top-4 -right-4 animate-glitch">
              <Zap className="w-12 h-12 text-primary fill-primary" />
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
              The ultimate "Would You Rather" experience. Embrace the absurdity, measure your chaos, and unlock your true internet persona.
            </p>
          </div>

          <div className="pt-8">
            <Button 
              onClick={() => setStarted(true)}
              size="lg" 
              className="rounded-full h-20 px-12 text-2xl font-headline font-black uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 neon-shadow transition-chaos active:scale-95"
            >
              Start Session
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-muted-foreground/50 font-headline text-xs uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Powered
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              100% Chaotic
            </div>
          </div>
        </div>
      ) : (
        <ChaosGame />
      )}
    </main>
  );
}
