"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { generateReaction } from "@/ai/flows/generate-reaction"
import { determineChaosPersona } from "@/ai/flows/determine-chaos-persona"
import { getRandomQuestions, type Question } from "@/lib/questions"
import { ChaosMeter } from "./ChaosMeter"
import { ChoiceCard } from "./ChoiceCard"
import { Button } from "@/components/ui/button"
import { ChevronRight, RefreshCw, Share2, Loader2, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const TOTAL_QUESTIONS = 10;

export default function ChaosGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [chaosLevel, setChaosLevel] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [reaction, setReaction] = useState<string | null>(null);
  const [fakeStats, setFakeStats] = useState<{ a: number; b: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [persona, setPersona] = useState<{ title: string; roast: string } | null>(null);

  useEffect(() => {
    setQuestions(getRandomQuestions(TOTAL_QUESTIONS));
  }, []);

  const handleChoice = async (option: 'A' | 'B') => {
    if (selectedOption || isLoading) return;

    setSelectedOption(option);
    setIsLoading(true);

    const question = questions[currentIndex];
    const chosenText = option === 'A' ? question.optionA : question.optionB;
    const otherText = option === 'A' ? question.optionB : question.optionA;

    // Fake statistics logic
    const baseA = 40 + Math.random() * 20;
    const stats = { a: Math.round(baseA), b: 100 - Math.round(baseA) };
    setFakeStats(stats);

    // Chaos meter logic
    const increase = question.chaosWeight + (Math.random() * 5);
    setChaosLevel(prev => Math.min(100, Math.round(prev + increase)));
    setChoices(prev => [...prev, chosenText]);

    try {
      const res = await generateReaction({ chosenOption: chosenText, otherOption: otherText });
      setReaction(res.reactionMessage);
    } catch (e) {
      console.error("AI Error:", e);
      setReaction("The AI is too stunned by your choice to speak.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = async () => {
    if (currentIndex + 1 < TOTAL_QUESTIONS) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setReaction(null);
      setFakeStats(null);
    } else {
      await finishGame();
    }
  };

  const finishGame = async () => {
    setIsGameOver(true);
    setIsLoading(true);
    try {
      const res = await determineChaosPersona(choices);
      setPersona(res);
    } catch (e) {
      setPersona({ 
        title: "Mystery Chaos Entity", 
        roast: "You're so chaotic our AI servers literally gave up trying to categorize you. Congrats?" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const restartGame = () => {
    setQuestions(getRandomQuestions(TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setSelectedOption(null);
    setChaosLevel(0);
    setChoices([]);
    setReaction(null);
    setFakeStats(null);
    setIsGameOver(false);
    setPersona(null);
  };

  if (!questions.length) return null;

  if (isGameOver) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
        <Card className="border-2 border-primary/30 overflow-hidden">
          <CardHeader className="text-center space-y-4 pt-12">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-glitch">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <CardDescription className="text-primary font-headline uppercase tracking-[0.2em]">Final Persona</CardDescription>
              <CardTitle className="text-4xl md:text-6xl font-black text-white italic">
                {persona?.title || <Loader2 className="animate-spin inline" />}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-12 text-center space-y-8">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium italic">
              &quot;{persona?.roast}&quot;
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={restartGame}
                size="lg" 
                className="rounded-full h-14 px-8 text-lg font-headline font-bold bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full h-14 px-8 text-lg font-headline font-bold border-secondary text-secondary hover:bg-secondary/10"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Result
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4">
      {/* Top Progress Tracker */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-xs font-headline text-muted-foreground uppercase tracking-wider">
            <span>Session Progress</span>
            <span>{currentIndex + 1} / {TOTAL_QUESTIONS}</span>
          </div>
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-headline font-black uppercase tracking-tight">
          Would You <span className="text-primary italic">Rather</span>?
        </h2>
        <ChaosMeter level={chaosLevel} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <ChoiceCard
          text={currentQuestion.optionA}
          variant="violet"
          isSelected={selectedOption === 'A'}
          isDisabled={!!selectedOption}
          percentage={fakeStats?.a}
          onClick={() => handleChoice('A')}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-border font-headline font-bold text-muted-foreground text-sm">
          OR
        </div>

        <ChoiceCard
          text={currentQuestion.optionB}
          variant="indigo"
          isSelected={selectedOption === 'B'}
          isDisabled={!!selectedOption}
          percentage={fakeStats?.b}
          onClick={() => handleChoice('B')}
        />
      </div>

      {/* AI Reaction & Next Button */}
      <div className="min-h-[120px] flex flex-col items-center justify-center space-y-6 pt-8">
        {selectedOption && (
          <div className="w-full max-w-xl text-center space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {reaction ? (
              <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed italic">
                &quot;{reaction}&quot;
              </p>
            ) : (
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="animate-spin h-5 w-5" />
                <span className="font-headline text-sm uppercase tracking-widest">Generating Snark...</span>
              </div>
            )}
            
            <Button 
              onClick={nextQuestion} 
              size="lg"
              className="rounded-full h-14 px-12 text-lg font-headline font-bold bg-white text-black hover:bg-white/90 group"
            >
              {currentIndex + 1 === TOTAL_QUESTIONS ? 'See Final Persona' : 'Next Question'}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
