import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

/**
 * Universal AI Service
 * Dynamically selects the AI provider (Gemini or OpenAI) based on 
 * the environment variables configured in Vercel.
 */
export async function getHakeemResponse(userPrompt: string) {
  try {
    // 1. Check for Google Gemini API Key
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      const { text } = await generateText({
        model: google('models/gemini-1.5-pro-latest'),
        prompt: userPrompt,
      });
      return text;
    }

    // 2. Check for OpenAI (GPT) API Key
    if (process.env.OPENAI_API_KEY) {
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt: userPrompt,
      });
      return text;
    }

    // 3. Fallback if no keys are configured
    return "I'm sorry, no AI provider API keys were found in the system configuration. This is a placeholder response.";
    
  } catch (error) {
    console.error("AI Service Execution Error:", error);
    return "An error occurred while communicating with the AI. Please verify your API key configurations.";
  }
}
