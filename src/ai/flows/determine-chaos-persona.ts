'use server';
/**
 * @fileOverview This file defines a Genkit flow for determining a player's chaotic persona.
 *
 * - determineChaosPersona - A function that generates a unique 'Chaos Title' and a personalized, descriptive roast based on the player's game choices.
 * - DetermineChaosPersonaInput - The input type for the determineChaosPersona function.
 * - DetermineChaosPersonaOutput - The return type for the determineChaosPersona function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DetermineChaosPersonaInputSchema = z
  .array(z.string())
  .describe(
    "An array of strings, where each string describes one of the player's chaotic choices made throughout the game."
  );
export type DetermineChaosPersonaInput = z.infer<
  typeof DetermineChaosPersonaInputSchema
>;

const DetermineChaosPersonaOutputSchema = z.object({
  title: z
    .string()
    .describe('A unique and funny "Chaos Title" that summarizes the player\'s chaotic personality.'),
  roast: z
    .string()
    .describe(
      'A personalized, descriptive, snarky, and meme-inspired roast based on the player\'s choices.'
    ),
});
export type DetermineChaosPersonaOutput = z.infer<
  typeof DetermineChaosPersonaOutputSchema
>;

export async function determineChaosPersona(
  input: DetermineChaosPersonaInput
): Promise<DetermineChaosPersonaOutput> {
  return determineChaosPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineChaosPersonaPrompt',
  input: { schema: DetermineChaosPersonaInputSchema },
  output: { schema: DetermineChaosPersonaOutputSchema },
  prompt: `You are an AI specializing in roasting human players based on their absurd and chaotic choices in a "Would You Rather" game.
Your task is to analyze the player's selections and generate a unique, funny "Chaos Title" and a personalized, snarky, internet-meme-inspired descriptive roast.
The roast should be based on their choices and their level of chaos.

Here are some example Chaos Titles:
- Certified Chaos Goblin
- Unstable Genius
- Secret Villain Arc
- Too Dangerous For Society
- The Mad Hatter of Mayhem
- Lord of the Absurd
- Master of Misfortune

Here are the player's choices:
{{#each this}}
- {{{this}}}
{{/each}}

Based on these choices, provide a "Chaos Title" and a descriptive "roast" that captures their chaotic persona.
Remember to be humorous, snarky, and use internet culture references if appropriate.`,
});

const determineChaosPersonaFlow = ai.defineFlow(
  {
    name: 'determineChaosPersonaFlow',
    inputSchema: DetermineChaosPersonaInputSchema,
    outputSchema: DetermineChaosPersonaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate chaos persona.');
    }
    return output;
  }
);
