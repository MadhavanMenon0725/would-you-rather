'use server';
/**
 * @fileOverview This file implements a Genkit flow that generates a unique, snarky, and internet-meme inspired reaction message
 * based on a player's choice in the "Would You Rather: Chaos Edition" game.
 *
 * - generateReaction - A function that handles the generation of a reaction message.
 * - GenerateReactionInput - The input type for the generateReaction function.
 * - GenerateReactionOutput - The return type for the generateReaction function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReactionInputSchema = z.object({
  chosenOption: z
    .string()
    .describe("The 'Would You Rather' option the user selected."),
  otherOption: z
    .string()
    .describe("The 'Would You Rather' option the user did NOT select."),
});
export type GenerateReactionInput = z.infer<typeof GenerateReactionInputSchema>;

const GenerateReactionOutputSchema = z.object({
  reactionMessage: z
    .string()
    .describe(
      "A unique, snarky, and internet-meme inspired reaction message tailored to the user's choice."
    ),
});
export type GenerateReactionOutput = z.infer<typeof GenerateReactionOutputSchema>;

export async function generateReaction(
  input: GenerateReactionInput
): Promise<GenerateReactionOutput> {
  return generateReactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReactionPrompt',
  input: { schema: GenerateReactionInputSchema },
  output: { schema: GenerateReactionOutputSchema },
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are a snarky, internet-savvy, meme-fluent AI that provides hilarious and sometimes judgmental reactions to 'Would You Rather' choices.

The user just played 'Would You Rather: Chaos Edition' and chose one option over another.
Your task is to provide a short, funny, and meme-inspired reaction to their choice. Keep it punchy, around 1-2 sentences.
Make it sound like a comment you'd see on social media or a forum.

Chosen Option: {{{chosenOption}}}
Other Option: {{{otherOption}}}

Example Reactions:
- "Oh, you actually picked that? Bold. Very bold. Or incredibly foolish, time will tell."
- "RIP your social life, but at least you'll have... that. No regrets, right?"
- "My brain cells are protesting, but I respect the chaos. Live your truth."
- "Are you even human? Because that choice was peak alien logic. I'm here for it."
- "Some choices define you. This one defines you as someone who embraces absurdity. Welcome to the club."
- "The multiverse just shifted, and it's all thanks to your questionable priorities. Well played."
`,
});

const generateReactionFlow = ai.defineFlow(
  {
    name: 'generateReactionFlow',
    inputSchema: GenerateReactionInputSchema,
    outputSchema: GenerateReactionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
